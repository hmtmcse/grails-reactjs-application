import {RaUrlUtil} from "../artifacts/ra-url-util";
import {AppConstant} from "../app/app-constant";

const login = (loginData) => {
    GRA.localdb.addAsJSONString(USER_AUTH_INFO, loginData)
};
const logout = () => {
    GRA.localdb.remove(USER_AUTH_INFO)
    RaUrlUtil.redirectTo(AppConstant.loginUrl);
};

const isAuthenticated = () => {
    return !!GRA.localdb.getByKey(USER_AUTH_INFO)
};


export const AuthenticationService = {
    login,
    logout,
    isAuthenticated,
};