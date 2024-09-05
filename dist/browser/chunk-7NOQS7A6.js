import{a as Se}from"./chunk-BQ62KYW7.js";import{a as Ce,b as Oe,c as ve,e as we,g as Ee}from"./chunk-CDS4ARN5.js";import{b as W}from"./chunk-LURNVO4I.js";import{a as Fe}from"./chunk-EQQULXW2.js";import{Q as _e,a as X,b as c,c as Z,d as ee,e as te,g as h,h as ie,i as re,j as ne,ka as he,n as ae,o as oe,p as le,r as se,s as me,t as ce,v as de,w as ue,x as pe,y as ge,z as fe}from"./chunk-7RWZJSZU.js";import{j as Q}from"./chunk-QNDYK3DZ.js";import{Ab as i,Bb as C,Fb as D,Kb as w,Mb as L,Ub as n,Va as a,Vb as K,Wa as z,Wb as U,Xb as $,ac as J,ca as O,ha as G,mb as f,ob as v,qa as N,ra as A,ub as m,vb as Y,xb as B,yb as H,zb as r}from"./chunk-JETHE2PU.js";import{a as q,b as I}from"./chunk-DM275RSA.js";function be(t,o){t&1&&(r(0,"mat-error",13),n(1,"Organisation Name is required"),i())}function ye(t,o){t&1&&(r(0,"mat-error",13),n(1,"Email is required"),i())}function Pe(t,o){t&1&&(r(0,"mat-error",13),n(1,"Invalid Email"),i())}function xe(t,o){t&1&&(r(0,"mat-error",18),n(1,"Confirm Password is required"),i())}function Me(t,o){t&1&&(r(0,"mat-error",13),n(1,"Your password is weak"),i())}function Te(t,o){t&1&&(r(0,"mat-error",18),n(1,"Password should be greater than 12 characters!"),i())}function Ve(t,o){t&1&&(r(0,"mat-error",18),n(1,"Password can not exceed 20 characters"),i())}function ke(t,o){t&1&&(r(0,"mat-error",18),n(1,"Space not allowed"),i())}function qe(t,o){t&1&&(r(0,"mat-error",18),n(1,"Confirm Password is required"),i())}function Ie(t,o){t&1&&(r(0,"mat-error",13),n(1,"Your password is weak"),i())}function Ne(t,o){t&1&&(r(0,"mat-error",18),n(1,"Password & Confirm Password must be same!"),i())}function Ae(t,o){if(t&1&&(r(0,"mat-option",23),n(1),i()),t&2){let _=o.$implicit;v("value",_==null?null:_.name),a(),K(_==null?null:_.name)}}function De(t,o){t&1&&(r(0,"mat-error",13),n(1,"Country is required"),i())}function Le(t,o){t&1&&(r(0,"mat-error",13),n(1,"Phone Number is required"),i())}function Ue(t,o){t&1&&(r(0,"mat-error",13),n(1,"Only Numbers allowed"),i())}function We(t,o){t&1&&(r(0,"mat-error",13),n(1,"Minimum length should be 10 digits"),i())}function Re(t,o){t&1&&(r(0,"mat-error",13),n(1,"Maximum length should be 10 digits"),i())}function je(t,o){t&1&&(r(0,"mat-error",13),n(1,"Address is required"),i())}function Ge(t,o){if(t&1){let _=D();r(0,"button",28),w("click",function(){N(_);let d=L();return A(d.updateOrganisation())}),n(1,"Update Details"),i()}}function ze(t,o){if(t&1){let _=D();r(0,"button",28),w("click",function(){N(_);let d=L();return A(d.createOrganisation())}),n(1,"Save"),i()}}var dt=(()=>{let o=class o{constructor(l){this.data=l,this.commonService=O(Se),this.toasterService=O(Fe),this.modalService=O(ge),this.idEditForm=!1,this.isPasswordVisible=!1,this.isConfirmPasswordVisible=!1,this.router=O(Q),this.countryList=[{name:"USA",code:"+1"},{name:"UAE",code:"+971"},{name:"UK",code:"+44"}],this.dialogRef=O(ue,{optional:!0}),this.data&&this.data.isEdit&&(this.idEditForm=this.data.isEdit,this.orgId=this.data.organisationId)}ngOnInit(){this.initForm(),this.idEditForm&&(this.patchValue(),this.createOrgainsationForm.get("password")?.removeValidators([c.required]),this.createOrgainsationForm.get("cPassword")?.removeValidators([c.required]))}patchValue(){this.fetchDetailsForEdit()}fetchDetailsForEdit(){this.commonService.retrieveDoctorHistory({},this.orgId).subscribe({next:l=>{l&&(this.patchValueOnEdit={full_name:l?.data?.full_name,email:l?.data?.email,password:"",contact_no:l?.data?.contact_no,country:l?.data?.country_name,address:l?.data?.address,country_code:l?.data?.country_code},this.createOrgainsationForm.patchValue(this.patchValueOnEdit))},error:l=>{this.toasterService.success(l?.error?.message)}})}initForm(){this.createOrgainsationForm=new te({full_name:new h("",[c.required]),email:new h("",[c.required,Ce]),contact_no:new h("",[c.required,ve,c.minLength(10),c.maxLength(10)]),country:new h("",[c.required]),address:new h("",[c.required]),password:new h("",[c.required,Oe,c.minLength(12),c.maxLength(20),we]),cPassword:new h("",[c.required])},{validators:Ee("password","cPassword")})}updateFormforAdmin(){this.createOrgainsationForm.get("password")?.removeValidators(c.required)}createOrganisation(){if(this.createOrgainsationForm.valid){let l=this.createOrgainsationForm.get("country")?.value,d=this.countryList.find(s=>s?.name===l)?.code,e=I(q({},this.createOrgainsationForm.value),{country_code:d,role_id:W.Organisation});this.commonService.createUser(e).subscribe({next:s=>{if(s){let u=s;u.status===200?(this.toasterService.success("Organisation created Successfully"),this.createOrgainsationForm.reset(),this.dialogRef?.close(!0)):this.toasterService.error("Error: "+(u.message||"Unknown error occurred"))}},error:s=>{this.toasterService.success(s?.error?.message)}})}else this.createOrgainsationForm.markAllAsTouched(),this.createOrgainsationForm.markAsDirty(),this.toasterService.error("Please fill out the form correctly before submitting.")}updateOrganisation(){if(this.createOrgainsationForm.valid){let l=this.createOrgainsationForm.get("country")?.value,d=this.countryList.find(s=>s?.name===l)?.code,e=I(q({},this.createOrgainsationForm.value),{country_code:d,role_id:W.Organisation});this.commonService.updateUser(e,this.orgId).subscribe({next:s=>{if(s){let u=s;u.status===200?(this.toasterService.success(u.message),this.createOrgainsationForm.reset(),this.dialogRef?.close(!0)):this.toasterService.error("Error: "+(u.message||"Unknown error occurred"))}},error:s=>{this.toasterService.success(s?.error?.message)}})}else this.createOrgainsationForm.markAllAsTouched(),this.createOrgainsationForm.markAsDirty(),this.toasterService.error("Please fill out the form correctly before submitting.")}closeModel(l){this.dialogRef?.close(l)}};o.\u0275fac=function(d){return new(d||o)(z(pe,8))},o.\u0275cmp=G({type:o,selectors:[["app-create-organisation"]],standalone:!0,features:[J],decls:79,vars:26,consts:[[1,"organisationWrapper"],[1,"container"],[1,"organisationForm"],[1,"d-flex","align-items-center","justify-content-between"],[1,"btn",3,"click","mat-dialog-close"],[3,"formGroup"],[1,"patientCard"],[1,"row"],[1,"col-12","col-sm-12","col-md-","12","col-lg-12","my-2"],[1,"form-group"],[1,"control-label"],["appearance","outline",1,"form-field"],["matInput","","placeholder","Organisation name","formControlName","full_name","autocomplete","off"],[1,"error-msg","mt-2"],["matInput","","type","email","placeholder","Email","formControlName","email","autocomplete","off"],[1,"col-6","col-sm-6","col-md-6","col-lg-6","my-2"],["matInput","","type","password","placeholder","Password","formControlName","password","autocomplete","off",3,"type"],["matSuffix","",3,"click"],[1,"error-msg"],["matInput","","type","password","placeholder","Confirm password","formControlName","cPassword","autocomplete","off",3,"type"],[1,"row","my-2"],[1,"col-12","col-sm-12","col-md-6","col-lg-6"],["formControlName","country","placeholder","Select country"],[3,"value"],["matInput","","placeholder","Phone number","formControlName","contact_no","autocomplete","off"],[1,"col-12","col-sm-12","col-md-12","col-lg-12"],["matInput","","placeholder"," Address","formControlName","address","rows","4"],[1,"submit-btn","btn"],[1,"submit-btn","btn",3,"click"]],template:function(d,e){if(d&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),n(4),r(5,"button",4),w("click",function(){return e.closeModel(!1)}),r(6,"mat-icon"),n(7,"close"),i()()(),r(8,"form",5)(9,"div",6)(10,"div",7)(11,"div",8)(12,"div",9)(13,"mat-label",10),n(14,"Organisation Name"),i(),r(15,"mat-form-field",11),C(16,"input",12),i(),f(17,be,2,0,"mat-error",13),i()(),r(18,"div",8)(19,"div",9)(20,"mat-label",10),n(21,"Email"),i(),r(22,"mat-form-field",11),C(23,"input",14),i(),f(24,ye,2,0,"mat-error",13)(25,Pe,2,0,"mat-error",13),i()(),r(26,"div",15)(27,"div",9)(28,"mat-label",10),n(29,"Create Password"),i(),r(30,"mat-form-field",11),C(31,"input",16),r(32,"mat-icon",17),w("click",function(){return e.isPasswordVisible=!e.isPasswordVisible}),n(33),i()(),f(34,xe,2,0,"mat-error",18)(35,Me,2,0,"mat-error",13)(36,Te,2,0,"mat-error",18)(37,Ve,2,0,"mat-error",18)(38,ke,2,0,"mat-error",18),i()(),r(39,"div",15)(40,"div",9)(41,"mat-label",10),n(42,"Confirm Password"),i(),r(43,"mat-form-field",11),C(44,"input",19),r(45,"mat-icon",17),w("click",function(){return e.isConfirmPasswordVisible=!e.isConfirmPasswordVisible}),n(46),i()(),f(47,qe,2,0,"mat-error",18)(48,Ie,2,0,"mat-error",13)(49,Ne,2,0,"mat-error",18),i()()(),r(50,"div",20)(51,"div",21)(52,"div",9)(53,"mat-label",10),n(54,"Country"),i(),r(55,"mat-form-field",11)(56,"mat-select",22),B(57,Ae,2,2,"mat-option",23,Y),i()(),f(59,De,2,0,"mat-error",13),i()(),r(60,"div",21)(61,"div",9)(62,"mat-label",10),n(63,"Phone Number"),i(),r(64,"mat-form-field",11),C(65,"input",24),i(),f(66,Le,2,0,"mat-error",13)(67,Ue,2,0,"mat-error",13)(68,We,2,0,"mat-error",13)(69,Re,2,0,"mat-error",13),i()()(),r(70,"div",20)(71,"div",25)(72,"mat-label",10),n(73,"Address"),i(),r(74,"mat-form-field",11),C(75,"textarea",26),i(),f(76,je,2,0,"mat-error",13),i()()()(),f(77,Ge,2,0,"button",27)(78,ze,2,0),i()()()),d&2){let s,u,E,F,p,R,j,S,b,g,y,P,x,M,T,V,k;a(4),$("",e.idEditForm?"Update":"Create"," Organisation ",e.idEditForm?"Details":""," "),a(),v("mat-dialog-close",!0),a(3),v("formGroup",e.createOrgainsationForm),a(9),m(17,(s=e.createOrgainsationForm.get("full_name"))!=null&&s.hasError("required")&&((s=e.createOrgainsationForm.get("full_name"))!=null&&s.touched)?17:-1),a(7),m(24,(u=e.createOrgainsationForm.get("email"))!=null&&u.hasError("required")&&((u=e.createOrgainsationForm.get("email"))!=null&&u.touched)?24:-1),a(),m(25,(E=e.createOrgainsationForm.get("email"))!=null&&E.hasError("email")&&((E=e.createOrgainsationForm.get("email"))!=null&&E.touched)?25:-1),a(6),v("type",e.isPasswordVisible?"text":"password"),a(2),U("",e.isPasswordVisible?"visibility":"visibility_off"," "),a(),m(34,(F=e.createOrgainsationForm.get("password"))!=null&&F.hasError("required")&&((F=e.createOrgainsationForm.get("password"))!=null&&F.touched)?34:-1),a(),m(35,(p=e.createOrgainsationForm.get("password"))!=null&&p.hasError("upp")||(p=e.createOrgainsationForm.get("password"))!=null&&p.hasError("lowe")||(p=e.createOrgainsationForm.get("password"))!=null&&p.hasError("numb")||(p=e.createOrgainsationForm.get("password"))!=null&&p.hasError("speci")&&((p=e.createOrgainsationForm.get("password"))!=null&&p.touched)?35:-1),a(),m(36,(R=e.createOrgainsationForm.get("password"))!=null&&R.hasError("minlength")?36:-1),a(),m(37,(j=e.createOrgainsationForm.get("password"))!=null&&j.hasError("maxlength")?37:-1),a(),m(38,(S=e.createOrgainsationForm.get("password"))!=null&&S.hasError("space")&&((S=e.createOrgainsationForm.get("password"))!=null&&S.touched)?38:-1),a(6),v("type",e.isConfirmPasswordVisible?"text":"password"),a(2),U("",e.isConfirmPasswordVisible?"visibility":"visibility_off"," "),a(),m(47,(b=e.createOrgainsationForm.get("cPassword"))!=null&&b.hasError("required")&&((b=e.createOrgainsationForm.get("cPassword"))!=null&&b.touched)?47:-1),a(),m(48,(g=e.createOrgainsationForm.get("cPassword"))!=null&&g.hasError("upp")||(g=e.createOrgainsationForm.get("cPassword"))!=null&&g.hasError("lowe")||(g=e.createOrgainsationForm.get("cPassword"))!=null&&g.hasError("numb")||(g=e.createOrgainsationForm.get("cPassword"))!=null&&g.hasError("speci")&&((g=e.createOrgainsationForm.get("cPassword"))!=null&&g.touched)?48:-1),a(),m(49,(y=e.createOrgainsationForm.get("cPassword"))!=null&&y.hasError("mustMatch")&&((y=e.createOrgainsationForm.get("cPassword"))!=null&&y.touched)?49:-1),a(8),H(e.countryList),a(2),m(59,(P=e.createOrgainsationForm.get("country"))!=null&&P.hasError("required")&&((P=e.createOrgainsationForm.get("country"))!=null&&P.touched)?59:-1),a(7),m(66,(x=e.createOrgainsationForm.get("contact_no"))!=null&&x.hasError("required")&&((x=e.createOrgainsationForm.get("contact_no"))!=null&&x.touched)?66:-1),a(),m(67,(M=e.createOrgainsationForm.get("contact_no"))!=null&&M.hasError("notNum")&&((M=e.createOrgainsationForm.get("contact_no"))!=null&&M.touched)?67:-1),a(),m(68,(T=e.createOrgainsationForm.get("contact_no"))!=null&&T.hasError("minlength")&&((T=e.createOrgainsationForm.get("contact_no"))!=null&&T.touched)?68:-1),a(),m(69,(V=e.createOrgainsationForm.get("contact_no"))!=null&&V.hasError("maxlength")&&((V=e.createOrgainsationForm.get("contact_no"))!=null&&V.touched)?69:-1),a(7),m(76,(k=e.createOrgainsationForm.get("address"))!=null&&k.hasError("required")&&((k=e.createOrgainsationForm.get("address"))!=null&&k.touched)?76:-1),a(),m(77,e.idEditForm?77:78)}},dependencies:[he,ie,X,Z,ee,re,ne,ce,me,oe,le,se,de,fe,_e,ae],styles:[".organisationWrapper[_ngcontent-%COMP%]{padding:24px;position:relative}.organisationWrapper[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{position:absolute;background-color:#442bc6;z-index:99;right:0;border-radius:50%;display:flex;align-items:center;justify-content:center}.organisationWrapper[_ngcontent-%COMP%]   .organisationForm[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px;flex-direction:column}.organisationWrapper[_ngcontent-%COMP%]   .organisationForm[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{flex:0 0 50%}.organisationWrapper[_ngcontent-%COMP%]   .patientCard[_ngcontent-%COMP%]{margin-bottom:12px}.organisationWrapper[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]{width:100%}.organisationWrapper[_ngcontent-%COMP%]   .control-label[_ngcontent-%COMP%]{font-size:16px;font-weight:500;margin-bottom:8px;display:inline-block}"]});let t=o;return t})();export{dt as a};
