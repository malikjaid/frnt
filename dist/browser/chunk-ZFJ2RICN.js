import{a as L}from"./chunk-7NOQS7A6.js";import{a as ut}from"./chunk-BQ62KYW7.js";import"./chunk-CDS4ARN5.js";import"./chunk-LURNVO4I.js";import{a as ht}from"./chunk-EQQULXW2.js";import{F as Z,G as tt,H as et,I as it,J as at,K as nt,L as ot,M as rt,N as lt,O as mt,P as st,R as dt,S as v,X as y,Y as ct,a as G,c as A,d as W,e as B,g as q,h as J,i as K,j as U,ka as pt,v as X,y as Y}from"./chunk-7RWZJSZU.js";import"./chunk-RGNDWIHZ.js";import{k as j}from"./chunk-QNDYK3DZ.js";import{q as Q}from"./chunk-WLRUUNHX.js";import{Ab as r,Bb as x,C as M,Cb as p,Db as h,Fb as H,Kb as g,Mb as D,Qb as E,Rb as b,Sb as O,Ub as l,Va as d,Wa as I,Wb as f,ac as k,bc as V,ca as S,dc as z,fc as P,ha as T,mb as c,nb as N,ob as u,oc as $,qa as R,ra as F,zb as o}from"./chunk-JETHE2PU.js";import{a as _,b as C}from"./chunk-DM275RSA.js";var ft=()=>[10,20,30];function gt(t,e){t&1&&(o(0,"th",29),l(1," Sr no "),r())}function _t(t,e){if(t&1&&(o(0,"td",30),l(1),r()),t&2){let m=e.index,i=D();d(),f(" ",i.getIndex(m)," ")}}function Ct(t,e){t&1&&(o(0,"th",31),l(1," Organization Name "),r())}function St(t,e){if(t&1&&(o(0,"td",30),l(1),r()),t&2){let m=e.$implicit;d(),f(" ",m.fullName," ")}}function xt(t,e){t&1&&(o(0,"th",32),l(1," Email"),r())}function Dt(t,e){if(t&1&&(o(0,"td",30),l(1),r()),t&2){let m=e.$implicit;d(),f(" ",m.email," ")}}function vt(t,e){t&1&&(o(0,"th",33),l(1,"Country"),r())}function yt(t,e){if(t&1&&(o(0,"td",30),l(1),r()),t&2){let m=e.$implicit;d(),f(" ",m.country," ")}}function wt(t,e){t&1&&(o(0,"th",34),l(1,"Created Date"),r())}function Et(t,e){if(t&1&&(o(0,"td",30),l(1),z(2,"date"),r()),t&2){let m=e.$implicit;d(),f(" ",P(2,1,m.createdDate,"d-MMMM-y")," ")}}function bt(t,e){t&1&&(o(0,"th",29),l(1,"Edit"),r())}function Ot(t,e){if(t&1){let m=H();o(0,"td",30)(1,"button",35),g("click",function(){let n=R(m).$implicit,a=D();return F(a.showEditOrganisationModal(n.id))}),o(2,"mat-icon"),l(3,"edit"),r()()()}}function Lt(t,e){t&1&&(o(0,"th",29),l(1,"View"),r())}function Mt(t,e){if(t&1&&(o(0,"td",30)(1,"a",36)(2,"mat-icon"),l(3,"visibility"),r()()()),t&2){let m=e.$implicit;d(),u("routerLink","/home/doctor/doctor-list/"+m.id)}}function Tt(t,e){if(t&1&&(o(0,"tr",37)(1,"td",38),l(2," No Data Available."),r()()),t&2){let m=D();d(),N("colspan",m.displayedColumns.length)}}function Rt(t,e){t&1&&x(0,"tr",39)}function Ft(t,e){if(t&1&&x(0,"tr",40),t&2){let m=e.$implicit;u("id",m.id)}}var te=(()=>{let e=class e{constructor(i){this.cdr=i,this.displayedColumns=["Sr no","Organization Name","Email","Country","Created Date","Edit","View"],this.dataSource=[],this.pagination={search_key:"",search_column:"",page:1,per_page:10,role_id:1},this.totalCount=0,this.modalService=S(Y),this.doctorService=S(ut),this.toasterService=S(ht)}ngOnInit(){this.searchForm=new B({search:new q("")}),this.searchForm.get("search")?.valueChanges.pipe(M(500)).subscribe({next:i=>{i?this.searchFunction(i):this.searchFunction("")}})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.loadDoctorList(this.pagination)}loadDoctorList(i){this.doctorService.retrieveDoctorHistory(i).subscribe({next:n=>{if(n){let a=n;this.dataSource=a.data.map(s=>({id:s.id,fullName:s.full_name,email:s.email,country:s.country_name,role:s.role,createdDate:s.created_at,edit:"",view:"",state_id:s.state_id})),this.pagination.page=a.meta.current_page,this.pagination.per_page=a.meta.per_page,this.totalCount=a.meta.total}}})}showEditOrganisationModal(i){this.modalService.open(L,{width:"700px",height:"90vh",data:{isEdit:!0,organisationId:i}}).afterClosed().subscribe(a=>{a&&this.loadDoctorList(this.pagination)})}createOrganisation(){this.modalService.open(L,{width:"700px",height:"90vh",data:{isEdit:!1}}).afterClosed().subscribe(n=>{n&&this.loadDoctorList(this.pagination)})}handlePagination(i){let n=C(_({},this.pagination),{page:i.pageIndex+1,per_page:i.pageSize});this.loadDoctorList(n)}sortFunction(i){let n=C(_({},this.pagination),{order:i.direction,order_by:i.active});this.loadDoctorList(n)}searchFunction(i){let n=C(_({},this.pagination),{search_key:i});this.loadDoctorList(n)}getIndex(i){return i+1+this.paginator.pageIndex*this.paginator.pageSize}getSlideValue(i,n){this.doctorService.organizationEnableDisable(n?.id,{}).subscribe({next:a=>{a?.status===200&&this.toasterService.success(a?.message)}})}ngAfterViewChecked(){this.cdr.detectChanges()}};e.\u0275fac=function(n){return new(n||e)(I($))},e.\u0275cmp=T({type:e,selectors:[["app-organisation-list"]],viewQuery:function(n,a){if(n&1&&(E(v,5),E(y,5)),n&2){let s;b(s=O())&&(a.paginator=s.first),b(s=O())&&(a.sort=s.first)}},standalone:!0,features:[k],decls:42,vars:8,consts:[[1,"organisationListWrapper","mt-4"],[1,"tableWrapper1"],[1,"header","d-flex","align-items-center","justify-content-between","mx-3"],[1,"title"],[1,"action","d-flex","align-items-center","justify-content-between","my-3"],[1,"filterToolbar"],[3,"formGroup"],["type","search","placeholder","Search","formControlName","search",1,"input-grey-rounded"],[1,"submit-btn1","btn","d-flex","align-items-center","justify-content-center",2,"width","auto",3,"click"],[1,"me-2"],[1,"tableWrapper","m-3"],["mat-table","","matSort","",3,"matSortChange","dataSource"],["matColumnDef","Sr no"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Organization Name"],["mat-header-cell","","mat-sort-header","full_name",4,"matHeaderCellDef"],["matColumnDef","Email"],["mat-header-cell","","mat-sort-header","email",4,"matHeaderCellDef"],["matColumnDef","Country"],["mat-header-cell","","mat-sort-header","country",4,"matHeaderCellDef"],["matColumnDef","Created Date"],["mat-header-cell","","mat-sort-header","created_at",4,"matHeaderCellDef"],["matColumnDef","Edit"],["matColumnDef","View"],["class","mat-row text-center","style","height: 60px;",4,"matNoDataRow"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",3,"id",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","true","showFirstLastButtons","true","aria-label","Select page of periodic elements",3,"page","pageSizeOptions","pageSize","length"],["mat-header-cell",""],["mat-cell",""],["mat-header-cell","","mat-sort-header","full_name"],["mat-header-cell","","mat-sort-header","email"],["mat-header-cell","","mat-sort-header","country"],["mat-header-cell","","mat-sort-header","created_at"],["matTooltip","update organisation details",1,"btn",3,"click"],["matTooltip","view doctor list",1,"btn",3,"routerLink"],[1,"mat-row","text-center",2,"height","60px"],[1,"mat-cell"],["mat-header-row",""],["mat-row","",3,"id"]],template:function(n,a){n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h4"),l(5,"Organisation's Listing"),r()(),o(6,"div",4)(7,"div",5)(8,"form",6),x(9,"input",7),r()(),o(10,"button",8),g("click",function(){return a.createOrganisation()}),o(11,"mat-icon",9),l(12,"add"),r(),l(13," Create Organisation"),r()()(),o(14,"div",10)(15,"table",11),g("matSortChange",function(w){return a.sortFunction(w)}),p(16,12),c(17,gt,2,0,"th",13)(18,_t,2,1,"td",14),h(),p(19,15),c(20,Ct,2,0,"th",16)(21,St,2,1,"td",14),h(),p(22,17),c(23,xt,2,0,"th",18)(24,Dt,2,1,"td",14),h(),p(25,19),c(26,vt,2,0,"th",20)(27,yt,2,1,"td",14),h(),p(28,21),c(29,wt,2,0,"th",22)(30,Et,3,4,"td",14),h(),p(31,23),c(32,bt,2,0,"th",13)(33,Ot,4,0,"td",14),h(),p(34,24),c(35,Lt,2,0,"th",13)(36,Mt,4,1,"td",14),h(),p(37),c(38,Tt,3,1,"tr",25),h(),c(39,Rt,1,0,"tr",26)(40,Ft,1,1,"tr",27),r()(),o(41,"mat-paginator",28),g("page",function(w){return a.handlePagination(w)}),r()()()),n&2&&(d(8),u("formGroup",a.searchForm),d(7),u("dataSource",a.dataSource),d(24),u("matHeaderRowDef",a.displayedColumns),d(),u("matRowDefColumns",a.displayedColumns),d(),u("pageSizeOptions",V(7,ft))("pageSize",a.pagination.per_page)("length",a.totalCount))},dependencies:[pt,J,G,A,W,K,U,X,j,Z,et,ot,it,tt,rt,at,nt,lt,mt,st,v,dt,y,ct,Q],styles:[".organisationListWrapper[_ngcontent-%COMP%]{max-width:1800px;margin:0 auto}"]});let t=e;return t})();export{te as OrganisationListComponent};
