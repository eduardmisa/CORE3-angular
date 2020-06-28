export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}



export interface CurrentUserGroup {
  code: string;
  name: string;
}
export interface CurrentUserService {
  service: string;
  method: string;
  url: string;
}
export interface CurrentUser {
  token: string;
  userCode: string;
  firstname: string;
  lastname: string;
  email: string;
  isSuperuser: boolean;
  expires: string;
  groups: CurrentUserGroup[];
  services: CurrentUserService[];
}