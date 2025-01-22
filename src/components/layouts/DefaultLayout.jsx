import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";

const DefaultLayout = () => {
    const [theme, setTheme] = useState("light");

    const changeThemeHanlder = () => {
        const currentTheme = theme === "light" ? "dark" : "light";
        setTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    return (
        <>
            <Navbar isDark={theme === "dark"} themeHandler={changeThemeHanlder} />
            <Container sx={{minHeight: "100vh"}}>
                <Outlet/>
            </Container>
            <Footer/>
        </>
    );
};

export default DefaultLayout;