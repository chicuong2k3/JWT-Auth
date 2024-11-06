
export interface LoginFormData {
    email: string;
    password: string;
  }

 export interface LoginResponse {
    userId: string,
    accessToken: string;
}