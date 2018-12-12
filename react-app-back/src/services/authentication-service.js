
const login = (loginData) => {
    GRA.localdb.addAsJSONString(USER_AUTH_INFO, loginData)
};
const logout = () => {
    GRA.localdb.remove(USER_AUTH_INFO)
};

const isAuthenticated = () => {
    return !!GRA.localdb.getByKey(USER_AUTH_INFO)
};


export const authenticationService = {
    login,
    logout,
    isAuthenticated,
};