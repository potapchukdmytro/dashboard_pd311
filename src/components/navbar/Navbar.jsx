import * as styles from "./styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./style.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = ({ isDark = false, themeHandler }) => {
    const { auth, logout } = useContext(AuthContext);

    const navLink = {
        textDecoration: "none",
        color: isDark ? "white" : "black",
    };

    return (
        <div
            style={isDark ? styles.darkContainer : styles.lightContainer}
            className="container"
        >
            <div className="navbar">
                <Link style={navLink} to="/">
                    Main page
                </Link>
                <Link style={navLink} to="about">
                    About
                </Link>
                <Link style={navLink} to="users">
                    Users
                </Link>
                <Link style={navLink} to="#">
                    Page 4
                </Link>
            </div>
            <div className="theme-container">
                <Button onClick={themeHandler}>
                    {isDark ? (
                        <LightModeIcon sx={{ color: "white" }} />
                    ) : (
                        <DarkModeIcon sx={{ color: "black" }} />
                    )}
                </Button>
            </div>
            <div>
                {!auth ? (
                    <>
                        <Link style={{ margin: "0px 5px" }} to="login">
                            <Button variant="contained"> Login </Button>
                        </Link>
                        <Link style={{ margin: "0px 5px" }} to="register">
                            <Button variant="contained"> Register </Button>
                        </Link>
                    </>
                ) : (
                    <Button onClick={logout} sx={{ m: "0px 5px" }} variant="contained">
                        {" "}
                        Logout{" "}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
