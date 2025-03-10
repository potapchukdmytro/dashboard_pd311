import axios from "axios";

export const loadRoles = () => async (dispatch) => {
    const response = await axios.get("https://localhost:7223/api/role/list");

    if(response.status === 200) {
        return dispatch({type: "ROLES_LOAD", payload: response.data});
    }
    return dispatch({type: "ERROR" });
};

export const createRole = (roleName) => {
    const localData = localStorage.getItem('roles');
    let id = 1;
    let roles = [];
    if(localData) {
        roles = JSON.parse(localData);
        id = roles[roles.length - 1].id + 1;
    }

    if(roles.indexOf(r => r.name === roleName.toLowerCase()) !== -1) {
        return {type: "ERROR", payload: `Role ${roleName} already exists`};
    }

    const role = {
        id: id,
        name: roleName
    }

    roles.push(role);
    localStorage.setItem('roles', JSON.stringify(roles));
    return {type: "ROLE_CREATE", payload: roles};
}

export const deleteRole = (id) => {
    const localData = localStorage.getItem('roles');

    if(localData) {
        const rolesData = JSON.parse(localData);
        const roles = rolesData.filter((r) => r.id !== id);
        localStorage.setItem('roles', JSON.stringify(roles));
        return {type: "ROLE_DELETE", payload: roles};
    }

    return {type: "ERROR", payload: `Role ${id} not found`};
}

export const updateRole = (role) => {
    const localData = localStorage.getItem('roles');
    if(localData) {
        const roles = JSON.parse(localData);
        const index = roles.findIndex((r) => r.id.toString() === role.id.toString());
        if(index === -1) {
            return {type: "ERROR", payload: `Role id ${role.id} not found`};
        }

        roles[index] = {...role};
        localStorage.setItem('roles', JSON.stringify(roles));
        return {type: "ROLE_UPDATE", payload: roles};
    }

    return {type: "ERROR", payload: `Role ${role} not found`};
}