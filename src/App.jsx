import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/about/About";
import RegisterPage from "./pages/register/RegisterPage";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersList from "./pages/users/UsersList";
import EditUserPage from "./pages/users/edit/EditUserPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<MainPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="users">
                    <Route index element={<UsersList/>}/>
                    <Route path="user" element={<EditUserPage isUpdate={false}/>}/>
                    <Route path="user/:id" element={<EditUserPage isUpdate={true}/>}/>
                </Route>
            </Route>
        </Routes>
    )
        ;
};

export default App;
