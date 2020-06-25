export interface PermissionList {
  code: string;
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
}




export interface PermissionServiceRouteRead {
  code: string;
  url: string;
  method: string;
  service: string;
}
export interface PermissionServiceRead {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}
export interface PermissionRead {
  code: string;
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: PermissionServiceRead;
  serviceRoutes: PermissionServiceRouteRead[];
}






export interface PermissionCreateRequest {
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
  serviceRoutes: string[];
}


export interface PermissionServiceRouteCreateResponse {
  code: string;
  url: string;
  method: string;
  service: string;
}
export interface PermissionServiceCreateResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}
export interface PermissionCreateResponse {
  code: string;
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: PermissionServiceCreateResponse;
  serviceRoutes: PermissionServiceRouteCreateResponse[];  
}




export interface PermissionUpdateRequest {
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
  serviceRoutes: string[];
}

export interface PermissionServiceRouteUpdateResponse {
  code: string;
  url: string;
  method: string;
  service: string;
}
export interface PermissionServiceUpdateResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}
export interface PermissionUpdateResponse {
  code: string;
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: PermissionServiceUpdateResponse;
  serviceRoutes: PermissionServiceRouteUpdateResponse[];  
}




export interface PermissionServiceRouteDeleteResponse {
  code: string;
  url: string;
  method: string;
  service: string;
}
export interface PermissionServiceDeleteResponse {
  code: string;
  name: string;
  description: string;
  baseUrl: string;
}
export interface PermissionDeleteResponse {
  code: string;
  name: string;
  description: string;
  hasAllAccess: boolean;
  service: PermissionServiceDeleteResponse;
  serviceRoutes: PermissionServiceRouteDeleteResponse[];  
}