import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/loginSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        dispatch(logout());
        navigate("/");
        handleClose();
    };

    return (
        <>
            <IconButton
                sx={{ color: "white" }}
                size="large"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link
                        to={"/profile"}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
        </>
    );
}
