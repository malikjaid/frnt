import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime } from 'rxjs';
import { HistoryPayload, DoctorListResponse } from '../../../shared/modal/payload.modal';
import { DoctorService } from '../../../shared/services/doctor.service';
import { PatientService } from '../../../shared/services/patient.service';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';
import { ChartviewComponent } from '../../../shared/components/chartview/chartview.component';
import { RoleCode } from '../../../shared/enum/role';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, ChartviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  displayedColumns: string[] = ['Sr no', 'Full Name', 'Email', 'Country', 'Role', 'Created Date',];
  dataSource = <any>([]);
  pagination: HistoryPayload = {
    search_key: '',
    search_column: '',
    // order:'',
    // order_by:'',
    page: 1,
    per_page: 10,
    role_id: 0
  }
  totalCount: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filter_search_key: string | number = '';
  modalService = inject(MatDialog)
  doctorService = inject(DoctorService)
  commonService = inject(PatientService)
  searchForm!: FormGroup;
  statsCount: any[] = [];
  cardBackgroundColor = ['rgb(244 232 255)', 'rgb(255 244 222)', 'rgb(220 252 231)', 'rgb(255 226 230)'];

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (response: string) => {
        if (response) {
          this.searchFunction(response)
        } else {
          this.searchFunction('')

        }
      }
    });
    this.getTotalCount()
  }

  getTotalCount() {
    this.commonService.getTotalCount().subscribe({
      next: (response: any) => {
        if (response) {
          this.statsCount = response?.data;
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadPatientHIstory(this.pagination);
  }

  loadPatientHIstory(payload: HistoryPayload) {
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
    this.modalService.open(CreateOrganisationComponent, {
      width: '800px',
      height: '90vh',
      data: {
        isEdit: true,
        organisationId: orgId
      }
    })

  }

  handlePagination(event: PageEvent) {
    const paginationPayload = {
      ...this.pagination,
      page: event.pageIndex + 1,
      per_page: event.pageSize
    }
    this.loadPatientHIstory({ ...paginationPayload, search_key: this.filter_search_key, search_column: this.filter_search_key !== '' ? 'role_id' : '' })
  }

  sortFunction(sortColumn: Sort) {
    const payload = { ...this.pagination, order: sortColumn.direction, order_by: sortColumn.active }
    this.loadPatientHIstory(payload)
  }

  searchFunction(searchText: string) {
    const payload = { ...this.pagination, search_key: searchText }
    this.loadPatientHIstory(payload)
  }

  getFiltered(key: string) {
    this.filter_search_key = key === 'doctor' ? RoleCode.Doctor : key === 'organization' ? RoleCode.Organisation : '';
    const payload = { ...this.pagination, search_key: this.filter_search_key, search_column: this.filter_search_key !== '' ? 'role_id' : '' }
    this.loadPatientHIstory(payload);
  }

  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

}
