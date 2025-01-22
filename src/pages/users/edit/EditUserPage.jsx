import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    Button,
    Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FieldError } from "../../../components/errors/Errors";
import * as React from "react";

const EditUserPage = ({ isUpdate = false }) => {
    const params = useParams();
    const navigate = useNavigate();

    const formEditHandler = (values) => {
        const localData = localStorage.getItem("users");

        const users = JSON.parse(localData);
        const userIndex = users.findIndex(u => u.id == values.id);
        users[userIndex] = {...values};

        localStorage.setItem("users", JSON.stringify(users));
        navigate("/users");
    };

    const formCreateHandler = (values) => {
        const users = localStorage.getItem("users");
        if(!users) {
            localStorage.setItem("users", JSON.stringify([{ ...values, id: 1 }]))
        } else {            
            const array = JSON.parse(users);
            values.id = array[array.length - 1].id + 1;            
            array.push(values);
            localStorage.setItem("users", JSON.stringify(array))
        }

        navigate("/users");
    }

    // init values
    const initValues = {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        image: ""
    };

    // validation scheme with yup
    const yupValidationScheme = Yup.object({
        firstName: Yup.string().max(50, "Максимальна довжина 50 символів"),
        lastName: Yup.string().max(50, "Максимальна довжина 50 символів"),
        email: Yup.string()
            .email("Не вірний формат пошти")
            .required("Обов'язкове поле"),
        password: Yup.string().min(6, "Мінімальна довжина паролю 6 символів"),
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: yupValidationScheme,
        onSubmit: isUpdate ? formEditHandler : formCreateHandler,
    });

    useEffect(() => {
        if(params.id) {
            const localData = localStorage.getItem("users");
            if (localData) {
                const users = JSON.parse(localData);
    
                const userData = users.find((u) => u.id == params.id);
    
                if (userData) {
                    formik.setValues(userData);
                } else {
                    navigate("/users");
                }
            } else {
                navigate("/users");
            }
        }
    }, []);

    return (
        <Container>
            <Typography
                component="h1"
                variant="h4"
                sx={{
                    width: "100%",
                    fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    textAlign: "center",
                    m: "10px 0px",
                }}
            >
                {isUpdate ? "Edit user" : "Create user"}
            </Typography>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <FormControl>
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <TextField
                        autoComplete="firstName"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        placeholder="Jon"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <FieldError text={formik.errors.firstName} />
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="name">Last name</FormLabel>
                    <TextField
                        autoComplete="lastName"
                        name="lastName"
                        fullWidth
                        id="lastName"
                        placeholder="Snow"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <FieldError text={formik.errors.lastName} />
                    ) : null}
                </FormControl>
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
                        <FieldError text={formik.errors.email} />
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
                        <FieldError text={formik.errors.password} />
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="image">Avatar</FormLabel>
                    <TextField
                        fullWidth
                        name="image"
                        type="text"
                        id="image"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        onBlur={formik.handleBlur}
                    />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                    { isUpdate ? "Save" : "Create" }
                </Button>
            </Box>
        </Container>
    );
};

export default EditUserPage;
