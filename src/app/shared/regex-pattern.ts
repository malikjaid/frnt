export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VALID_URL: RegExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
export const SPECHAR: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
export const SPECHARWITHOUTDASH: RegExp = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/
export const UPLOW: RegExp = /[a-zA-Z][a-zA-Z ]+/
export const UP: RegExp = /[A-Z]/
export const LOW: RegExp = /[a-z]/
export const NUM: RegExp = /[0-9]/

