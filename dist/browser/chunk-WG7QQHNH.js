import{D as o}from"./chunk-7RWZJSZU.js";import{a as n,o as i}from"./chunk-QNDYK3DZ.js";import{Y as a,ca as s}from"./chunk-JETHE2PU.js";var $=(()=>{let r=class r{constructor(){this.CREATE_PATIENT_URL="/api/patient/add",this.GENERATE_TRANSCRIPT_URL="/api/patient/generate-transcript",this.PATIENT_LIST="/api/patients",this.PROMPTS_LIST="/api/prompts",this.PROMPTS_DATA="/api/get-prompt-data",this.GENERATE_SUMMARY_URL="/api/user/generateSummary",this.GET_TOTAL="/api/get-total",this.OPTIMISE_TRANSCRIPT="/api/optimize-transcript",this.GENERATE_CODES="/api/generate-codes",this.REVIEW_CODE="/api/review-save",this.DOWNLOAD_REPORT="/api/get-report",this.ADD_CODES="/api/save-new-codes",this.GET_FEATURES_LIST="/api/user-feature",this.http=s(n),this.loaderService=s(o)}getFeaturesList(t){return this.http.get(`${i.url}${this.GET_FEATURES_LIST}${t?`/${t}`:""}`)}getTotalCount(){return this.http.get(`${i.url}${this.GET_TOTAL}`)}createPatient(t){let e=new FormData;return e.append("patient_name",t.patientName),e.append("patient_id",t.patientId),e.append("audio_file",t.audioFile),e.append("type_id",t.type_id),e.append("prompt_id",t.promptId),this.loaderService.loaderMessage.set("Generating Transcript"),this.http.post(`${i.url}${this.CREATE_PATIENT_URL}`,e)}generateTranscript(t){let e=new FormData;return e.append("patient_id",t.patientId),e.append("audio_file",t.audioFile),this.http.post(`${i.url}${this.GENERATE_TRANSCRIPT_URL}`,e)}generateSummary(t){return this.http.post(`${i.url}${this.GENERATE_SUMMARY_URL}`,t)}retrievePatientHistory(t,e){return new FormData().append("key",t),this.http.post(`${i.url}${this.PATIENT_LIST}${e?`/${e}`:""}`,t)}retrievePrompts(t){return this.http.post(`${i.url}${this.PROMPTS_LIST}`,t)}optimiseTranscript(t){return this.http.post(`${i.url}${this.OPTIMISE_TRANSCRIPT}`,t)}generateCode(t){return this.http.post(`${i.url}${this.GENERATE_CODES}`,t)}reviewPatient(t){return this.http.post(`${i.url}${this.REVIEW_CODE}`,t)}downloadReport(t){return this.http.get(`${i.url}${this.DOWNLOAD_REPORT}${t?`/${t}`:""}`,{headers:{"Content-Type":"application/pdf"}})}addNewCodes(t){return this.http.post(`${i.url}${this.ADD_CODES}`,t)}getPromptData(t){return this.http.post(`${i.url}${this.PROMPTS_DATA}`,t)}};r.\u0275fac=function(e){return new(e||r)},r.\u0275prov=a({token:r,factory:r.\u0275fac,providedIn:"root"});let p=r;return p})();export{$ as a};