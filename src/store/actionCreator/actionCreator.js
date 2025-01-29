import * as authActions from "../reducers/authReducer/actions";
import * as usersActions from "../reducers/userReducer/actions";

const actionCreator = {
    ...authActions,
    ...usersActions,
};

export default actionCreator;