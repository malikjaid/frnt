import { Injectable, inject } from '@angular/core';
import { AddCodesPayload, CreatePatient, GenericResponse, GenrateSummaryPayload, HistoryPayload, PatientListResponse, TrnascriptPayload } from '../modal/payload.modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private CREATE_PATIENT_URL = '/api/patient/add';
  private GENERATE_TRANSCRIPT_URL = '/api/patient/generate-transcript';
  private PATIENT_LIST = '/api/patients';
  private PROMPTS_LIST = '/api/prompts';
  private PROMPTS_DATA = '/api/get-prompt-data';
  private GENERATE_SUMMARY_URL = '/api/user/generateSummary';
  private GET_TOTAL = '/api/get-total';
  private OPTIMISE_TRANSCRIPT = '/api/optimize-transcript';
  private GENERATE_CODES  = '/api/generate-codes';
  private REVIEW_CODE = '/api/review-save';
  private DOWNLOAD_REPORT = '/api/get-report';
  private ADD_CODES = '/api/save-new-codes';
  private GET_FEATURES_LIST = '/api/user-feature'

  http = inject(HttpClient);
  loaderService = inject(CommonService)

  constructor() { }


  getFeaturesList(doctorId:string){
    return this.http.get(`${environment.url}${this.GET_FEATURES_LIST}${doctorId ?  `/${doctorId}`: ''}`)
  }


  getTotalCount() {
    return this.http.get(`${environment.url}${this.GET_TOTAL}`)
  }

  createPatient(payload: CreatePatient) {
    const formData = new FormData();
    formData.append('patient_name', payload.patientName)
    formData.append('patient_id', payload.patientId)
    formData.append('audio_file', payload.audioFile)
    formData.append('type_id', payload.type_id)
    formData.append('prompt_id', payload.promptId)
    this.loaderService.loaderMessage.set('Generating Transcript')
    return this.http.post(`${environment.url}${this.CREATE_PATIENT_URL}`, formData);
  }

  generateTranscript(payload: TrnascriptPayload) {
    const formData = new FormData();
    formData.append('patient_id', payload.patientId);
    formData.append('audio_file', payload.audioFile);
    return this.http.post(`${environment.url}${this.GENERATE_TRANSCRIPT_URL}`, formData);
  }

  generateSummary(payload: GenrateSummaryPayload) {
    return this.http.post(`${environment.url}${this.GENERATE_SUMMARY_URL}`, payload)
  }

  retrievePatientHistory(payload: HistoryPayload | any, patientId?: string) {
    const formData = new FormData();
    formData.append('key', payload)
    return this.http.post(`${environment.url}${this.PATIENT_LIST}${patientId ? `/${patientId}` : ''}`, payload);
  }

  retrievePrompts(payload:HistoryPayload) {
    return this.http.post<GenericResponse>(`${environment.url}${this.PROMPTS_LIST}`,payload);
  }

  optimiseTranscript(payload:{patient_id:number} ) {
    return this.http.post(`${environment.url}${this.OPTIMISE_TRANSCRIPT}`, payload)
  }

  generateCode(payload:{patient_id:number}){
    return this.http.post(`${environment.url}${this.GENERATE_CODES}`,payload);
  }

  reviewPatient (payload:{id:string, data:string, type:string}){
    return this.http.post(`${environment.url}${this.REVIEW_CODE}`, payload)
  }

  downloadReport (patientId:string){
    return this.http.get(`${environment.url}${this.DOWNLOAD_REPORT}${patientId ? `/${patientId}`:''}`,{
      headers:{
        'Content-Type':'application/pdf'
      }
    });
  }

  addNewCodes(payload:AddCodesPayload){
    return this.http.post(`${environment.url}${this.ADD_CODES}`,payload);
  }

  getPromptData(payload:HistoryPayload) {
    return this.http.post<GenericResponse>(`${environment.url}${this.PROMPTS_DATA}`,payload);
  }
}
