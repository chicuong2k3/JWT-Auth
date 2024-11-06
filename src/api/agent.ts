import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../config";
import { RegisterFormData, RegisterResponse } from "../models/register";
import { LoginFormData, LoginResponse } from "../models/login";
import { Profile } from "../models/profile";


axios.defaults.baseURL = API_BASE_URL;

const getResponseBody = <T> (response: AxiosResponse<T>) => {
    return response.data;
}

const requests = {
    get: <T> (endpoint: string) => axios.get<T>(endpoint).then(getResponseBody),
    post: <T> (endpoint: string, body: unknown) => axios.post<T>(endpoint, body).then(getResponseBody),
    put: <T> (endpoint: string, body: unknown) => axios.put<T>(endpoint, body).then(getResponseBody),
    delete: <T> (endpoint: string) => axios.delete<T>(endpoint).then(getResponseBody)
};

const auth = {
    register: (body: RegisterFormData) => requests.post<RegisterResponse>("/register", body),
    login: (body: LoginFormData) => requests.post<LoginResponse>("/login", body),
    getProfile: (accessToken: string) =>
        axios.get<Profile>('/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
};
  
export default {
    auth
};