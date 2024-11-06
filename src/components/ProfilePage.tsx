import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import {
    getProfileAsync,
    selectProfile,
    selectProfileStatus,
} from "../redux/slice/profileSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const profile = useAppSelector(selectProfile);
    const profileStatus = useAppSelector(selectProfileStatus);

    useEffect(() => {
        if (profileStatus === "idle") {
            dispatch(getProfileAsync());
        }

        if (profileStatus === "failed") {
            navigate("/login");
        }
    }, [profileStatus, dispatch, navigate]);

    return (
        <Box sx={{ padding: 2 }}>
            {profileStatus === "loading" && <CircularProgress />}
            {profileStatus === "succeeded" && profile && (
                <>
                    <Typography variant="h4">User Profile</Typography>
                    <Typography variant="h6">
                        Username: {profile.username}
                    </Typography>
                    <Typography variant="h6">Email: {profile.email}</Typography>
                    <Typography variant="h6">
                        Created At:{" "}
                        {new Date(
                            profile.createdAt.split(".")[0]
                        ).toLocaleString()}
                    </Typography>
                </>
            )}
        </Box>
    );
}
