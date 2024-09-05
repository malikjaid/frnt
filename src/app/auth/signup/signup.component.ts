import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, mustMatch, onlyNumAllowed, passStrenValidator, spaceNotAllowed } from '../../shared/Validators/Validators';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';
import { DoctorService } from '../../shared/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleCode } from '../../shared/enum/role';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  createOrgainsationForm!: FormGroup;
  createDoctorForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  countryList: { name: string, code: string }[] = [
    { name: 'USA', code: '+1' },
    { name: 'UAE', code: '+971' },
    { name: 'UK', code: '+44' },
  ];
  specializationData: any[] = [];
  currentRoute: string = '';

  constructor(
    private doctorService: DoctorService,
    private toasterService: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentRoute = this.actRoute?.snapshot?.routeConfig?.path as string;
  }

  ngOnInit() {
    this.initForm();
    if (this.currentRoute === 'register-doctor') {
      this.specializationList();
    }
  }

  initForm() {
    this.createOrgainsationForm = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator]),
      contact_no: new FormControl('', [Validators.required, onlyNumAllowed, Validators.minLength(10), Validators.maxLength(10)]),
      country: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passStrenValidator, Validators.minLength(12), Validators.maxLength(20), spaceNotAllowed]),
      cPassword: new FormControl("", [Validators.required])
    }, {
      validators: mustMatch('password', 'cPassword')
    }
    );

    this.createDoctorForm = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, passStrenValidator, Validators.minLength(12), Validators.maxLength(20), spaceNotAllowed]),
      specialization: new FormControl('', [Validators.required]),
      organization: new FormControl('', []),
      country: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required])
    }, {
      validators: mustMatch('password', 'cPassword')
    });
  }

  specializationList() {
    const payload = { search_key: "", search_column: "", page: 1, per_page: 10 };
    this.doctorService.retrieveSpecialization(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.specializationData = response.data;
        } else {
          this.toasterService.error('Failed to retrieve specialization data.');
        }
      },
      error: (err) => {
        this.toasterService.error(err.error.message);
      },
    });
  }

  createOrg() {
    if (this.createOrgainsationForm.invalid) {
      this.createOrgainsationForm.markAllAsTouched();
      this.createOrgainsationForm.markAsDirty();
      return;
    }
    const country = this.createOrgainsationForm.get('country')?.value;
    const country_code = this.countryList.find((el: any) => el?.name === country)?.code;
    const payload = {
      full_name: this.createOrgainsationForm.get('full_name')?.value,
      email: this.createOrgainsationForm.get('email')?.value,
      country: this.createOrgainsationForm.get('country')?.value,
      contact_no: this.createOrgainsationForm.get('contact_no')?.value,
      address: this.createOrgainsationForm.get('address')?.value,
      password: this.createOrgainsationForm.get('password')?.value,
      country_code: country_code,
      role_id: RoleCode.Organisation
    };
    this.authService.createOrgnDoc(payload).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.toasterService.success(res.message);
          this.router.navigate(['/login']);
        } else {
          this.toasterService.error('Failed to retrieve specialization data.');
        }
      },
      error: (err) => {
        this.toasterService.error(err?.error?.message);
      },
    });
  }

  createDr() {
    if (this.createDoctorForm.invalid) {
      this.createDoctorForm.markAllAsTouched();
      this.createDoctorForm.markAsDirty();
      return;
    }
    const country = this.createDoctorForm.get('country')?.value;
    const country_code = this.countryList.find((el: any) => el?.name === country)?.code;
    const payload = {
      country: this.createDoctorForm.get('country')?.value,
      country_code: country_code,
      email: this.createDoctorForm.get('email')?.value,
      full_name: this.createDoctorForm.get('full_name')?.value,
      organization: this.createDoctorForm.get('organization')?.value,
      password: this.createDoctorForm.get('password')?.value,
      specialization: this.createDoctorForm.get('specialization')?.value?.join(','),
      role_id: RoleCode.Doctor
    };
    this.authService.createOrgnDoc(payload).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.toasterService.success(res.message);
          this.router.navigate(['/login']);
        } else {
          this.toasterService.error('Failed to retrieve specialization data.');
        }
      },
      error: (err) => {
        this.toasterService.error(err?.error?.message);
      },
    });

  }


}
