import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer";
import MainPage from "./pages/mainPage/MainPage";
import { useEffect, useState } from "react";

const App = () => {
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
            <Navbar isDark={theme === "dark" ? true : false} />
            <div>
                <button
                    onClick={changeThemeHanlder}
                    style={{ margin: "10px 5px" }}
                >
                    Change theme
                </button>
            </div>
            <MainPage />
            <Footer />
        </>
    );
};

export default App;
