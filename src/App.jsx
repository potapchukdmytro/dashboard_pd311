import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/about/About";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersList from "./pages/users/UsersList";
import EditUserPage from "./pages/users/edit/EditUserPage";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import { AuthContext } from "./components/providers/AuthProvider";

const App = () => {
    const { auth, login } = useContext(AuthContext);

    useEffect(() => {
        login();
    }, []);

    return (
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />
                    {!auth && (
                        <>
                            <Route path="register" element={<RegisterPage />} />
                            <Route path="login" element={<LoginPage />} />
                        </>
                    )}
                    <Route path="about" element={<AboutPage />} />
                    <Route path="users">
                        <Route index element={<UsersList />} />
                        <Route
                            path="user"
                            element={<EditUserPage isUpdate={false} />}
                        />
                        <Route
                            path="user/:id"
                            element={<EditUserPage isUpdate={true} />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
    );
};

export default App;
