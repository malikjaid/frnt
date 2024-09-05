import { Component, Inject, Optional, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, mustMatch, onlyNumAllowed, passStrenValidator, spaceNotAllowed } from '../../../shared/Validators/Validators';
import { DoctorService } from '../../../shared/services/doctor.service';
import { GenericResponse } from '../../../shared/modal/payload.modal';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleCode } from '../../../shared/enum/role';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organisation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-organisation.component.html',
  styleUrl: './create-organisation.component.scss'
})
export class CreateOrganisationComponent {

  createOrgainsationForm!: FormGroup;
  commonService = inject(DoctorService);
  toasterService = inject(ToastrService);
  modalService = inject(MatDialog);
  idEditForm: boolean = false;
  orgId!: string;
  patchValueOnEdit: any;
  isPasswordVisible:boolean = false;
  isConfirmPasswordVisible:boolean = false;
  router = inject(Router);
  countryList: { name: string, code: string }[] = [
    { name: 'USA', code: '+1' },
    { name: 'UAE', code: '+971' },
    { name: 'UK', code: '+44' },
  ];
  private dialogRef = inject(MatDialogRef<CreateOrganisationComponent>, { optional: true });
  
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: { isEdit: boolean, organisationId: string }) {
    if (this.data && this.data.isEdit) {
      this.idEditForm = this.data.isEdit;
      this.orgId = this.data.organisationId
    }
  }

  ngOnInit() {
    this.initForm()
    if (this.idEditForm) {
      this.patchValue();
      this.createOrgainsationForm.get('password')?.removeValidators([Validators.required]);
      this.createOrgainsationForm.get('cPassword')?.removeValidators([Validators.required]);
    }
  }

  patchValue() {
    this.fetchDetailsForEdit();
  }

  fetchDetailsForEdit() {
    this.commonService.retrieveDoctorHistory({}, this.orgId).subscribe({
      next: (response: any) => {
        if (response) {
          this.patchValueOnEdit = {
            full_name: response?.data?.full_name,
            email: response?.data?.email,
            password: '',
            contact_no: response?.data?.contact_no,
            country: response?.data?.country_name,
            address: response?.data?.address,
            country_code: response?.data?.country_code,
          };
          this.createOrgainsationForm.patchValue(this.patchValueOnEdit);
        }
      },
      error: (err) => { 
        this.toasterService.success(err?.error?.message);
      }
    });


  }

  initForm() {
    this.createOrgainsationForm = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator]),
      contact_no: new FormControl('', [Validators.required, onlyNumAllowed, Validators.minLength(10), Validators.maxLength(10)]),
      country: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      // country_code: new FormControl(''),
      password: new FormControl('', [Validators.required, passStrenValidator, Validators.minLength(12), Validators.maxLength(20), spaceNotAllowed]),
      cPassword: new FormControl("", [Validators.required])
    }, {
      validators: mustMatch('password', 'cPassword')
    }
    )
  }

  updateFormforAdmin() {
    this.createOrgainsationForm.get('password')?.removeValidators(Validators.required)
  }

  createOrganisation() {
    if (this.createOrgainsationForm.valid) {
      const country = this.createOrgainsationForm.get('country')?.value;
      const country_code = this.countryList.find((el: any) => el?.name === country)?.code;
      const payload = { ...this.createOrgainsationForm.value, country_code: country_code, role_id: RoleCode.Organisation };
      this.commonService.createUser(payload).subscribe({
        next: (response: any) => {
          if (response) {
            const data = response as GenericResponse;
            if (data.status === 200) {
              this.toasterService.success("Organisation created Successfully");
              this.createOrgainsationForm.reset();
              this.dialogRef?.close(true);
            } else {
              this.toasterService.error('Error: ' + (data.message || 'Unknown error occurred'));
            }
          }
        },
        error: (err) => { 
          this.toasterService.success(err?.error?.message);
        }
      });
    } else {
      this.createOrgainsationForm.markAllAsTouched();
      this.createOrgainsationForm.markAsDirty();
      this.toasterService.error('Please fill out the form correctly before submitting.');
    }
  }

  updateOrganisation() {
    if (this.createOrgainsationForm.valid) {
      const country = this.createOrgainsationForm.get('country')?.value;
      const country_code = this.countryList.find((el: any) => el?.name === country)?.code;
      const payload = { ...this.createOrgainsationForm.value, country_code: country_code, role_id: RoleCode.Organisation };
      this.commonService.updateUser(payload, this.orgId).subscribe({
        next: (response: any) => {
          if (response) {
            const data = response as GenericResponse;
            if (data.status === 200) {
              this.toasterService.success(data.message);
              this.createOrgainsationForm.reset();
              this.dialogRef?.close(true);
            } else {
              this.toasterService.error('Error: ' + (data.message || 'Unknown error occurred'));
            }
          }
        },
        error: (err) => { 
          this.toasterService.success(err?.error?.message);
        }
      });
    } else {
      this.createOrgainsationForm.markAllAsTouched();
      this.createOrgainsationForm.markAsDirty();
      this.toasterService.error('Please fill out the form correctly before submitting.');
    }
  }

  closeModel(value: boolean) {
    this.dialogRef?.close(value);
  }



}
