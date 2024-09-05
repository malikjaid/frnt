import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

export const sharedInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(CommonService);
  if(req.url.includes('optimize-transcript')){
    loaderService.hideLoader();
  }else{
  loaderService.showLoader();
  }
  return next(req).pipe(finalize(()=>loaderService.hideLoader()));
};


export const AuthTokenInterceptor:HttpInterceptorFn = (req,next)=>{
  const authToken = inject(AuthService).getAuthToken;
  if(authToken){
    const cloneReq = req.clone({
      headers:req.headers.append('Authorization',`Bearer ${authToken}`)
    })
    return next(cloneReq);
  }else{
    return next(req)
  }
}
