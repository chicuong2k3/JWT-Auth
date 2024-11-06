import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormData, LoginResponse } from "../../models/login";
import agent from "../../api/agent";

export interface LoginState {
    login: LoginResponse | null;
    error: string | null;
}

export const initialState: LoginState = {
    login: null,
    error: null,
};

export const signinUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
    'login/signinUser',
    async (data, { rejectWithValue }) => {
        try {
            const loginResponse = await agent.auth.login(data);
            localStorage.setItem("login", JSON.stringify(loginResponse));
            return loginResponse;
        } catch {
            return rejectWithValue("Username or password is incorrect.");
        }
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.login = null;
            state.error = null;
            localStorage.removeItem('login');
        },
        getLogin: (state) => {
            const storedLogin = localStorage.getItem('login');
            if (storedLogin) {
                state.login = JSON.parse(storedLogin);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(signinUser.fulfilled),
                (state, action: PayloadAction<LoginResponse>) => {
                    state.login = action.payload;
                    state.error = null; 
                }
            )
            .addMatcher(
                isAnyOf(signinUser.rejected),
                (state, action: PayloadAction<string | undefined>) => {
                    state.login = null;
                    state.error = action.payload || "An error occurred"; 
                }
            );
    },
});

export const { logout, getLogin } = loginSlice.actions;
