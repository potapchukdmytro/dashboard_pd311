import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/about/About";
import RegisterPageWithProvider from "./pages/register";
import LoginPageWithProvider from "./pages/login";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersListPage from "./pages/admin/users/UsersListPage";
import EditUserPage from "./pages/admin/users/edit/EditUserPage";
import AdminPanelLayout from "./components/layouts/AdminPanelLayout";
import RoleListPage from "./pages/admin/roles/RoleListPage";
import { useSelector } from "react-redux";
import usersJson from "./pages/admin/users/users.json";
import useAction from "./hooks/useAction";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theming/themes";

const App = () => {
    const { user, isAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const { login, setTheme } = useAction();

    useEffect(() => {
        const localData = localStorage.getItem("users");
        if (!localData) {
            localStorage.setItem("users", JSON.stringify(usersJson));
        }
    }, []);

    // login user
    useEffect(() => {
        const localData = localStorage.getItem("user");
        if (localData) {
            const user = JSON.parse(localData);
            login(user);
        }

        const localTheme = localStorage.getItem("theme");
        if(localTheme) {
            setTheme(localTheme);
        }
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />
                    {!isAuth && (
                        <>
                            <Route path="register" element={<RegisterPageWithProvider />} />
                            <Route
                                path="login"
                                element={<LoginPageWithProvider />}
                            />
                        </>
                    )}
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                {isAuth && user.role === "admin" && (
                    <Route path="admin" element={<AdminPanelLayout />}>
                        <Route path="users">
                            <Route index element={<UsersListPage />} />
                            <Route
                                path="user"
                                element={<EditUserPage isUpdate={false} />}
                            />
                            <Route
                                path="user/:id"
                                element={<EditUserPage isUpdate={true} />}
                            />
                        </Route>
                        <Route path="roles" element={<RoleListPage />} />
                    </Route>
                )}
            </Routes>
        </ThemeProvider>
    );
};

export default App;
