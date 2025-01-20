import { useContext, useState } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    FormControl, 
    FormLabel, 
    Divider,
    Button,
    Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FieldError } from '../../components/errors/Errors';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/providers/AuthProvider';

const LoginPage = () => {
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const formSubmit = (values) => {    
            const localData = localStorage.getItem("users");
            
            if(!localData) {
                navigate("/register");
            }
            const users = JSON.parse(localData);
            const user = users.find(u => u.email === values.email);
            
            if(user) {
                if(user.password === values.password) {
                    localStorage.setItem("auth", JSON.stringify(user));
                    login();
                    navigate("/");
                } else {
                    setSubmitError("Невірний пароль");
                }
            } else {
                setSubmitError(`Користувача з ${values.email} не знайдено`);
            }
        }
    
        // init values
        const initValues = {
            email: "",
            password: ""
        };
    
        // validation scheme with yup
        const yupValidationScheme = Yup.object({
            email: Yup.string().email("Не вірний формат пошти").required("Обов'язкове поле"),
            password: Yup.string().min(6, "Мінімальна довжина паролю 6 символів")
        });
    
        // formik
        const formik = useFormik({
            initialValues: initValues,
            validationSchema: yupValidationScheme,
            onSubmit: formSubmit
        });
    
        return (
            <Container>
             <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: "center", m: "10px 0px" }}
              >
                Sign in
              </Typography>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
             <FieldError text={ formik.errors.email } />
           ) : null}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
             <FieldError text={ formik.errors.password } />
           ) : null}
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Sign in
                </Button>
              </Box>
              <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
              </Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  Don't have account?{' '}
                  <Link
                    to="/register"
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box> 
              <Box sx={{textAlign: "center"}}>
                <FieldError text={submitError} />
              </Box>
              </Container>
        );
}

export default LoginPage;