import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPayload } from '../modal/payload.modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = '/api/login';
  private LOGOUT_URL = '/api/logout';
  private SIGNUP_ORG_DOC = '/api/user/sign-up';
  private VERIFYOTP = '/api/verify-otp';
  private RESENDOTP = '/api/resend-otp';
  private FORGOT_PASSWORD = '/api/forgot-password';
  private RESET_PASSWORD = '/api/reset-password';

  routerService = inject(Router);
  http = inject(HttpClient);
  encryptionService = inject(EncryptionService)
  constructor() { }

  loginUser(payload: LoginPayload): Observable<any> {
    return this.http.post(`${environment.url}${this.LOGIN_URL}`, payload);
  }

  logoutUser() {
    return this.http.post(`${environment.url}${this.LOGOUT_URL}`, {})
  }

  get getAuthToken(): any {
    return  this.encryptionService.getDecryptedData('token')
  }

  get loginRole(): any {
    return sessionStorage.getItem('role');
  }

  createOrgnDoc(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.url}${this.SIGNUP_ORG_DOC}`, payload);
  }

  validateOtp(payload: any): Observable<any> {
    return this.http.post(`${environment.url}${this.VERIFYOTP}`, payload);
  }

  resendOtp(payload: any): Observable<any> {
    return this.http.post(`${environment.url}${this.RESENDOTP}`, payload);
  }

  forgotPass(payload: any): Observable<any> {
    return this.http.post(`${environment.url}${this.FORGOT_PASSWORD}`, payload);
  }

  resetPass(payload: any): Observable<any> {
    return this.http.post(`${environment.url}${this.RESET_PASSWORD}`, payload);
  }


}
