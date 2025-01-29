import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Grid from "@mui/material/Grid2";
import AdminPanelMenu from "../menu/admin/AdminPanelMenu";

const AdminPanelLayout = () => {
    return (
        <>
            <Navbar/>
            <Grid container sx={{minHeight: "100vh", my: "10px"}} spacing={2}>
                <Grid size={2}>
                    <AdminPanelMenu/>
                </Grid>
                <Grid size={8}>
                    <Outlet/>
                </Grid>
                <Grid size={2}>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default AdminPanelLayout;