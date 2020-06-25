export interface ServiceRouteList {
  code: string;
  url: string;
  method: string;
  service: string;
}


export interface ServiceRouteServiceRead {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}
export interface ServiceRouteRead {
  code: string;
  url: string;
  method: string;
  service: ServiceRouteServiceRead;
}



export interface ServiceRouteCreateRequest {
  url: string;
  method: string;
  service: string;
}

export interface ServiceRouteCreateResponse {
  code: string;
  method: string;
  url: string;
  service: string;
}



export interface ServiceRouteUpdateRequest {
  url: string;
  method: string;
  service: string;
}

export interface ServiceRouteUpdateResponse {
  code: string;
  method: string;
  url: string;
  service: string;
}



export interface ServiceRouteDeleteResponse {
  code: string;
  method: string;
  url: string;
  Service: string;
}