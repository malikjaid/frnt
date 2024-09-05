import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { PatientDetailsComponent } from '../create-patient/create-patient.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TranscriptDialogeComponent } from '../../../shared/transcript-dialoge/transcript-dialoge.component';
import { PatientService } from '../../../shared/services/patient.service';
import { HistoryPayload, PatientListResponse } from '../../../shared/modal/payload.modal';
import { SummaryDialogeComponent } from '../../../shared/summary-dialoge/summary-dialoge.component';
import { Sort } from '@angular/material/sort';
import { debounceTime, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss'
})

export class PatientHistoryComponent implements AfterViewInit {

  displayedColumns: string[] = ['Sr no', 'Patient Name', 'Patient Id', 'Audio', 'Patient Type', 'Prompt Name', 'Status', 'Created Date', 'Report', 'View Details'];
  dataSource = <any>([]);

  pagination: HistoryPayload = {
    search_key: '',
    search_column: '',
    // order:'',
    // order_by:'',
    page: 1,
    per_page: 10,
  }
  totalCount: number = 0;
  patientId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  modalService = inject(MatDialog)
  patientService = inject(PatientService)
  activatedRoute = inject(ActivatedRoute);
  searchForm!: FormGroup;
  completedStatus:any = {
    "0":"Patient Added",
    "1":'Transcript Completed',
    "2":"Optimize Transcript Completed",
    "3":"Summary Completed",
    "4":"Completed"
  }


  @ViewChildren('audioControl') audioControl!: QueryList<ElementRef>


  ngOnInit() {
    const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientId = patientId;
      sessionStorage.setItem('doctorId', this.patientId)
    }

    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(async (searchText) => this.loadPatientHistory({ ...this.pagination, search_key: searchText }))
    ).subscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadPatientHistory(this.pagination);
  }

  loadPatientHistory(payload: HistoryPayload) {
    const patientPayload = { ...payload, created_by_id: +this.patientId }
    this.patientService.retrievePatientHistory(patientPayload).subscribe({
      next: (response: any) => {
        if (response) {
          const list = response as PatientListResponse;
          this.dataSource = list.data.map((patientList) => {
            return { id: patientList.id, PatientName: patientList.patient_name, PatientId: patientList.patient_id, audio: patientList.audio_file, typeId: patientList.type_id, audioFileURL: patientList.file_url, prompt:patientList.prompt, progressStatus:patientList.progress_status, createdDate: patientList.created_at, transcript: patientList.transcript, optimizedSummary: patientList.optimize_transcript, citation: patientList.citation, summary: patientList.summary, reportUrl:patientList.report_url ? patientList.report_url.trim(): '' }
          });
          this.pagination.page = list.meta.current_page;
          this.pagination.per_page = list.meta.per_page;
          this.totalCount = list.meta.total;

        }
      }
    })
  }


  showModal(data: string, title: string) {
    this.modalService.open(TranscriptDialogeComponent, {
      width: '800px',
      data: {
        data: title === 'Citations' ? JSON.parse(data) : data,
        modalTitle: title
      }
    });

  }

  showsummaryModal(summary: string) {
    this.modalService.open(SummaryDialogeComponent, {
      width: '800px',
      data: {
        summary: summary
      }
    })
  }

  handlePagination(event: PageEvent) {
    const paginationPayload = {
      ...this.pagination,
      page: event.pageIndex + 1,
      per_page: event.pageSize
    }
    this.loadPatientHistory(paginationPayload)
  }


  sortFunction(sortColumn: Sort) {
    const payload = { ...this.pagination, order: sortColumn.direction, order_by: sortColumn.active }
    this.loadPatientHistory(payload)
  }


  searchFunction(searchText: string) {
    const payload = { ...this.pagination, search_key: searchText }
    this.loadPatientHistory(payload)
  }

  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }


  downloadReport(patienId: string) {
    this.patientService.downloadReport(patienId).subscribe()
  }

  onPlay(index: number) {
    console.log(Array.from(this.audioControl).forEach((control: ElementRef, i: number) => {
      if (i !== index) {
        control.nativeElement.pause()
      }
    }))
  }

}
