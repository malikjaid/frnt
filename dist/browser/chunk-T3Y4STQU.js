import{a as xe}from"./chunk-BQ62KYW7.js";import{a as we}from"./chunk-EQQULXW2.js";import{a as ve}from"./chunk-WG7QQHNH.js";import{D as le,F as se,G as me,H as ce,I as pe,J as de,K as he,L as ue,M as fe,N as Se,O as _e,P as ge,R as Ce,S as E,X as M,Y as ze,a as W,b as U,c as J,d as K,e as V,g as T,h as X,i as Y,j as Z,ka as be,o as ee,p as te,s as ie,t as ae,v as ne,y as oe,z as re}from"./chunk-7RWZJSZU.js";import"./chunk-RGNDWIHZ.js";import"./chunk-QNDYK3DZ.js";import{q}from"./chunk-WLRUUNHX.js";import{Ab as r,Bb as w,C as R,Cb as g,Db as C,Fb as x,Kb as z,Mb as b,Qb as v,Rb as y,Sb as F,Ub as s,Va as c,Vb as H,Wa as k,Wb as D,ac as O,bc as P,ca as f,dc as Q,fc as j,gc as G,ha as A,mb as p,nb as I,ob as d,oc as $,qa as S,ra as _,ub as B,zb as o}from"./chunk-JETHE2PU.js";import{a as L,b as N}from"./chunk-DM275RSA.js";var ye=["addEditForm"],Fe=()=>[10,20,30];function De(t,n){t&1&&(o(0,"th",25),s(1," Sr no "),r())}function Ee(t,n){if(t&1&&(o(0,"td",26),s(1),r()),t&2){let l=n.index,e=b();c(),D(" ",e.getIndex(l)," ")}}function Me(t,n){t&1&&(o(0,"th",27),s(1,"Specialization Name"),r())}function Ve(t,n){if(t&1&&(o(0,"td",26),s(1),r()),t&2){let l=n.$implicit;c(),D(" ",l.name," ")}}function Te(t,n){t&1&&(o(0,"th",28),s(1," Created Date"),r())}function Le(t,n){if(t&1&&(o(0,"td",26),s(1),Q(2,"date"),r()),t&2){let l=n.$implicit;c(),D(" ",j(2,1,l.created_at,"d-MMMM-y")," ")}}function Ne(t,n){t&1&&(o(0,"th",25),s(1,"Actions"),r())}function Re(t,n){if(t&1){let l=x();o(0,"td",26)(1,"button",29),z("click",function(){let a=S(l).$implicit,i=b();return _(i.showEditDeleteOrg("edit",a))}),o(2,"mat-icon"),s(3,"edit"),r()()()}}function Ae(t,n){if(t&1&&(o(0,"tr",30)(1,"td",31),s(2," No Data Available."),r()()),t&2){let l=b();c(),I("colspan",l.displayedColumns.length)}}function ke(t,n){t&1&&w(0,"tr",32)}function Ie(t,n){if(t&1&&w(0,"tr",33),t&2){let l=n.$implicit;d("id",l.id)}}function Be(t,n){t&1&&(o(0,"mat-error",41),s(1,"Specialization is required"),r())}function He(t,n){if(t&1){let l=x();o(0,"div",34)(1,"form",35)(2,"div",36)(3,"mat-label",37),s(4,"Specialization Name "),o(5,"button",38)(6,"mat-icon"),s(7,"close"),r()()(),o(8,"mat-form-field",39),w(9,"input",40),r(),p(10,Be,2,0,"mat-error",41),r(),o(11,"button",42),z("click",function(){S(l);let a=b();return _(a.createSpecialization())}),s(12),r()()()}if(t&2){let l,e=b();c(),d("formGroup",e.specializationForm),c(4),d("mat-dialog-close",!1),c(5),B(10,(l=e.specializationForm.get("name"))!=null&&l.invalid&&((l=e.specializationForm.get("name"))!=null&&l.touched)?10:-1),c(2),H(e.subBtnName)}}var ct=(()=>{let n=class n{constructor(e){this.cdr=e,this.displayedColumns=["Sr no","Name","Created Date","Actions"],this.dataSource=[],this.pagination={search_key:"",search_column:"",order_by:"",order:"asc",per_page:10,page:1},this.totalCount=0,this.modalService=f(oe),this.doctorService=f(xe),this.commonService=f(ve),this.cardBackgroundColor=["rgb(244 232 255)","rgb(255 244 222)","rgb(220 252 231)","rgb(255 226 230)"],this.subBtnName="Create",this.toasterService=f(we),this.commanService=f(le)}ngOnInit(){this.callOninit()}loadSpecialization(e,a){this.doctorService.retrieveSpecialization(e,a).subscribe({next:i=>{if(i){let m=i?.data?i?.data:[],u=i?.meta;this.dataSource=m?.map(h=>({id:h.id,state_id:h.state_id,name:h.name,created_at:h.created_at,actions:""})),this.pagination.page=u?.current_page,this.pagination.per_page=u?.per_page,this.totalCount=u?.total}}})}showEditDeleteOrg(e,a){if(this.stats_id=a?.id,e==="edit"&&(this.specializationForm.patchValue({name:a?.name}),this.subBtnName="Update",this.dialogRef=this.modalService.open(this.addEditForm,{width:"500px"})),e==="delete"){this.subBtnName="Create",this.forminitialize(),this.commanService.openAlert({type:"delete_specialization",name:a?.name});let i=this.commanService.$onCloseConfirm.subscribe(m=>{m?.confirmed&&m?.type==="delete_specialization"&&this.deleteSpecialization(),i.unsubscribe(),this.commanService.$onCloseConfirm.next({type:"",confirmed:!1})})}}deleteSpecialization(){this.doctorService.deleteSpecialization(this.stats_id?this.stats_id:"").subscribe({next:e=>{e&&(this.stats_id="",this.loadSpecialization({per_page:10}),this.toasterService.success(e.message))},error:e=>{this.toasterService.error("Something went wrong!")}})}handlePagination(e){let a={page:e.pageIndex+1,per_page:e.pageSize};this.loadSpecialization(a)}sortFunction(e){let a=N(L({},this.pagination),{order:e.direction,order_by:e.active});this.loadSpecialization(a)}searchFunction(e){let a={search_key:e,per_page:10};this.loadSpecialization(a)}createSpecialization(){let a={name:this.specializationForm.get("name").value};if(this.subBtnName==="Create"){if(this.specializationForm.invalid){this.specializationForm.markAllAsTouched(),this.specializationForm.markAsDirty();return}this.doctorService.createSpecialization(a).subscribe({next:i=>{i&&(this.specializationForm.reset(),this.toasterService.success("Specialization created Successfully"),this.specializationForm.get("name")?.setValue(""),this.specializationForm.updateValueAndValidity(),this.subBtnName="Create",this.stats_id="",this.loadSpecialization({per_page:10}),this.dialogRef.close())},error:i=>{this.specializationForm.reset(),this.specializationForm.get("name")?.setValue(""),this.specializationForm.updateValueAndValidity(),this.subBtnName="Create",this.toasterService.error("Something went wrong!")}})}this.subBtnName==="Update"&&this.doctorService.updateSpecialization(a,this.stats_id?this.stats_id:"").subscribe({next:i=>{i&&(this.specializationForm.reset(),this.specializationForm.get("name")?.setValue(""),this.specializationForm.updateValueAndValidity(),this.toasterService.success("Specialization updated Successfully"),this.subBtnName="Create",this.stats_id="",this.loadSpecialization({per_page:10}),this.dialogRef.close())},error:i=>{this.specializationForm.reset(),this.specializationForm.get("name")?.setValue(""),this.specializationForm.updateValueAndValidity(),this.toasterService.error("Something went wrong!")}})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.loadSpecialization({per_page:10})}callOninit(){this.forminitialize(),this.searchForm.get("search")?.valueChanges.pipe(R(500)).subscribe({next:e=>{e?this.searchFunction(e):this.searchFunction("")}})}forminitialize(){this.searchForm=new V({search:new T("")}),this.specializationForm=new V({name:new T("",[U.required])})}ShowAddModal(){this.dialogRef=this.modalService.open(this.addEditForm,{width:"500px"}),this.forminitialize()}getIndex(e){return e+1+this.paginator.pageIndex*this.paginator.pageSize}getSlideValue(e,a){this.doctorService.specializationEnableDisable(a?.id,{}).subscribe({next:i=>{i?.status===200&&this.toasterService.success(i?.message)}})}ngAfterViewChecked(){this.cdr.detectChanges()}};n.\u0275fac=function(a){return new(a||n)(k($))},n.\u0275cmp=A({type:n,selectors:[["app-specialization-list"]],viewQuery:function(a,i){if(a&1&&(v(E,5),v(M,5),v(ye,7)),a&2){let m;y(m=F())&&(i.paginator=m.first),y(m=F())&&(i.sort=m.first),y(m=F())&&(i.addEditForm=m.first)}},standalone:!0,features:[O],decls:35,vars:8,consts:[["addEditForm",""],[1,"specializationWrapper","mt-4"],[1,"tableWrapper1"],[1,"header","d-flex","align-items-center","justify-content-between","mx-3"],[1,"title"],[1,"action","d-flex","align-items-center","justify-content-between","my-3"],[1,"filterToolbar"],[3,"formGroup"],["type","search","placeholder","Search","formControlName","search",1,"input-grey-rounded"],[1,"submit-btn1","btn","d-flex","align-items-center","justify-content-center",2,"width","auto",3,"click"],[1,"me-2"],[1,"tableWrapper","m-3"],["mat-table","","matSort","",3,"matSortChange","dataSource"],["matColumnDef","Sr no"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Name"],["mat-header-cell","","mat-sort-header","name",4,"matHeaderCellDef"],["matColumnDef","Created Date"],["mat-header-cell","","mat-sort-header","created_at",4,"matHeaderCellDef"],["matColumnDef","Actions"],["class","mat-row text-center","style","height: 60px;",4,"matNoDataRow"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",3,"id",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","true","showFirstLastButtons","true","aria-label","Select page of periodic elements",3,"page","pageSizeOptions","pageSize","length"],["mat-header-cell",""],["mat-cell",""],["mat-header-cell","","mat-sort-header","name"],["mat-header-cell","","mat-sort-header","created_at"],["matTooltip","update",1,"btn",3,"click"],[1,"mat-row","text-center",2,"height","60px"],[1,"mat-cell"],["mat-header-row",""],["mat-row","",3,"id"],[1,"specializationForm","d-flex","align-items-center","justify-content-between","flex-wrap"],[2,"width","100%",3,"formGroup"],[1,"form-group"],[1,"control-label","d-flex","justify-content-between","align-items-center"],[1,"btn",3,"mat-dialog-close"],["appearance","outline",1,"form-field"],["matInput","","placeholder","Enter specialization name...","formControlName","name","autocomplete","off"],[1,"error-msg","mt-2"],[1,"btn","submit-btn","w-100",3,"click"]],template:function(a,i){if(a&1){let m=x();o(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"h4"),s(5,"Specialization's Listing"),r()(),o(6,"div",5)(7,"div",6)(8,"form",7),w(9,"input",8),r()(),o(10,"button",9),z("click",function(){return S(m),_(i.ShowAddModal())}),o(11,"mat-icon",10),s(12,"add"),r(),s(13," Create Specialization"),r()()(),o(14,"div",11)(15,"table",12),z("matSortChange",function(h){return S(m),_(i.sortFunction(h))}),g(16,13),p(17,De,2,0,"th",14)(18,Ee,2,1,"td",15),C(),g(19,16),p(20,Me,2,0,"th",17)(21,Ve,2,1,"td",15),C(),g(22,18),p(23,Te,2,0,"th",19)(24,Le,3,4,"td",15),C(),g(25,20),p(26,Ne,2,0,"th",14)(27,Re,4,0,"td",15),C(),g(28),p(29,Ae,3,1,"tr",21),C(),p(30,ke,1,0,"tr",22)(31,Ie,1,1,"tr",23),r()(),o(32,"mat-paginator",24),z("page",function(h){return S(m),_(i.handlePagination(h))}),r()()(),p(33,He,13,4,"ng-template",null,0,G)}a&2&&(c(8),d("formGroup",i.searchForm),c(7),d("dataSource",i.dataSource),c(15),d("matHeaderRowDef",i.displayedColumns),c(),d("matRowDefColumns",i.displayedColumns),c(),d("pageSizeOptions",P(7,Fe))("pageSize",i.pagination.per_page)("length",i.totalCount))},dependencies:[be,X,W,J,K,Y,Z,ae,ie,ee,te,ne,se,ce,ue,pe,me,fe,de,he,Se,_e,ge,E,re,Ce,M,ze,q],styles:[".specializationWrapper[_ngcontent-%COMP%]{max-width:1800px;margin:0 auto}.specializationForm[_ngcontent-%COMP%]{padding:24px}"]});let t=n;return t})();export{ct as SpecializationListComponent};
