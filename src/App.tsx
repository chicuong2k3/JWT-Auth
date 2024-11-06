import { Container, CssBaseline } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store/configureStore";
import { getLogin } from "./redux/slice/loginSlice";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLogin());
    }, [dispatch])


    return (
        <>
            <CssBaseline />
            <Navbar />
            <Container>
                <Outlet />
                <Routes>
                    <Route path="/" Component={HomePage} />
                    <Route path="/register" Component={RegisterPage} />
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/profile" Component={ProfilePage} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
