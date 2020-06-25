export interface UserList {
  code: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
}




export interface UserGroupRead {
  code: string;
  Name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
}
export interface UserRead {
  code: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: UserGroupRead[];
}




export interface UserCreateRequest {
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: string[];
}

export interface UserGroupCreateResponse {
  code: string;
  Name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
}
export interface UserCreateResponse {
  code: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: UserGroupCreateResponse[];
}







export interface UserUpdateRequest {
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: string[];
}

export interface UserGroupUpdateResponse {
  code: string;
  Name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
}
export interface UserUpdateResponse {
  code: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: UserGroupUpdateResponse[];
}





export interface UserGroupDeleteResponse {
  code: string;
  Name: string;
  description: string;
  hasAllAccess: boolean;
  service: string;
}
export interface UserDeleteResponse {
  code: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  isSuperuser: boolean;
  groups: UserGroupDeleteResponse[];
}
