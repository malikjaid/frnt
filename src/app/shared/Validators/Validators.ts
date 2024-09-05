import {AbstractControl, FormControl, FormGroup, ValidationErrors,  ValidatorFn } from "@angular/forms";
import { EMAIL_REGEX, UPLOW, UP, LOW, NUM, SPECHAR, SPECHARWITHOUTDASH } from "../regex-pattern";



export function nameValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        const namePattern = /^[a-zA-Z ]*$/;
        const value = control.value;
        if(value){
            const isValid = namePattern.test(value)
            return isValid ? null : {nameError:true}
        }else{
            return {required:true}
        }
    }
}

// Requied validators
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const regularExp: RegExp = EMAIL_REGEX;
    let cValue = control.value;
    cValue = (cValue || '').toString().trim();
    if (!cValue)
      return { required: true };
    return regularExp.test(cValue) ? null : {
      email: true
    };
  };
  
  export const uplowValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', uplow: RegExp = UPLOW;
    if (value && uplow.test(value)) {
      return { uplow: true };
    }
    return null;
  }
  
  export const passStrenValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', upp: RegExp = UP, lowe: RegExp = LOW, numb: RegExp = NUM, speci: RegExp = SPECHAR;
    if (!value) { return null; }
    if (upp.test(value) === false) { return { upp: true }; }
    if (lowe.test(value) === false) { return { lowe: true }; }
    if (numb.test(value) === false) { return { numb: true }; }
    if (speci.test(value) === false) { return { speci: true }; }
    return null;
  }
  
  export const upperValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', upp: RegExp = UP;
    if (!value) { return null; }
    if (upp.test(value) === false) { return { upp: true }; }
    return null;
  }
  
  export const lowerValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', lowe: RegExp = LOW;
    if (!value) { return null; }
    if (lowe.test(value) === false) { return { lowe: true }; }
    return null;
  }
  
  export const onlyNumAllowed: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', upp: RegExp = UP, lowe: RegExp = LOW, speci: RegExp = SPECHAR;
    if (!value) { return null; }
    if (upp.test(value) === true) { return { notNum: true }; }
    if (lowe.test(value) === true) { return { notNum: true }; }
    if (speci.test(value) === true) { return { notNum: true }; }
    return null;
  }
  
  // not allowed validators
  
  export const numNotAllowed: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', numb: RegExp = NUM;
    if (!value) { return null; }
    if (numb.test(value) === true) { return { numb: true }; }
    return null;
  }
  
  export const spaceNotAllowed: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if ((control.value as string)?.indexOf(' ') >= 0) {
      return { space: true }
    }
    return null;
  }
  
  export const speCharNotAllowed: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', speChar: RegExp = SPECHAR;
    if (value && speChar.test(value)) {
      return { speChar: true };
    }
    return null;
  }

  export const speCharNotAllowedWithoutDash: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '', speChar: RegExp = SPECHARWITHOUTDASH;
    if (value && speChar.test(value)) {
      return { speCharwithoutDash: true };
    }
    return null;
  }
  
  
  export function noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }
  
  export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const mainControl = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (!mainControl || !matchingControl) {
        return null;
      }
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }
      if (mainControl.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
  
  export function checking(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value.length;
    if (value >= 10 && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
      event.preventDefault();
    }
  }
  


// export function checkMaxValueFromMin():ValidatorFn{
//     return (control:AbstractControl):ValidationErrors | null => {
//         const value = control.value;
        
//         return null;
//     }
// }