
import {Constant} from './../components/system/app-constant';

const login = () => {};
const logout = () => {};
const isAuthenticated = () => {
    return !!localStorage.getItem(Constant.USER_AUTH_INFO)
};


export const authenticationService = {
    login,
    logout,
    isAuthenticated,
};