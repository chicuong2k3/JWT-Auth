
export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
  }
  
 export interface RegisterResponseError {
    errors: Record<string, string[]>;
  }
  
 export type RegisterResponse = string | RegisterResponseError;