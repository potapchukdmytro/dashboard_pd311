import {useContext, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/about/About";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersListPage from "./pages/admin/users/UsersListPage";
import EditUserPage from "./pages/admin/users/edit/EditUserPage";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import {AuthContext} from "./components/providers/AuthProvider";
import AdminPanelLayout from "./components/layouts/AdminPanelLayout";
import RoleListPage from "./pages/admin/roles/RoleListPage";

const App = () => {
    const {auth, login} = useContext(AuthContext);

    useEffect(() => {
        login();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<MainPage/>}/>
                {!auth && (
                    <>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                    </>
                )}
                <Route path="about" element={<AboutPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
            {
                auth && auth.role === "admin" && (
                    <Route path="admin" element={<AdminPanelLayout/>}>
                        <Route path="users">
                            <Route index element={<UsersListPage/>}/>
                            <Route
                                path="user"
                                element={<EditUserPage isUpdate={false}/>}
                            />
                            <Route
                                path="user/:id"
                                element={<EditUserPage isUpdate={true}/>}
                            />
                        </Route>
                        <Route path="roles" element={<RoleListPage/>}/>
                    </Route>
                )
            }
        </Routes>
    );
};

export default App;
