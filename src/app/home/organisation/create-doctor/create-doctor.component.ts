import { Component, Inject, Optional, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateDoctorPayload, CreateUserPayload, GenericResponse, Specialization } from '../../../shared/modal/payload.modal';
import { DoctorService } from '../../../shared/services/doctor.service';
import { emailValidator, mustMatch, passStrenValidator, spaceNotAllowed } from '../../../shared/Validators/Validators';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-create-doctor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.scss'
})
export class CreateDoctorComponent {
  createDoctorForm!: FormGroup;
  doctorService = inject(DoctorService);
  toasterService = inject(ToastrService);
  modalService = inject(MatDialog);
  authService = inject(AuthService)
  private dialogRef = inject(MatDialogRef<CreateDoctorComponent>, { optional: true });
  listingPayload = {
    search_key: "",
    search_column: "",
    page: 1,
    per_page: 10,
  }
  pagination: any = {
    search_key: '',
    search_column: '',
    page: 1,
    role_id: 1
  }
  specializationData: Array<Specialization> = [];
  router = inject(Router)
  idEditForm: boolean = false;
  doctorId!: string;
  patchValueOnEdit: any;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  organizationData: any[] = [];
  countryList: { name: string, code: string }[] = [
    { name: 'USA', code: '+1' },
    { name: 'UAE', code: '+971' },
    { name: 'UK', code: '+44' },
  ];

  featuresListing: any[] = [];
  featuresAcces:Array<{feature_id:number, enable:any}> = [];
  checked = true;
  isOrganisation:boolean  = false;

  ngOnInit() {
    this.initForm();
    this.retrieveSpecialization();
    this.loadFeaturesList();
    this.loadOrganization(this.pagination);
    if (this.idEditForm) {
      this.patchValue();
      this.createDoctorForm.get('password')?.removeValidators([Validators.required]);
      this.createDoctorForm.get('cPassword')?.removeValidators([Validators.required]);
    }
  }

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: { isEdit: boolean, doctorId: string, organisationId:string },
  ) {
    console.log(this.authService.loginRole === 'Organization')

    console.log(this.data)
    if (this.data) {
      this.idEditForm = this.data.isEdit;
      this.doctorId = this.data.doctorId;
      if(this.data.organisationId){
        this.isOrganisation  = true;
      }
    }

    if(this.authService.loginRole === 'Organization'){
      this.isOrganisation = true;
    }

  }

  patchValue() {
    this.fetchDetailsForEdit();
  }

  loadFeaturesList() {
    const payload = { search_key: '', page: 1, per_page: 10, role_id: 2 };
    this.doctorService.getFeatures(payload).subscribe({
      next: (res: any) => {
        if (res) {
          const list = res?.data;
          if (list.length) {
            this.featuresListing = list.map((el: any) => {
              return { ...el, checked: 1 };
            });
            this.featuresAcces = list.map((el:any)=>{
              return {feature_id:el.id, enable:1}
            })
          } else {
            this.featuresListing = [];
          }
        }
      }
    })
  }

  fetchDetailsForEdit() {
    this.doctorService.retrieveDoctorHistory(this.listingPayload, this.doctorId).subscribe({
      next: (response: any) => {
        if (response) {
          this.patchValueOnEdit = {
            fullName: response?.data?.full_name,
            email: response?.data?.email,
            password: '',
            country: response?.data?.country_name,
            specialization: response?.data?.specialities?.map((data: any) => data.specialization_id),
            organization: response?.data?.organization_id,
          };
          if(!this.patchValueOnEdit.organization){
            this.isOrganisation = true;
          }
          this.createDoctorForm.patchValue(this.patchValueOnEdit);
        }
      }, error: (err) => {
        this.toasterService.success(err?.error?.message);
      }
    });
  }

  initForm() {
    this.createDoctorForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, passStrenValidator, Validators.minLength(12), Validators.maxLength(20), spaceNotAllowed]),
      specialization: new FormControl('', [Validators.required]),
      organization: new FormControl('', []),
      country: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required]),
    }, {
      validators: mustMatch('password', 'cPassword')
    });
  }


  retrieveSpecialization() {
    this.doctorService.retrieveSpecialization(this.listingPayload).subscribe({
      next: (response: any) => {
        if (response) {
          this.specializationData = response.data?.filter((data:any)=>data.state_id === 1)
        } else {
          this.toasterService.error('Failed to retrieve specialization data.');
        }
      },
      error: (err) => { 
        this.toasterService.success(err?.error?.message);
      }
    });
  }


  createUser() {
    if (this.createDoctorForm.valid) {
      const password = this.createDoctorForm.get('password')?.value;
      const cPassword = this.createDoctorForm.get('cPassword')?.value;
      if (password === cPassword) {
        const payload: CreateDoctorPayload = {
          full_name: this.createDoctorForm.get('fullName')?.value,
          email: this.createDoctorForm.get('email')?.value,
          password: this.createDoctorForm.get('password')?.value,
          role_id: 2,
          specialization: (this.createDoctorForm.get('specialization')?.value).join(),
          organization_id: (this.createDoctorForm.get('organization')?.value),
          country:this.createDoctorForm.get('country')?.value,
          feature_access: JSON.stringify(this.featuresAcces)
        };

        this.doctorService.createUser(payload).subscribe({
          next: (response: any) => {
            const result = response as GenericResponse;
            if (result && result.status === 200) {
              this.toasterService.success("Doctor created Successfully");
              this.createDoctorForm.reset();
              this.dialogRef?.close(true);
            }
          },error: (err) => { 
            this.toasterService.success(err?.error?.message);
          }
        });
      } else {
      }
    } else {
      this.createDoctorForm.markAllAsTouched();
      this.createDoctorForm.markAsDirty();
    }
  }

  updateUser() {
    if (this.createDoctorForm.valid) {
      const password = this.createDoctorForm.get('password')?.value;
      const cPassword = this.createDoctorForm.get('cPassword')?.value;
      if (password === cPassword) {
        const payload: CreateDoctorPayload = {
          full_name: this.createDoctorForm.get('fullName')?.value,
          email: this.createDoctorForm.get('email')?.value,
          password: this.createDoctorForm.get('password')?.value,
          role_id: 2,
          specialization: (this.createDoctorForm.get('specialization')?.value).join(),
          organization_id: (this.createDoctorForm.get('organization')?.value),
          country:this.createDoctorForm.get('country')?.value,
          feature_access: JSON.stringify(this.featuresAcces)
        };

        this.doctorService.updateUser(payload, this.doctorId).subscribe({
          next: (response: any) => {
            const result = response as GenericResponse;
            if (result && result.status === 200) {
              this.toasterService.success(result.message);
              this.createDoctorForm.reset();
              this.dialogRef?.close(true);
            } else {
              this.toasterService.error('Error: ' + (result?.message || 'Unknown error occurred'));
            }
          },error: (err) => { 
            this.toasterService.success(err?.error?.message);
          }
        });
      } else {
        this.toasterService.error("Password and confirm password doesn't match")
      }
    } else {
      this.createDoctorForm.markAllAsTouched();
      this.createDoctorForm.markAsDirty();
      this.toasterService.error('Please fill out the form correctly before submitting.');
    }
  }


  selectFeatures(event:MatCheckboxChange, index:number){
    console.log(event.checked, event.source.value);
    this.featuresAcces[index].enable = event.checked ? 1 : 0;
  }

  closeModel(value: boolean) {
    this.dialogRef?.close(value);
  }

  loadOrganization(payload: any) {
    this.doctorService.retrieveDoctorHistory(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.organizationData = response?.data.map((el: any) => {
            return { id: el?.id, name: el?.full_name }
          });
        }
      }
    })
  }


}
