import { AfterViewChecked, ChangeDetectorRef, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription, debounceTime } from 'rxjs';
import { DoctorService } from '../../../shared/services/doctor.service';
import { PatientService } from '../../../shared/services/patient.service';
import { SharedModule } from '../../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-specialization-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './specialization-list.component.html',
  styleUrl: './specialization-list.component.scss'
})
export class SpecializationListComponent implements AfterViewChecked{
  displayedColumns: string[] = ['Sr no', 'Name', 'Created Date', 'Actions'];
  dataSource = <any>([]);
  pagination: any = { search_key: '', search_column: '', order_by: '', order: 'asc', per_page: 10, page: 1 };
  totalCount: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  modalService = inject(MatDialog)
  doctorService = inject(DoctorService)
  commonService = inject(PatientService)
  searchForm!: FormGroup;
  specializationForm!: FormGroup;
  cardBackgroundColor = ['rgb(244 232 255)', 'rgb(255 244 222)', 'rgb(220 252 231)', 'rgb(255 226 230)']
  subBtnName: string = 'Create';
  stats_id!: number | string;
  toasterService = inject(ToastrService);
  dialogRef!: MatDialogRef<TemplateRef<any>>;
  commanService = inject(CommonService);

  @ViewChild('addEditForm', { static: true }) addEditForm!: TemplateRef<any>

  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.callOninit();
  }

  loadSpecialization(payload: any, id?: number) {
    this.doctorService.retrieveSpecialization(payload, id).subscribe({
      next: (response: any) => {
        if (response) {
          const data = response?.data ? response?.data : [];
          const meta = response?.meta;
          this.dataSource = data?.map((list: any) => { return { id: list.id, state_id: list.state_id, name: list.name, created_at: list.created_at, actions: '' } });
          this.pagination.page = meta?.current_page;
          this.pagination.per_page = meta?.per_page;
          this.totalCount = meta?.total;
        }
      }
    });

  }

  showEditDeleteOrg(type: string, value: any) {
    this.stats_id = value?.id;
    if (type === 'edit') {
      this.specializationForm.patchValue({ name: value?.name });
      this.subBtnName = 'Update';
      this.dialogRef = this.modalService.open(this.addEditForm, {
        width: '500px'
      });
    }

    if (type === 'delete') {
      this.subBtnName = 'Create';
      this.forminitialize();

      this.commanService.openAlert({ type: "delete_specialization", name: value?.name });
      const deleteSpzSub: Subscription = this.commanService.$onCloseConfirm.subscribe((res: any) => {
        if (res?.confirmed && (res?.type === 'delete_specialization')) {
          this.deleteSpecialization();
        }
        deleteSpzSub.unsubscribe();
        this.commanService.$onCloseConfirm.next({ type: "", confirmed: false });
      });

    }

  }

  deleteSpecialization() {
    this.doctorService.deleteSpecialization(this.stats_id ? this.stats_id : '').subscribe({
      next: (response: any) => {
        if (response) {
          this.stats_id = '';
          this.loadSpecialization({ per_page: 10 });
          this.toasterService.success(response.message);
        }
      },
      error: (err: any) => {
        this.toasterService.error("Something went wrong!");
      },
    });
  }

  handlePagination(event: PageEvent) {
    const paginationPayload = { page: event.pageIndex + 1, per_page: event.pageSize };
    this.loadSpecialization(paginationPayload);
  }

  sortFunction(sortColumn: Sort) {
    const payload = { ...this.pagination, order: sortColumn.direction, order_by: sortColumn.active };
    this.loadSpecialization(payload);
  }

  searchFunction(searchText: string) {
    const payload = { search_key: searchText, per_page: 10 };
    this.loadSpecialization(payload);
  }

  createSpecialization() {
    const name = this.specializationForm.get('name')!.value;
    const payload = { name: name };

    if (this.subBtnName === 'Create') {
      if (this.specializationForm.invalid) {
        this.specializationForm.markAllAsTouched();
        this.specializationForm.markAsDirty();
        return;
      }
      this.doctorService.createSpecialization(payload).subscribe({
        next: (response: any) => {
          if (response) {
            this.specializationForm.reset();
            this.toasterService.success("Specialization created Successfully");
            this.specializationForm.get('name')?.setValue('')
            this.specializationForm.updateValueAndValidity();
            this.subBtnName = 'Create';
            this.stats_id = '';
            this.loadSpecialization({ per_page: 10 });
            this.dialogRef.close();
          }
        },
        error: (err: any) => {
          this.specializationForm.reset();
          this.specializationForm.get('name')?.setValue('')
          this.specializationForm.updateValueAndValidity();
          this.subBtnName = 'Create';
          this.toasterService.error("Something went wrong!");
        },
      });
    }

    if (this.subBtnName === 'Update') {
      this.doctorService.updateSpecialization(payload, this.stats_id ? this.stats_id : '').subscribe({
        next: (response: any) => {
          if (response) {
            this.specializationForm.reset();
            this.specializationForm.get('name')?.setValue('')
            this.specializationForm.updateValueAndValidity();
            this.toasterService.success("Specialization updated Successfully");
            this.subBtnName = 'Create';
            this.stats_id = '';
            this.loadSpecialization({ per_page: 10 });
            this.dialogRef.close();

          }
        },
        error: (err: any) => {
          this.specializationForm.reset();
          this.specializationForm.get('name')?.setValue('')
          this.specializationForm.updateValueAndValidity();
          this.toasterService.error("Something went wrong!");
        },
      });
    }

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadSpecialization({ per_page: 10 });
  }

  callOninit() {
    this.forminitialize();
    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (response: string) => {
        if (response) {
          this.searchFunction(response);
        } else {
          this.searchFunction('');
        }
      }
    });
  }

  forminitialize() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.specializationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }


  ShowAddModal() {
    this.dialogRef = this.modalService.open(this.addEditForm, {
      width: '500px'
    });
    this.forminitialize();
  }

  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

  getSlideValue(event: any, element: any) {
    this.doctorService.specializationEnableDisable(element?.id, {}).subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.toasterService.success(res?.message);
        }
      }
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  
}