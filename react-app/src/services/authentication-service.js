
const login = () => {};
const logout = () => {};
const isAuthenticated = () => {
    console.log(GRA.localdb.getByKey(USER_AUTH_INFO));
    return !!GRA.localdb.getByKey(USER_AUTH_INFO)
};


export const authenticationService = {
    login,
    logout,
    isAuthenticated,
};