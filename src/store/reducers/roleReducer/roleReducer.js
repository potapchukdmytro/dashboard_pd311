const roleState = {
    roles: [],
    isLoaded: false,
    count: 0
}

const roleReducer = (state = roleState, action) => {
    switch (action.type) {
        case "ROLES_LOAD":
            return {...state, roles: action.payload, count: action.payload.length, isLoaded: true}
        case "ROLE_CREATE":
            return { ...state, roles: action.payload, count: state.count + 1 };
        case "ROLE_UPDATE":
            return { ...state, roles: action.payload };
        case "ROLE_DELETE":
            return { ...state, roles: action.payload, count: state.count - 1 };
        default:
            return state;
    }
}

export default roleReducer;