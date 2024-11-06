import { useState, ChangeEvent, FormEvent } from "react";
import { AxiosError } from "axios";
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RegisterFormData, RegisterResponseError } from "../models/register";
import agent from "../api/agent";

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await agent.auth.register(formData);
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/login");
            }, 500);
        } catch (err) {
            const errResponse = (err as AxiosError<RegisterResponseError>)
                .response;
            setErrors({
                username: errResponse?.data.errors?.username?.join(" ") ?? "",
                email: errResponse?.data.errors?.email?.join(" ") ?? "",
                password: errResponse?.data.errors?.password?.join(" ") ?? "",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 500, margin: "40px auto", padding: "16px" }}>
            <CardContent>
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" textAlign="center">
                        Sign Up
                    </Typography>

                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        size="small"
                        onChange={handleChange}
                        required
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        size="small"
                        onChange={handleChange}
                        required
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        size="small"
                        onChange={handleChange}
                        required
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign Up"
                        )}
                    </Button>

                    <Typography sx={{ textAlign: "center" }}>
                        Already have an account?{" "}
                        <RouterLink
                            to="/login"
                            style={{ textDecoration: "none" }}
                        >
                            Sign in
                        </RouterLink>
                    </Typography>
                </Box>
            </CardContent>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Register successfully!
                </Alert>
            </Snackbar>
        </Card>
    );
}
