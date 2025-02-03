import * as authActions from "../reducers/authReducer/actions";
import * as usersActions from "../reducers/userReducer/actions";
import * as themeActions from "../reducers/themeReducer/actions";

const actionCreator = {
    ...authActions,
    ...usersActions,
    ...themeActions
};

export default actionCreator;