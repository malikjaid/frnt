import{b as he}from"./chunk-5F3NBXHG.js";import{a as we}from"./chunk-BQ62KYW7.js";import{a as _e,b as ge,e as Ce,g as ve}from"./chunk-CDS4ARN5.js";import{a as De}from"./chunk-EQQULXW2.js";import{Q as pe,a as K,b as p,c as Y,d as Q,e as X,g,h as Z,i as ee,j as te,ka as fe,n as re,o as ie,p as oe,r as ae,s as ne,t as le,v as se,w as ce,x as me,y as de,z as ue}from"./chunk-7RWZJSZU.js";import{j as J}from"./chunk-QNDYK3DZ.js";import{o as H}from"./chunk-WLRUUNHX.js";import{Ab as r,Bb as v,Fb as I,Kb as D,Mb as M,Ub as a,Va as n,Vb as O,Wa as G,Wb as N,Xb as B,ac as $,ca as C,dc as q,ec as A,ha as W,mb as h,ob as _,qa as k,ra as V,ub as d,vb as x,xb as z,yb as T,zb as i}from"./chunk-JETHE2PU.js";import{a as R,b as j}from"./chunk-DM275RSA.js";function Se(t,l){t&1&&(i(0,"mat-error",11),a(1,"Doctor Name is required"),r())}function Fe(t,l){t&1&&(i(0,"mat-error",11),a(1,"Email is required"),r())}function Ee(t,l){t&1&&(i(0,"mat-error",11),a(1,"Invalid Email"),r())}function be(t,l){t&1&&(i(0,"mat-error",11),a(1,"Password is required"),r())}function ye(t,l){t&1&&(i(0,"mat-error",15),a(1,"Your password is weak"),r())}function Pe(t,l){t&1&&(i(0,"mat-error",11),a(1,"Password should be greater than 12 characters!"),r())}function xe(t,l){t&1&&(i(0,"mat-error",11),a(1,"Password can not exceed 20 characters"),r())}function ze(t,l){t&1&&(i(0,"mat-error",11),a(1,"Space not allowed"),r())}function Te(t,l){t&1&&(i(0,"mat-error",11),a(1,"Confirm Password is required"),r())}function Me(t,l){t&1&&(i(0,"mat-error",11),a(1,"Password & Confirm Password must be same!"),r())}function Oe(t,l){if(t&1&&(i(0,"mat-option",20),a(1),r()),t&2){let m=l.$implicit;_("value",m==null?null:m.name),n(),O(m==null?null:m.name)}}function ke(t,l){t&1&&(i(0,"mat-error",15),a(1,"Country is required"),r())}function Ve(t,l){if(t&1&&(i(0,"mat-option",20),a(1),q(2,"titlecase"),r()),t&2){let m=l.$implicit;_("value",m.id),n(),O(A(2,2,m.name))}}function Ie(t,l){t&1&&(i(0,"mat-error",11),a(1,"Specialization is required"),r())}function Ne(t,l){if(t&1&&(i(0,"mat-option",20),a(1),q(2,"titlecase"),r()),t&2){let m=l.$implicit;_("value",m.id),n(),O(A(2,2,m.name))}}function qe(t,l){if(t&1&&(i(0,"div",17)(1,"mat-label",8),a(2,"Organization"),r(),i(3,"mat-form-field",9)(4,"mat-select",24)(5,"mat-option",25),a(6,"None"),r(),z(7,Ne,3,4,"mat-option",20,x),r()()()),t&2){let m=M();n(7),T(m.organizationData)}}function Ae(t,l){if(t&1){let m=I();i(0,"button",26),D("click",function(){k(m);let s=M();return V(s.updateUser())}),a(1,"Update Details"),r()}}function Ue(t,l){if(t&1){let m=I();i(0,"button",26),D("click",function(){k(m);let s=M();return V(s.createUser())}),a(1,"Save"),r()}}var lt=(()=>{let l=class l{ngOnInit(){this.initForm(),this.retrieveSpecialization(),this.loadFeaturesList(),this.loadOrganization(this.pagination),this.idEditForm&&(this.patchValue(),this.createDoctorForm.get("password")?.removeValidators([p.required]),this.createDoctorForm.get("cPassword")?.removeValidators([p.required]))}constructor(o){this.data=o,this.doctorService=C(we),this.toasterService=C(De),this.modalService=C(de),this.authService=C(he),this.dialogRef=C(ce,{optional:!0}),this.listingPayload={search_key:"",search_column:"",page:1,per_page:10},this.pagination={search_key:"",search_column:"",page:1,role_id:1},this.specializationData=[],this.router=C(J),this.idEditForm=!1,this.isPasswordVisible=!1,this.isConfirmPasswordVisible=!1,this.organizationData=[],this.countryList=[{name:"USA",code:"+1"},{name:"UAE",code:"+971"},{name:"UK",code:"+44"}],this.featuresListing=[],this.featuresAcces=[],this.checked=!0,this.isOrganisation=!1,console.log(this.authService.loginRole==="Organization"),console.log(this.data),this.data&&(this.idEditForm=this.data.isEdit,this.doctorId=this.data.doctorId,this.data.organisationId&&(this.isOrganisation=!0)),this.authService.loginRole==="Organization"&&(this.isOrganisation=!0)}patchValue(){this.fetchDetailsForEdit()}loadFeaturesList(){let o={search_key:"",page:1,per_page:10,role_id:2};this.doctorService.getFeatures(o).subscribe({next:s=>{if(s){let e=s?.data;e.length?(this.featuresListing=e.map(c=>j(R({},c),{checked:1})),this.featuresAcces=e.map(c=>({feature_id:c.id,enable:1}))):this.featuresListing=[]}}})}fetchDetailsForEdit(){this.doctorService.retrieveDoctorHistory(this.listingPayload,this.doctorId).subscribe({next:o=>{o&&(this.patchValueOnEdit={fullName:o?.data?.full_name,email:o?.data?.email,password:"",country:o?.data?.country_name,specialization:o?.data?.specialities?.map(s=>s.specialization_id),organization:o?.data?.organization_id},this.patchValueOnEdit.organization||(this.isOrganisation=!0),this.createDoctorForm.patchValue(this.patchValueOnEdit))},error:o=>{this.toasterService.success(o?.error?.message)}})}initForm(){this.createDoctorForm=new X({fullName:new g("",[p.required]),email:new g("",[p.required,_e]),password:new g("",[p.required,ge,p.minLength(12),p.maxLength(20),Ce]),specialization:new g("",[p.required]),organization:new g("",[]),country:new g("",[p.required]),cPassword:new g("",[p.required])},{validators:ve("password","cPassword")})}retrieveSpecialization(){this.doctorService.retrieveSpecialization(this.listingPayload).subscribe({next:o=>{o?this.specializationData=o.data?.filter(s=>s.state_id===1):this.toasterService.error("Failed to retrieve specialization data.")},error:o=>{this.toasterService.success(o?.error?.message)}})}createUser(){if(this.createDoctorForm.valid){let o=this.createDoctorForm.get("password")?.value,s=this.createDoctorForm.get("cPassword")?.value;if(o===s){let e={full_name:this.createDoctorForm.get("fullName")?.value,email:this.createDoctorForm.get("email")?.value,password:this.createDoctorForm.get("password")?.value,role_id:2,specialization:(this.createDoctorForm.get("specialization")?.value).join(),organization_id:this.createDoctorForm.get("organization")?.value,country:this.createDoctorForm.get("country")?.value,feature_access:JSON.stringify(this.featuresAcces)};this.doctorService.createUser(e).subscribe({next:c=>{let u=c;u&&u.status===200&&(this.toasterService.success("Doctor created Successfully"),this.createDoctorForm.reset(),this.dialogRef?.close(!0))},error:c=>{this.toasterService.success(c?.error?.message)}})}}else this.createDoctorForm.markAllAsTouched(),this.createDoctorForm.markAsDirty()}updateUser(){if(this.createDoctorForm.valid){let o=this.createDoctorForm.get("password")?.value,s=this.createDoctorForm.get("cPassword")?.value;if(o===s){let e={full_name:this.createDoctorForm.get("fullName")?.value,email:this.createDoctorForm.get("email")?.value,password:this.createDoctorForm.get("password")?.value,role_id:2,specialization:(this.createDoctorForm.get("specialization")?.value).join(),organization_id:this.createDoctorForm.get("organization")?.value,country:this.createDoctorForm.get("country")?.value,feature_access:JSON.stringify(this.featuresAcces)};this.doctorService.updateUser(e,this.doctorId).subscribe({next:c=>{let u=c;u&&u.status===200?(this.toasterService.success(u.message),this.createDoctorForm.reset(),this.dialogRef?.close(!0)):this.toasterService.error("Error: "+(u?.message||"Unknown error occurred"))},error:c=>{this.toasterService.success(c?.error?.message)}})}else this.toasterService.error("Password and confirm password doesn't match")}else this.createDoctorForm.markAllAsTouched(),this.createDoctorForm.markAsDirty(),this.toasterService.error("Please fill out the form correctly before submitting.")}selectFeatures(o,s){console.log(o.checked,o.source.value),this.featuresAcces[s].enable=o.checked?1:0}closeModel(o){this.dialogRef?.close(o)}loadOrganization(o){this.doctorService.retrieveDoctorHistory(o).subscribe({next:s=>{s&&(this.organizationData=s?.data.map(e=>({id:e?.id,name:e?.full_name})))}})}};l.\u0275fac=function(s){return new(s||l)(G(me,8))},l.\u0275cmp=W({type:l,selectors:[["app-create-doctor"]],standalone:!0,features:[$],decls:65,vars:22,consts:[[1,"doctorCreateWrapper"],[1,"container"],[1,"doctorForm"],[1,"d-flex","align-items-center","justify-content-between"],[1,"btn",3,"click","mat-dialog-close"],[3,"formGroup"],[1,"patientCard","row"],[1,"form-group","my-3","col-6"],[1,"control-label"],["appearance","outline",1,"form-field"],["matInput","","placeholder","Doctor name","formControlName","fullName"],[1,"error-msg"],["matInput","","type","email","placeholder","Email","formControlName","email"],["matInput","","placeholder","Password","formControlName","password",3,"type"],["matSuffix","",3,"click"],[1,"error-msg","mt-2"],["matInput","","placeholder","Confirm password","formControlName","cPassword",3,"type"],[1,"form-group","my-3","col-12"],[1,"form-group"],["formControlName","country","placeholder","Select country"],[3,"value"],["formControlName","specialization","placeholder","Select specialization","multiple","true"],["matInput","","placeholder","Search"],[1,"submit-btn","btn"],["formControlName","organization","placeholder","Select organization"],[1,"bg-light","border","rounded","border-info",3,"value"],[1,"submit-btn","btn",3,"click"]],template:function(s,e){if(s&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),a(4),i(5,"button",4),D("click",function(){return e.closeModel(!1)}),i(6,"mat-icon"),a(7,"close"),r()()(),i(8,"form",5)(9,"div",6)(10,"div",7)(11,"mat-label",8),a(12,"Doctor Name"),r(),i(13,"mat-form-field",9),v(14,"input",10),r(),h(15,Se,2,0,"mat-error",11),r(),i(16,"div",7)(17,"mat-label",8),a(18,"Email"),r(),i(19,"mat-form-field",9),v(20,"input",12),r(),h(21,Fe,2,0,"mat-error",11)(22,Ee,2,0,"mat-error",11),r(),i(23,"div",7)(24,"mat-label",8),a(25,"Create Password"),r(),i(26,"mat-form-field",9),v(27,"input",13),i(28,"mat-icon",14),D("click",function(){return e.isPasswordVisible=!e.isPasswordVisible}),a(29),r()(),h(30,be,2,0,"mat-error",11)(31,ye,2,0,"mat-error",15)(32,Pe,2,0,"mat-error",11)(33,xe,2,0,"mat-error",11)(34,ze,2,0,"mat-error",11),r(),i(35,"div",7)(36,"mat-label",8),a(37,"Confirm Password"),r(),i(38,"mat-form-field",9),v(39,"input",16),i(40,"mat-icon",14),D("click",function(){return e.isConfirmPasswordVisible=!e.isConfirmPasswordVisible}),a(41),r()(),h(42,Te,2,0,"mat-error",11)(43,Me,2,0,"mat-error",11),r(),i(44,"div",17)(45,"div",18)(46,"mat-label",8),a(47,"Country"),r(),i(48,"mat-form-field",9)(49,"mat-select",19),z(50,Oe,2,2,"mat-option",20,x),r()(),h(52,ke,2,0,"mat-error",15),r()(),i(53,"div",17)(54,"mat-label",8),a(55,"Specialization"),r(),i(56,"mat-form-field",9)(57,"mat-select",21),v(58,"input",22),z(59,Ve,3,4,"mat-option",20,x),r()(),h(61,Ie,2,0,"mat-error",11),r(),h(62,qe,9,0,"div",17),r()(),h(63,Ae,2,0,"button",23)(64,Ue,2,0),r()()()),s&2){let c,u,w,S,f,U,L,F,E,b,y,P;n(4),B("",e.idEditForm?"Update":"Create"," Doctor ",e.idEditForm?"Details":""," "),n(),_("mat-dialog-close",!0),n(3),_("formGroup",e.createDoctorForm),n(7),d(15,(c=e.createDoctorForm.get("fullName"))!=null&&c.hasError("required")&&((c=e.createDoctorForm.get("fullName"))!=null&&c.touched)?15:-1),n(6),d(21,(u=e.createDoctorForm.get("email"))!=null&&u.hasError("required")&&((u=e.createDoctorForm.get("email"))!=null&&u.touched)?21:-1),n(),d(22,(w=e.createDoctorForm.get("email"))!=null&&w.hasError("email")&&((w=e.createDoctorForm.get("email"))!=null&&w.touched)?22:-1),n(5),_("type",e.isPasswordVisible?"text":"password"),n(2),N("",e.isPasswordVisible?"visibility":"visibility_off"," "),n(),d(30,(S=e.createDoctorForm.get("password"))!=null&&S.hasError("required")&&((S=e.createDoctorForm.get("password"))!=null&&S.touched)?30:-1),n(),d(31,(f=e.createDoctorForm.get("password"))!=null&&f.hasError("upp")||(f=e.createDoctorForm.get("password"))!=null&&f.hasError("lowe")||(f=e.createDoctorForm.get("password"))!=null&&f.hasError("numb")||(f=e.createDoctorForm.get("password"))!=null&&f.hasError("speci")&&((f=e.createDoctorForm.get("password"))!=null&&f.touched)?31:-1),n(),d(32,(U=e.createDoctorForm.get("password"))!=null&&U.hasError("minlength")?32:-1),n(),d(33,(L=e.createDoctorForm.get("password"))!=null&&L.hasError("maxlength")?33:-1),n(),d(34,(F=e.createDoctorForm.get("password"))!=null&&F.hasError("space")&&((F=e.createDoctorForm.get("password"))!=null&&F.touched)?34:-1),n(5),_("type",e.isConfirmPasswordVisible?"text":"password"),n(2),N("",e.isConfirmPasswordVisible?"visibility":"visibility_off"," "),n(),d(42,(E=e.createDoctorForm.get("cPassword"))!=null&&E.hasError("required")&&((E=e.createDoctorForm.get("cPassword"))!=null&&E.touched)?42:-1),n(),d(43,(b=e.createDoctorForm.get("cPassword"))!=null&&b.hasError("mustMatch")&&((b=e.createDoctorForm.get("cPassword"))!=null&&b.touched)?43:-1),n(7),T(e.countryList),n(2),d(52,(y=e.createDoctorForm.get("country"))!=null&&y.hasError("required")&&((y=e.createDoctorForm.get("country"))!=null&&y.touched)?52:-1),n(7),T(e.specializationData),n(2),d(61,(P=e.createDoctorForm.get("specialization"))!=null&&P.hasError("required")&&((P=e.createDoctorForm.get("specialization"))!=null&&P.touched)?61:-1),n(),d(62,e.isOrganisation?-1:62),n(),d(63,e.idEditForm?63:64)}},dependencies:[fe,Z,K,Y,Q,ee,te,le,ne,ie,oe,ae,se,ue,pe,re,H],styles:[".doctorCreateWrapper[_ngcontent-%COMP%]{padding:24px}.doctorCreateWrapper[_ngcontent-%COMP%]   .doctorForm[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-direction:column;max-width:500px;margin:0 auto}.doctorCreateWrapper[_ngcontent-%COMP%]   .doctorForm[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{flex:0 0 50%}.doctorCreateWrapper[_ngcontent-%COMP%]   .patientCard[_ngcontent-%COMP%]{margin-bottom:12px}.doctorCreateWrapper[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]{width:100%}.doctorCreateWrapper[_ngcontent-%COMP%]   .control-label[_ngcontent-%COMP%]{font-size:16px;font-weight:500;margin-bottom:8px;display:inline-block}"]});let t=l;return t})();export{lt as a};