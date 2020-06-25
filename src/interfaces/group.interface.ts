export interface GroupList {
  code: string;
  name: string;
  description: string;
}




export interface GroupPermissionRead {
  code: string;
  name: string;
  description: string;
}
export interface GroupRead {
  code: string;
  name: string;
  description: string;
  permissions: GroupPermissionRead[];
}




export interface GroupCreateRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface GroupPermissionCreateResponse {
  code: string;
  name: string;
  description: string;
}
export interface GroupCreateResponse {
  code: string;
  name: string;
  description: string;
  permissions: GroupPermissionCreateResponse[];
}





export interface GroupUpdateRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface GroupPermissionUpdateResponse {
  code: string;
  name: string;
  description: string;
}
export interface GroupUpdateResponse {
  code: string;
  name: string;
  description: string;
  permissions: GroupPermissionUpdateResponse[];
}





export interface GroupPermissionDeleteResponse {
  code: string;
  name: string;
  description: string;
}
export interface GroupDeleteResponse {
  code: string;
  name: string;
  description: string;
  permissions: GroupPermissionDeleteResponse[];
}
