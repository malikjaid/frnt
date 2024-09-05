export interface LoginPayload {
  email: string,
  password: string,
}

export interface CreateUserPayload {
  token: string,
  name: string,
  email: string,
  username: string,
  password: string,
  role: string,
}


export interface TrnascriptPayload {
  patientId: string,
  audioFile: File,
}


export interface CreatePatient {
  patientName: string,
  patientId: string,
  audioFile: File,
  type_id: string,
  promptId: string
}


export interface HistoryPayload {
  search_key: string | number,
  search_column: string,
  order?: string,
  order_by?: string,
  page: number,
  per_page: number,
  role_id?: number,
  type?: number,
  created_by_id?: string
}

export interface AdminDoctorListing extends HistoryPayload { }
export interface AdminDoctorView extends HistoryPayload { }


export interface CreateDoctorPayload {
  full_name: string,
  email: string,
  password: string,
  role_id: number,
  specialization: string
  profile_file?: File
  organization_id?:number|string
  country:string,
  feature_access:string
}


export interface CreateOrganisation {
  full_name: string,
  email: string,
  password: string,
  country: string,
  address: string,
  country_code: string,
  contact_no: string,
  profile_file?: File
}


// Response 



export interface PatientListResponse {
  data: Detail[]
  meta: Meta
  status: number
}

export interface Detail {
  prompt?: string
  id: number
  patient_name: string
  patient_id: string
  audio_file: string
  file_url: string
  transcript?: string
  state_id: number
  state: string,
  summary: string,
  report_url:string,
  optimize_transcript: string,
  citation: string,
  type_id: number,
  created_by_id: number,
  progress_status:string,
  created_by: CreatedBy[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface CreatedBy {
  id: number
  full_name: string
  email: string
  role_id: number
  role: string
  state_id: number
  state: string
  profile_file: any
  file_url: any
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface Meta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}


export interface LoginResponse {
  details: Details
  token: string
  status: number
}

export interface Details {
  id: number
  full_name: string
  email: string
  role_id: number
  role: string
  state_id: number
  state: string
  profile_file: any
  file_url: any
  created_at: string
  updated_at: string
  deleted_at: string
}



export interface GenericResponse {
  message: string
  details: Details
  status: number
}

export interface Details {
  id: number
  patient_name: string
  patient_id: string
  audio_file: string
  file_url: any
  transcript: string
  state_id: number
  state: string
  created_by_id: number
  created_at: string
  updated_at: string
  deleted_at: string
}


export interface DoctorListResponse {
  data: DoctorDetails[]
  meta: Meta
  status: number
}

export interface DoctorDetails {
  id: number
  full_name: string
  email: string
  role_id: number
  role: string
  state_id: number,
  country?: string,
  country_name:string,
  state: string
  profile_file: any,
  specialities: Array<Specialization>
  file_url: any
  created_at: string
  created_by: string
  updated_at: string
  deleted_at: string

}



export interface GenericResponse {
  data: UserData
  token: string
  message: string,
  status: number
}

export interface UserData {
  id: number
  full_name: string
  email: string
  role_id: number
  role: string
  state_id: number
  state: string
  profile_file: any
  file_url: any
  address: any
  country: any
  contact_no: any
  country_code: any
  zipcode: any
  language_id: number
  date_of_birth: any
  dob: any
  gender: any
  otp: any
  fcm_token: any
  created_at: string
  updated_at: string
  deleted_at: any
  specialities: any[]
  speciality_ids: any
  token: string
}



export interface Specialization {
  id: number,
  name: string,
  state_id: number,
  type_id: number,
  created_by_id: number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
}


export interface GenrateSummaryPayload {
  patient_id: number,
  transcript: string,
  is_edited: boolean,
  prompt_id: number,
  selected_transcript_type?: string
}


export interface CreatePromptPayload {
  key: string,
  value: string
}
export interface UpdatePromptPayload {
  prompt_id: string,
  key: string,
  value: string
}

// Generate code response 

export interface GenerateCodes {
  data: Data
  message: string
  status: number
}

export interface Data {
  id: number
  patient_name: string
  patient_id: string
  type_id: number
  prompt_id: number
  audio_file: string
  file_url: string
  transcript: string
  state_id: number
  count: any
  state: string
  created_by_id: number
  created_by: CreatedBy
  summary: string
  optimize_transcript: string
  report_url: string
  citation: string
  mcd_code: any
  mcd_code_html: string
  created_at: string
  updated_at: string
  deleted_at: any
}

export interface CreatedBy {
  id: number
  full_name: string
  email: string
  role_id: number
  role: string
  state_id: number
  state: string
  profile_file: any
  file_url: any
  address: string
  country: any
  contact_no: string
  country_code: string
  zipcode: any
  language_id: number
  date_of_birth: any
  dob: any
  gender: any
  otp: any
  fcm_token: any
  dependants: any
  created_at: string
  updated_at: string
  deleted_at: string
  specialities: Speciality[]
  speciality_ids: any
  token: any
}

export interface Speciality {
  id: number
  specialization_id: number
  name: string
  state_id: number
  created_by_id: number
  created_at: string
  updated_at: string
  deleted_at: any
}


// add new codes

export interface AddCodesPayload {
  patient_id: string,
  code: string,
  description: string,
  type: string,
  notes: string,
}
