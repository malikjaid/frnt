import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, mustMatch, passStrenValidator, spaceNotAllowed } from '../../shared/Validators/Validators';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleCode } from '../../shared/enum/role';
import { CommonModule } from '@angular/common';
import { EncryptionService } from '../../shared/services/encryption-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewChecked {

  protected isPasswordVisible: boolean = false;
  protected isConfirmPasswordVisible: boolean = false;
  protected loginForm!: FormGroup;
  protected forgotPassForm!: FormGroup;
  currentRoute: string = '';
  sentOtp: boolean = true;
  ResetOTP: boolean = false;
  otpBox: string[] = new Array(6).fill('');
  loginOTP: boolean = false;
  validateForgPass: boolean = false;

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private actRoute: ActivatedRoute,
    private routerService: Router,
    private cdr: ChangeDetectorRef,
    private encryptionService: EncryptionService,
  ) {
    this.currentRoute = this.actRoute?.snapshot?.routeConfig?.path as string;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator, spaceNotAllowed]),
      password: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
    });

    this.forgotPassForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
      otp: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required, passStrenValidator, Validators.minLength(12), Validators.maxLength(20), spaceNotAllowed]),
      c_new_assword: new FormControl('', [Validators.required])
    }, {
      validators: mustMatch('password', 'c_new_assword')
    }
    );
  }

  login() {
    if (this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid) {
      const payload = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }
      this.authService.loginUser(payload).subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            console.log(res)
            if (res.message === 'Login successfully' && res.token) {
              const encryptedToken = this.encryptionService.encrypt(res.data.token);
              sessionStorage.setItem('token', encryptedToken);
              sessionStorage.setItem('role', res.data.role);
              sessionStorage.setItem('roleId', res.data.role_id.toString());
              const encryptedData = this.encryptionService.encrypt(res.data);
              sessionStorage.setItem('userData', encryptedData);
              this.routerService.navigateByUrl('/home/organisation/dashboard');
            } else {
              this.loginOTP = true;
            }
            this.toasterService.success(res.message);
          }else{
            this.toasterService.error(res.message);
          }
        },
        error: (err) => {
          this.toasterService.error(err?.error?.message);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
    }
    this.loginForm.get('otp')?.clearValidators();
  }

  loginValidateOTP() {
    this.loginForm.get('otp')?.addValidators([Validators.required]);
    const otp = this.otpBox.join('');
    if (this.loginForm.get('otp')?.valid && otp?.length === 6) {
      const payload = {
        email: this.loginForm.get('email')!.value,
        email_otp: otp
      }
      this.authService.validateOtp(payload).subscribe({
        next: (res) => {
          if (res?.status === 400) {
            this.toasterService.error(res?.message);
          }
          if (res?.status === 200) {
            const encryptedToken = this.encryptionService.encrypt(res.data.token);
            sessionStorage.setItem('token', encryptedToken);
            sessionStorage.setItem('role', res.data.role);
            sessionStorage.setItem('roleId', res.data.role_id.toString());
            const encryptedData = this.encryptionService.encrypt(res.data);
            sessionStorage.setItem('userData', encryptedData);
            if (res.data.role_id === RoleCode.Organisation) {
              this.routerService.navigateByUrl('/home/doctor/dashboard');
            } else {
              sessionStorage.setItem('doctorId',res.data.id);
              this.routerService.navigateByUrl('/home/patient/dashboard');
            }
            this.toasterService.success("Logged in successfully");
          }
        },
        error: (err) => {
          this.toasterService.error(err?.error?.message);
        }
      });
    }
  }

  sendOtptoForgotpass() {
    this.forgotPassForm.get('otp')?.clearValidators();
    if (this.forgotPassForm.get('email')?.invalid) {
      this.forgotPassForm.markAllAsTouched();
      this.forgotPassForm.markAsDirty();
      return;
    }
    if (this.forgotPassForm.get('email')?.valid) {
      const payload = {
        email: this.forgotPassForm.get('email')?.value,
      }
      this.authService.forgotPass(payload).subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            this.sentOtp = false;
            this.validateForgPass = true;
            this.ResetOTP = false;
            this.forgotPassForm.get('email')?.disable();
            this.toasterService.success(res.message);
          }else{
            this.toasterService.error(res.message);
          }
        },
        error: (err) => {
          this.toasterService.error(err.error.message);
        }
      });
    }
  }

  editMail() {
    this.sentOtp = true;
    this.validateForgPass = false;
    this.ResetOTP = false;
    this.forgotPassForm.get('email')?.enable();
    this.loginForm.get('otp')?.reset();
    this.forgotPassForm.get('otp')?.reset();
  }

  validateforgOTP() {
    this.forgotPassForm.get('otp')?.addValidators([Validators.required]);
    if (this.forgotPassForm.get('otp')?.invalid) {
      this.forgotPassForm.markAllAsTouched();
      this.forgotPassForm.markAsDirty();
      return;
    }
    const otp = this.otpBox.join('');
    if (this.forgotPassForm.get('otp')?.valid && otp.length === 6) {
      const payload = {
        email: this.forgotPassForm.get('email')?.value,
        email_otp: otp
      }
      this.authService.validateOtp(payload).subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            this.sentOtp = false;
            this.validateForgPass = false;
            this.ResetOTP = true;
            this.toasterService.success(res.message);
          }
        },
        error: (err) => {
          this.toasterService.error(err.error.message);
        }
      });
    }

  }

  resetPass() {
    if (this.forgotPassForm.get('new_password')?.invalid && this.forgotPassForm.get('c_new_assword')?.invalid) {
      this.forgotPassForm.markAllAsTouched();
      this.forgotPassForm.markAsDirty();
      return;
    }
    if (this.forgotPassForm.get('new_password')?.valid) {
      const payload = {
        email: this.forgotPassForm.get('email')?.value,
        password: this.forgotPassForm.get('new_password')?.value,
      }
      this.authService.resetPass(payload).subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            this.routerService.navigate(['/login']);
            this.toasterService.success(res.message);
          }
        },
        error: (err) => {
          this.toasterService.error(err.error.message);
        }
      });
    }

  }

  resendOtp(loginOTP: boolean) {
    this.loginForm.get('otp')?.reset();
    this.forgotPassForm.get('otp')?.reset();
    const email = loginOTP ? this.loginForm.get('email')!.value : this.forgotPassForm.get('email')!.value;
    const payload = {
      email: email,
    }
    if (email) {
      this.authService.resendOtp(payload).subscribe({
        next: (res) => {
          if (res?.status === 200) {
            this.toasterService.success(res.message);
          }
        },
        error: (err) => {
          this.toasterService.error(err?.error?.message);
        }
      });
    }

  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.ctrlKey && event.key === 'v') {
      return;
    }
    if (!((event.key >= '0' && event.key <= '9') || event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
    }
    if (event.key === 'Backspace' && this.otpBox[index] === '') {
      if (index > 0) {
        const prevInput = document.querySelectorAll('.otp_input_fields')[index - 1] as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 1) {
      input.value = value.charAt(0);
    } else {
      input.value = value;
    }
    this.otpBox[index] = input.value;
    if (input.value.length === 1 && index < this.otpBox.length - 1) {
      const nextInput = document.querySelectorAll('.otp_input_fields')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const numericData = pasteData.replace(/[^0-9]/g, '');
    const otpInputs = document.querySelectorAll('.otp_input_fields') as NodeListOf<HTMLInputElement>;
    let pasteIndex = index;
    for (let i = 0; i < numericData.length && pasteIndex < otpInputs.length; i++, pasteIndex++) {
      const input = otpInputs[pasteIndex];
      input.value = numericData[i];
      this.otpBox[pasteIndex] = numericData[i];
    }
    const nextInputIndex = Math.min(index + numericData.length, otpInputs.length - 1);
    otpInputs[nextInputIndex].focus();
  }
}
