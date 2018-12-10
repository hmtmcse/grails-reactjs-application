package com.hmtmcse.gra.system

import com.hmtmcse.gra.AuthenticationService


class SecurityInterceptor {

    AuthenticationService authenticationService

    SecurityInterceptor() {
        matchAll()
                .excludes(controller: "apiAuthentication")
                .excludes(controller: "reactJs")
    }

    boolean before() {
        return true
        if (!authenticationService.isAuthenticated()) {
            redirect(controller: "reactJs", action:"index")
            return false
        }
        return true
    }


    boolean after() { true }

    void afterView() {
        // no-op
    }
}