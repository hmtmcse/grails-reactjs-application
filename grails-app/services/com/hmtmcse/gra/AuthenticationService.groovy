package com.hmtmcse.gra


class AuthenticationService {

    boolean isAuthenticated(){
        def authorization = AppUtil.getAppSession()[GraConstant.AUTHORIZED]
        if (authorization && authorization.isLoggedIn){
            return true
        }
        return false
    }
}
