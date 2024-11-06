import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../slice/loginSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileSlice } from "../slice/profileSlice";


export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        profile: profileSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;