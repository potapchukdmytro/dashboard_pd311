import LoginPage from './LoginPage';
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientId = "";

const LoginPageWithProvider = () => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <LoginPage/>
        </GoogleOAuthProvider>
    )
}

export default LoginPageWithProvider;