import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HistoryPayload, DoctorListResponse } from '../../../shared/modal/payload.modal';
import { DoctorService } from '../../../shared/services/doctor.service';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organisation-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './organisation-list.component.html',
  styleUrl: './organisation-list.component.scss'
})
export class OrganisationListComponent implements AfterViewChecked {
  displayedColumns: string[] = ['Sr no', 'Organization Name', 'Email', 'Country', 'Created Date', 'Edit', 'View'];
  dataSource = <any>([]);
  pagination: HistoryPayload = {
    search_key: '',
    search_column: '',
    page: 1,
    per_page: 10,
    role_id: 1
  }
  totalCount: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  modalService = inject(MatDialog);
  doctorService = inject(DoctorService);
  toasterService = inject(ToastrService);
  searchForm!: FormGroup;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadDoctorList(this.pagination);
  }

  loadDoctorList(payload: HistoryPayload) {
    this.doctorService.retrieveDoctorHistory(payload).subscribe({
      next: (response: any) => {
        if (response) {
          const list = response as DoctorListResponse;
          this.dataSource = list.data.map((doctorList) => {
            return {
              id: doctorList.id,
              fullName: doctorList.full_name,
              email: doctorList.email,
              country: doctorList.country_name,
              role: doctorList.role,
              createdDate: doctorList.created_at,
              edit: '',
              view: '',
              state_id: doctorList.state_id,
            }
          });
          this.pagination.page = list.meta.current_page;
          this.pagination.per_page = list.meta.per_page;
          this.totalCount = list.meta.total;
        }
      }
    })
  }

  showEditOrganisationModal(orgId: string) {
    const dialogRef = this.modalService.open(CreateOrganisationComponent, {
      width: '700px',
      height: '90vh',
      data: {
        isEdit: true,
        organisationId: orgId
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadDoctorList(this.pagination);
      }
    });
  }

  createOrganisation() {
    const dialogRef = this.modalService.open(CreateOrganisationComponent, {
      width: '700px',
      height: '90vh',
      data: {
        isEdit: false,
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadDoctorList(this.pagination);
      }
    });
  }

  handlePagination(event: PageEvent) {
    const paginationPayload = {
      ...this.pagination,
      page: event.pageIndex + 1,
      per_page: event.pageSize
    }
    this.loadDoctorList(paginationPayload)
  }

  sortFunction(sortColumn: Sort) {
    const payload = { ...this.pagination, order: sortColumn.direction, order_by: sortColumn.active }
    this.loadDoctorList(payload)
  }

  searchFunction(searchText: string) {
    const payload = { ...this.pagination, search_key: searchText }
    this.loadDoctorList(payload)
  }

  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

  getSlideValue(event: any, element: any) {
    this.doctorService.organizationEnableDisable(element?.id, {}).subscribe({
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

