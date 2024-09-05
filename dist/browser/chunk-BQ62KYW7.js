import{a as h,o as e}from"./chunk-QNDYK3DZ.js";import{Y as p,ca as a}from"./chunk-JETHE2PU.js";var u=(()=>{let r=class r{constructor(){this.CREATE_DOCTOR_URL="/api/user/add",this.UPDATE_DOCTOR_URL="/api/user/update",this.USER_LIST_URL="/api/users",this.SPECIALIZATION_URL="/api/specializations",this.PROMPT_LIST="/api/prompts",this.PROMPT_LIST_ORG="/api/get-prompt-data",this.ADD_PROMPT="/api/prompts/add",this.GETSTATS="/api/get-stats",this.CREATESPECIALIZATION="/api/specialization/add",this.UPDATESPECIALIZATION="/api/specialization/update",this.DELETESPECIALIZATION="/api/specialization/delete",this.UPDATE_PROMPT="/api/prompts/update",this.PROMPT_TYPE="/api/prompt-type",this.ENABLEDISABLE="/api/prompts/toggle",this.SPECIALIZATION_ENABLE_DISABLE="/api/specialization/toggle",this.ORGANIZATION_ENABLE_DISABLE="/api/organization/toggle",this.FEATURE_LIST="/api/features",this.httpClient=a(h)}createUser(t){return this.httpClient.post(`${e.url}${this.CREATE_DOCTOR_URL}`,t)}updateUser(t,i){return this.httpClient.post(`${e.url}${this.UPDATE_DOCTOR_URL}${i?`/${i}`:""}`,t)}retrieveDoctorHistory(t,i){return new FormData().append("key",t),this.httpClient.post(`${e.url}${this.USER_LIST_URL}${i?`/${i}`:""}`,t)}retrievePromptList(t){return this.httpClient.post(`${e.url}${this.PROMPT_LIST}`,t)}retrievePromptforOrg(t){return this.httpClient.post(`${e.url}${this.PROMPT_LIST_ORG}`,t)}createPrompt(t){return this.httpClient.post(`${e.url}${this.ADD_PROMPT}`,t)}updatePrompt(t,i){return this.httpClient.post(`${e.url}${this.UPDATE_PROMPT}${t?`/${t}`:""}`,i)}retrievePromptType(){return this.httpClient.get(`${e.url}${this.PROMPT_TYPE}`)}retrieveSpecialization(t,i){return this.httpClient.post(`${e.url}${this.SPECIALIZATION_URL}${i||""}`,t)}createSpecialization(t){return this.httpClient.post(`${e.url}${this.CREATESPECIALIZATION}`,t)}updateSpecialization(t,i){return this.httpClient.patch(`${e.url}${this.UPDATESPECIALIZATION}/${i}`,t)}deleteSpecialization(t){return this.httpClient.delete(`${e.url}${this.DELETESPECIALIZATION}/${t}`)}getChartData(){return this.httpClient.get(`${e.url}${this.GETSTATS}`)}enableDisable(t,i){return this.httpClient.patch(`${e.url}${this.ENABLEDISABLE}/${t}`,i)}getFeatures(t,i){return this.httpClient.post(`${e.url}${this.FEATURE_LIST}${i?`/${i}`:""}`,t)}specializationEnableDisable(t,i){return this.httpClient.patch(`${e.url}${this.SPECIALIZATION_ENABLE_DISABLE}/${t}`,i)}organizationEnableDisable(t,i){return this.httpClient.patch(`${e.url}${this.ORGANIZATION_ENABLE_DISABLE}/${t}`,i)}};r.\u0275fac=function(i){return new(i||r)},r.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"});let s=r;return s})();export{u as a};