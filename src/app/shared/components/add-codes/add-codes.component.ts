import { Component, Inject, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-codes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-codes.component.html',
  styleUrl: './add-codes.component.scss'
})
export class AddCodesComponent {
  addCodeForm!: FormGroup;
  patientId!: string;
  patientService = inject(PatientService);
  taosterService = inject(ToastrService);
  patentModel_id!:string;
  private dialogRef = inject(MatDialogRef<AddCodesComponent>, { optional: true });


  constructor(@Inject(MAT_DIALOG_DATA) public data: { patientId: string, codeType: string, patentModel_id:string }) {
    if (this.data.patientId) {
      this.patientId = this.data.patientId;
      this.patentModel_id = this.data?.patentModel_id;
    }
  }

  ngOnInit() {
    this.initForm();
    if (this.patientId) {
      this.addCodeForm.get('patient_id')?.setValue(this.patientId);
      this.addCodeForm.get('type')?.setValue(this.data.codeType);
      this.addCodeForm.get('patient_id')?.disable();
    }
  }

  initForm() {
    this.addCodeForm = new FormGroup({
      patient_id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    })
  }


  addCode() {
    if (this.addCodeForm.valid) {
      let payload  = { ...this.addCodeForm.value, patient_id:this.patentModel_id || this.patientId};
      this.patientService.addNewCodes(payload).pipe().subscribe({
        next: (response: any) => {
          if (response) {
            this.taosterService.success("New codes added successfully ");
            this.coseMode(true);
          }
        },
        error: (err) => {
          this.taosterService.error(err.error.message);
        }
      })
    } else {
      this.addCodeForm.markAsDirty();
      this.addCodeForm.markAllAsTouched()
    }
  }

  coseMode(value:boolean){
    this.dialogRef?.close(value);
  }

}
