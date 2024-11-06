import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../models/profile";
import agent from "../../api/agent";
import { RootState } from "../store/configureStore";

export interface ProfileState {
    profile: Profile | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    status: "idle",
    error: null,
};

export const getProfileAsync = createAsyncThunk<Profile, void, { rejectValue: string }>(
    "profile/getProfileAsync",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const accessToken = state.login.login?.accessToken;
            console.log("Access Token: ", accessToken);

            if (!accessToken) {
                return rejectWithValue("Invalid token.");
            }

            const response = await agent.auth.getProfile(accessToken);
            console.log(response.data)
            return response.data;
        } catch {
            console.log("Failed to fetch profile.");
            return rejectWithValue("Failed to fetch profile.");
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(getProfileAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const selectProfile = (state: { profile: ProfileState }) => state.profile.profile;
export const selectProfileStatus = (state: { profile: ProfileState }) => state.profile.status;

export default profileSlice.reducer;
