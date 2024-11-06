import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../redux/store/configureStore";

export default function Navbar() {
    const { login } = useAppSelector((state) => state.login);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    variant="dense"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>

                    {login ? (
                        <UserMenu />
                    ) : (
                        <div style={{ display: "flex" }}>
                            <Button
                                component={Link}
                                to="/register"
                                color="inherit"
                            >
                                Sign up
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                            >
                                Sign in
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
