export interface ServiceList {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceRead {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceCreateRequest {
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceCreateResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceUpdateRequest {
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceUpdateResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}

export interface ServiceDeleteResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}