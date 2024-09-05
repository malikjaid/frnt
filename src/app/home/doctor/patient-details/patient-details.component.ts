import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DatePipe, NgClass } from '@angular/common';
import { GenerateCodes, GenrateSummaryPayload, PatientListResponse } from '../../../shared/modal/payload.modal';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Role } from '../../../shared/enum/role';
import { MatDialog } from '@angular/material/dialog';
import { AddCodesComponent } from '../../../shared/components/add-codes/add-codes.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent {
  patientService = inject(PatientService);
  activatedRoute = inject(ActivatedRoute);
  modalService = inject(MatDialog);
  changeDetector = inject(ChangeDetectorRef)
  patientId!: any;
  tableColumn: string[] = ['Patient Name', 'Patient Id', 'Patient Type', 'Prompt Type', 'Audio', 'Created Date'];
  codeTableColumn: string[] = ['Sr no', 'Code', 'Description', 'Action', 'Review']
  dataSource = <any>([]);
  patientDetailsForm!: FormGroup;
  CPTCodes!: any[];
  ICDCodes!: any[];
  citations!: any[];
  progressStatus!: string;

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.getPatientData(this.patientId);
      this.patientDetailsForm = new FormGroup({
        transcript: new FormControl(''),
        optimizedTranscript: new FormControl(''),
        summary: new FormControl(''),
        chooseTranscript: new FormControl(''),
      })
    }

  }

  getPatientData(patientId: string, created_by_id?: string) {
    const role = sessionStorage.getItem('role');
    let payload;
    if (role === Role.doctor) {
      payload = {}
    } else {
      payload = {
        created_by_id: sessionStorage.getItem('doctorId') ? sessionStorage.getItem('doctorId') : ''
      }
    }
    this.patientService.retrievePatientHistory(payload, patientId).pipe().subscribe({
      next: (response:any) => {
        if (response) {
          const patientData = response as PatientListResponse;
          if (patientData.status === 200) {
            this.dataSource =[patientData.data];
            this.progressStatus = response?.data?.progress_status;
            this.patientDetailsForm.get('transcript')?.setValue(response?.data?.transcript || 'No Data Available');
            this.patientDetailsForm.get('optimizedTranscript')?.setValue((JSON.parse(response?.data?.optimize_transcript)?.OptimizedTranscription || JSON.parse(response?.data?.optimize_transcript)?.optimizedTranscription )|| 'No Data Available');
            this.patientDetailsForm.get('summary')?.setValue(response?.data?.summary || 'No Data Available');
            this.ICDCodes = response?.data?.mcd_code.filter((code:any) => code?.type === 'icd');
            this.CPTCodes = response?.data?.mcd_code.filter((code:any) => code?.type === 'cpt');
            this.citations = JSON.parse(response?.data?.citation);
          }
        }
      }
    })
  }

  sendCodeReview(patientId: string, event: MatRadioChange) {
    const selectedValue = event.value;
    if (selectedValue && patientId) {
      const payload = {
        id: patientId,
        data: selectedValue,
        type: ''
      }
      this.patientService.reviewPatient(payload).pipe().subscribe({
        next: (response: any) => {
          if (response && response?.status === 200) {
            this.getPatientData(this.patientId);
          }
        }
      })
    }
  }


  sendCodeReviewType(patientId: string, event: any) {
    const review = event.target.value;
    if (review && patientId) {
      const payload = {
        id: patientId,
        data: review,
        type: 'review'
      }
      this.patientService.reviewPatient(payload).pipe().subscribe({
        next: (response: any) => {
          if (response && response?.status === 200) {
            this.getPatientData(this.patientId);
          }
        }
      })
    }
  }



  generateTranscript() {
    const payload: GenrateSummaryPayload = {
      patient_id: this.dataSource[0].id,
      prompt_id: this.dataSource[0].prompt_id,
      transcript: this.dataSource[0].transcript,
      is_edited: false
    }
    this.patientService.generateSummary(payload).pipe().subscribe({
      next: (response) => {
        if (response) {
          this.getPatientData(this.patientId);
        }
      }
    })
  }


  generateCode() {
    const payload = {
      patient_id: this.dataSource[0].id
    }
    this.patientService.generateCode(payload).pipe().subscribe({
      next: (response) => {
        if (response) {
          this.getPatientData(this.patientId);
        }
      }
    })
  }

  addNewCodes(codeType: string) {
    const addcodeModel = this.modalService.open(AddCodesComponent, {
      maxWidth: '700px',
      data: {
        patentModel_id: this.patientId,
        patientId: this.dataSource[0].patient_id,
        codeType: codeType,
      }
    })
    addcodeModel.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getPatientData(this.patientId);
      }
    });
  }

}