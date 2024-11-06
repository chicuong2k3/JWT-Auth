import { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
import { LoginFormData } from "../models/login";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import { signinUser } from "../redux/slice/loginSlice";

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const { error, login } = useAppSelector((state: RootState) => state.login);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await dispatch(signinUser(formData));
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (login) {
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/profile");
            }, 500);
        }
    }, [login, navigate]);

    useEffect(() => {
        if (error) {
            setLoading(false);
        }
    }, [error]);

    return (
        <>
            <Card sx={{ maxWidth: 500, margin: "40px auto", padding: "16px" }}>
                <CardContent>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h5" textAlign="center">
                            Sign In
                        </Typography>

                        {error && (
                            <Typography color="error" variant="subtitle1">
                                {error}
                            </Typography>
                        )}

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            size="small"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            size="small"
                            onChange={handleChange}
                            required
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
                                "Login"
                            )}
                        </Button>

                        <Typography sx={{ textAlign: "center" }}>
                            Don't have an account?{" "}
                            <RouterLink
                                to="/register"
                                style={{ textDecoration: "none" }}
                            >
                                Sign up
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
                        Login successfully!
                    </Alert>
                </Snackbar>
            </Card>
        </>
    );
}
