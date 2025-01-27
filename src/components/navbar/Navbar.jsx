import * as styles from "./styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./style.css";
import {Button, Avatar, Box} from "@mui/material";
import {Link} from "react-router-dom";
import {defaultAvatarUrl} from "../../settings/urls";
import {useDispatch, useSelector} from "react-redux";

const Navbar = ({isDark = false, themeHandler}) => {
    const {user, isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem("user");
        dispatch({type: "USER_LOGOUT"});
    }

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
                {
                    (isAuth && user.role === "admin") ? (
                        <Link style={navLink} to="/admin">
                            Admin panel
                        </Link>
                    ) : (
                        <Link style={navLink} to="/">
                            Page 3
                        </Link>
                    )
                }
                <Link style={navLink} to="/">
                    Page 4
                </Link>
            </div>
            <div className="theme-container">
                <Button onClick={themeHandler}>
                    {isDark ? (
                        <LightModeIcon sx={{color: "white"}}/>
                    ) : (
                        <DarkModeIcon sx={{color: "black"}}/>
                    )}
                </Button>
            </div>
            <div style={{flexGrow: 1}}>
                {!isAuth ? (
                    <Box className="auth-container">
                        <Link style={{margin: "0px 5px"}} to="login">
                            <Button variant="contained"> Login </Button>
                        </Link>
                        <Link style={{margin: "0px 5px"}} to="register">
                            <Button variant="contained"> Register </Button>
                        </Link>
                    </Box>
                ) : (
                    <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
                        <Avatar alt="Remy Sharp" src={user.image ? user.image : defaultAvatarUrl}/>
                        <Button onClick={logoutHandler} sx={{m: "0px 5px   "}} variant="contained">
                            {" "}
                            Logout{" "}
                        </Button>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Navbar;
