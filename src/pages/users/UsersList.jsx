import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import usersJson from "./users";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const jsonList = localStorage.getItem("users");
        if(!jsonList) {
            localStorage.setItem("users", JSON.stringify(usersJson));
            setUsers(usersJson);
        } else {
            const list = JSON.parse(jsonList);
            setUsers(list);
        }
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">First name</TableCell>
                        <TableCell align="center">Last name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(user => (
                            <TableRow
                                key={user.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                    <TableCell align="center" component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="center">{user.firstName}</TableCell>
                                    <TableCell align="center">{user.lastName}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.password}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersList;