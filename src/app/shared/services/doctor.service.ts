import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateDoctorPayload, CreatePromptPayload, GenericResponse, HistoryPayload, UpdatePromptPayload } from '../modal/payload.modal';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private CREATE_DOCTOR_URL = '/api/user/add';
  private UPDATE_DOCTOR_URL = '/api/user/update';
  private USER_LIST_URL = '/api/users';
  private SPECIALIZATION_URL = '/api/specializations';
  private PROMPT_LIST = '/api/prompts';
  private PROMPT_LIST_ORG = '/api/get-prompt-data';
  private ADD_PROMPT = '/api/prompts/add';
  private GETSTATS = '/api/get-stats';
  private CREATESPECIALIZATION = '/api/specialization/add';
  private UPDATESPECIALIZATION = '/api/specialization/update';
  private DELETESPECIALIZATION = '/api/specialization/delete';
  private UPDATE_PROMPT = '/api/prompts/update';
  private PROMPT_TYPE = '/api/prompt-type';
  private ENABLEDISABLE = '/api/prompts/toggle';
  private SPECIALIZATION_ENABLE_DISABLE = '/api/specialization/toggle';
  private ORGANIZATION_ENABLE_DISABLE = '/api/organization/toggle';
  private FEATURE_LIST = '/api/features';
 

  httpClient = inject(HttpClient)

  constructor() { }

  createUser(payload: CreateDoctorPayload) {
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.CREATE_DOCTOR_URL}`, payload)
  }

  updateUser(payload: CreateDoctorPayload, id?: string) {
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.UPDATE_DOCTOR_URL}${id ? `/${id}` : ''}`, payload)
  }

  retrieveDoctorHistory(payload: HistoryPayload | any, patientId?: string) {
    const formData = new FormData();
    formData.append('key', payload)
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.USER_LIST_URL}${patientId ? `/${patientId}` : ''}`, payload);
  }

  retrievePromptList(payload: HistoryPayload) {
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.PROMPT_LIST}`, payload);
  }
  retrievePromptforOrg(payload: HistoryPayload) {
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.PROMPT_LIST_ORG}`, payload);
  }

  createPrompt(payload: CreatePromptPayload) {
    return this.httpClient.post(`${environment.url}${this.ADD_PROMPT}`, payload);
  }

  updatePrompt(promptId: string, payload: UpdatePromptPayload) {
    return this.httpClient.post(`${environment.url}${this.UPDATE_PROMPT}${promptId ? `/${promptId}` : ''}`, payload);
  }

  retrievePromptType() {
    return this.httpClient.get(`${environment.url}${this.PROMPT_TYPE}`);
  }

  retrieveSpecialization(payload: HistoryPayload, id?: number) {
    return this.httpClient.post(`${environment.url}${this.SPECIALIZATION_URL}${id ? id : ''}`, payload)
  }

  createSpecialization(payload: any) {
    return this.httpClient.post(`${environment.url}${this.CREATESPECIALIZATION}`, payload)
  }

  updateSpecialization(payload: any, id: number | string) {
    return this.httpClient.patch(`${environment.url}${this.UPDATESPECIALIZATION}/${id}`, payload);
  }

  deleteSpecialization(id: number | string) {
    return this.httpClient.delete(`${environment.url}${this.DELETESPECIALIZATION}/${id}`);
  }

  getChartData() {
    return this.httpClient.get<GenericResponse>(`${environment.url}${this.GETSTATS}`);
  }

  enableDisable(id: string | number, payload: any) {
    return this.httpClient.patch<any>(`${environment.url}${this.ENABLEDISABLE}/${id}`, payload);
  }

  getFeatures(payload: any, id?: string | number) {
    return this.httpClient.post<GenericResponse>(`${environment.url}${this.FEATURE_LIST}${id ? `/${id}` : ''}`, payload);
  }

  specializationEnableDisable(id: string | number, payload: any) {
    return this.httpClient.patch<any>(`${environment.url}${this.SPECIALIZATION_ENABLE_DISABLE}/${id}`, payload);
  }
  
  organizationEnableDisable(id: string | number, payload: any) {
    return this.httpClient.patch<any>(`${environment.url}${this.ORGANIZATION_ENABLE_DISABLE}/${id}`, payload);
  }

}
