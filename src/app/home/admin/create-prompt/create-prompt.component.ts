import { Component, Inject, Optional, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DoctorService } from '../../../shared/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../../shared/services/patient.service';
import { Role } from '../../../shared/enum/role';

@Component({
  selector: 'app-create-prompt',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-prompt.component.html',
  styleUrl: './create-prompt.component.scss'
})
export class CreatePromptComponent {
  createPromptForm!: FormGroup;
  apiService = inject(DoctorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  toasterService = inject(ToastrService);
  modalService = inject(MatDialog);
  patientService = inject(PatientService)
  promptData!: any;
  promptTemplate: any;
  private dialogRef = inject(MatDialogRef<CreatePromptComponent>, { optional: true });
  doctorService = inject(DoctorService);
  promptList: any[] = [];
  pagination: any = {
    search_key: '',
    search_column: '',
    order: 'desc',
    page: 1
  }
  showPrompt: boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: { isEdit: boolean, promptdata: any }) {
    if (this.data) {
      this.promptData = this.data;
    }

  }

  ngOnInit() {
    this.initForm();
    const role = sessionStorage.getItem('role');
    if (role === Role.organisation) {
      this.showPrompt = true;
      this.loadPromptHIstoryForOrg(this.pagination);
    }else{
      this.loadPromptHIstory(this.pagination);
    }
    this.retrievePromptType()
    if (this.promptData?.isEdit) {
      this.patchValue();
    }
  }

  retrievePromptType() {
    this.apiService.retrievePromptType().pipe().subscribe({
      next: (response: any) => {
        if (response.data.length) {
          this.promptTemplate = response.data;
        }
      }
    })
  }

  patchValue() {
    console.log(this.promptData)
    this.createPromptForm.get('key')?.setValue(this.promptData.promptdata.promptName)
    this.createPromptForm.get('value')?.setValue(this.promptData.promptdata.text)
    this.createPromptForm.get('type')?.setValue(+this.promptData.promptdata.typeId)
  }

  initForm() {
    this.createPromptForm = new FormGroup({
      key: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })
  }

  createPrompt() {
    if (this.createPromptForm.valid) {
      const payload = {
         ...this.createPromptForm.value,
         type:this.createPromptForm.get('type')!.value,
      }
      this.apiService.createPrompt(payload).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.toasterService.success("Prompt Added Successfully");
            this.closeModel(true);
          }
        },
        error: (err) => {
          this.toasterService.error(err?.error?.message);
        }
      })
    } else {
      this.createPromptForm.markAllAsTouched();
      this.createPromptForm.markAsDirty();
    }
  }

  updatePrompt(promptId: string) {
    if (this.createPromptForm.valid) {
      const payload = { ...this.createPromptForm.value, prompt_id: promptId }
      this.apiService.updatePrompt(promptId, payload).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.toasterService.success("Prompt Updated Successfully");
            this.closeModel(true);
          }
        },
        error: (err) => {
          this.toasterService.error(err?.error?.message);
        }
      })
    } else {
      this.createPromptForm.markAllAsTouched();
      this.createPromptForm.markAsDirty();
    }
  }

  closeModel(value: boolean) {
    this.dialogRef?.close(value);
  }

  loadPromptHIstory(payload: any) {
    this.doctorService.retrievePromptList(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.promptList = response?.data;
        }
      }
    })
  }

  loadPromptHIstoryForOrg(payload: any) {
    this.doctorService.retrievePromptforOrg(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.promptList = response?.data;
        }
      }
    })
  }

  onSelectionChange(event: any) {
    const value = event.value;
    this.createPromptForm.get('value')?.setValue(value?.value);
    this.createPromptForm.get('type')?.setValue(+value?.type);
    this.createPromptForm.get('type')?.disable();
  }

}
