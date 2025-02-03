import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button, Avatar, Box, AppBar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { defaultAvatarUrl } from "../../settings/urls";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";

const pages = [
    { name: "Main page", url: "/" },
    { name: "About", url: "/about" },
    { name: "Admin panel", url: "/admin", role: "admin" },
    { name: "Page 3", url: "/" },
    { name: "Page 4", url: "/" },
];

const Navbar = () => {
    const { user, isAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const { logout, setTheme } = useAction();
    const muiTheme = useTheme();

    const logoutHandler = () => {
        logout();
    };

    return (
        <AppBar
            color="primary"
            position="static"
            sx={{
                minHeight: "50px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 20px",
            }}
        >
            <Box
                sx={{
                    flexGrow: 5,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                {pages.map((page) =>
                    !page.role ? (
                        <Link
                            to={page.url}
                            key={page.name}
                            style={{ color: muiTheme.palette.text.main }}
                        >
                            {page.name}
                        </Link>
                    ) : (
                        isAuth &&
                        user.role === page.role && (
                            <Link
                                to={page.url}
                                key={page.name}
                                style={{ color: muiTheme.palette.text.main }}
                            >
                                {page.name}
                            </Link>
                        )
                    )
                )}
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "right" }}>
                {theme === "dark" ? (
                    <Button onClick={() => setTheme("light")}>
                        <LightModeIcon
                            sx={{ color: muiTheme.palette.text.main }}
                        />
                    </Button>
                ) : (
                    <Button onClick={() => setTheme("dark")}>
                        <DarkModeIcon
                            sx={{ color: muiTheme.palette.text.main }}
                        />
                    </Button>
                )}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {!isAuth ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Link style={{ margin: "0px 5px" }} to="login">
                            <Button variant="contained" color="secondary">
                                {" "}
                                Login{" "}
                            </Button>
                        </Link>
                        <Link style={{ margin: "0px 5px" }} to="register">
                            <Button variant="contained" color="secondary">
                                {" "}
                                Register{" "}
                            </Button>
                        </Link>
                    </Box>
                ) : (
                    <Box
                        sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={user.image ? user.image : defaultAvatarUrl}
                        />
                        <Button
                            onClick={logoutHandler}
                            sx={{ m: "0px 5px   " }}
                            variant="contained"
                            color="secondary"
                        >
                            {" "}
                            Logout{" "}
                        </Button>
                    </Box>
                )}
            </Box>
        </AppBar>
    );
};

export default Navbar;
