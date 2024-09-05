import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DoctorListResponse, HistoryPayload } from '../../../shared/modal/payload.modal';
import { SharedModule } from '../../../shared/shared.module';
import { DoctorService } from '../../../shared/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { CreateDoctorComponent } from '../create-doctor/create-doctor.component';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { FeaturesFlagComponent } from '../../../shared/components/features-flag/features-flag.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent {

  @Input() isDashboard:boolean = false;
  displayedColumns: string[] = ['Sr no', 'Doctor Name', 'Email', 'Role', 'Specialities', 'Country', 'Organization Name', 'Created Date', 'Actions'];
  dataSource = <any>([]);
  pagination: HistoryPayload = {
    search_key: '',
    search_column: '',
    // order:'',
    // order_by:'',
    page: 1,
    per_page: 10,
    role_id: 2,
  }
  totalCount: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  organisationId!: string
  searchForm!: FormGroup;
  modalService = inject(MatDialog)
  doctorService = inject(DoctorService)
  activatedRoute = inject(ActivatedRoute);
  commonService = inject(AuthService)

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
    const organisationId = this.activatedRoute.snapshot.paramMap.get('id');
    if (organisationId) {
      this.organisationId = organisationId;
    }
    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (response: string) => {
        if (response) {
          this.searchFunction(response)
        } else {
          this.searchFunction('')

        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadPatientHIstory(this.pagination);
  }

  loadPatientHIstory(payload: HistoryPayload) {
    if (this.organisationId) {
      payload = { ...payload , created_by_id:this.organisationId }
    }
    this.doctorService.retrieveDoctorHistory(payload).subscribe({
      next: (response: any) => {
        if (response) {
          const list = response as DoctorListResponse;
          if (list.data.length) {
            this.dataSource = list.data.map((doctorList) => {
              return { 
                id: doctorList.id, 
                fullName: doctorList.full_name, 
                email: doctorList.email, 
                role: doctorList.role, 
                specialities: doctorList.specialities, 
                country:doctorList.country_name,
                createdDate: doctorList.created_at,
                orgName: doctorList.created_by ? doctorList.created_by : 'Individual' ,
                actions: '' }
            });
          } else {
            this.dataSource = [];
          }
          this.pagination.page = list.meta.current_page;
          this.pagination.per_page = list.meta.per_page;
          this.totalCount = list.meta.total;

        }
      }
    })
  }

  handlePagination(event: PageEvent) {
    const paginationPayload = {
      ...this.pagination,
      page: event.pageIndex + 1,
      per_page: event.pageSize
    }
    this.loadPatientHIstory(paginationPayload);
  }

  sortFunction(sortColumn: Sort) {
    const payload = { ...this.pagination, order: sortColumn.direction, order_by: sortColumn.active }
    this.loadPatientHIstory(payload);
  }

  showDoctorEditForm(doctorId: string) {
    const dialogRef = this.modalService.open(CreateDoctorComponent, {
      width: '600px',
      maxHeight:'90vh',
      data: {
        isEdit: true,
        doctorId: doctorId,
        organisationId:this.organisationId
      }
    });
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result) {
        this.loadPatientHIstory(this.pagination);
      }
    });
  }

  searchFunction(searchText: string) {
    const payload = { ...this.pagination, search_key: searchText };
    this.loadPatientHIstory(payload)
  }

  createDoctor(){
    const dialogRef = this.modalService.open(CreateDoctorComponent, {
      width: '600px',
      maxHeight:'90vh',
      data: {
        isEdit: false,
        organisationId:this.organisationId
      }
    });
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result) {
        this.loadPatientHIstory(this.pagination);
      }
    });
  }


  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

  giveFeatures(){
    const dialogRef = this.modalService.open(FeaturesFlagComponent, {
      width: '600px',
      maxHeight:'90vh',
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result) {
        // this.loadPatientHIstory(this.pagination);
      }
    });
  }
  
}
