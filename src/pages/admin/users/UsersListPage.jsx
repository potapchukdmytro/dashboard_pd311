import React, { useEffect } from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box, Avatar
} from "@mui/material";
import usersJson from "./users.json";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import {defaultAvatarUrl} from "../../../settings/urls";
import {useDispatch, useSelector} from "react-redux";

const UsersListPage = () => {
    const { users, isLoaded } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoaded) {
            const jsonList = localStorage.getItem("users");
            if (!jsonList) {
                localStorage.setItem("users", JSON.stringify(usersJson));
                dispatch({type: "USERS_LOAD", payload: jsonList});
            } else {
                const list = JSON.parse(jsonList);
                dispatch({type: "USERS_LOAD", payload: list});
            }
        }
    }, []);

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">First name</TableCell>
                            <TableCell align="center">Last name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {user.id}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <Avatar sx={{m: "auto"}} alt={user.email} src={user.image ? user.image : defaultAvatarUrl} />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.role}
                                </TableCell>
                                <TableCell align="center">
                                    {user.password}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`user/${user.id}`}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Link to="user">
                    <Button variant="contained">Create user</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default UsersListPage;
