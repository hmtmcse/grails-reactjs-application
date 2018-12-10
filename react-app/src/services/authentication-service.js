
const login = () => {};
const logout = () => {};
const isAuthenticated = () => {
    return true //!!GRA.localdb.getByKey(USER_AUTH_INFO)
};


export const authenticationService = {
    login,
    logout,
    isAuthenticated,
};