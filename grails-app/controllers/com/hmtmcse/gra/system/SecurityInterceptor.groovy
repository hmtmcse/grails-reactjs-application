package com.hmtmcse.gra.system

import com.hmtmcse.gra.AuthenticationService


class SecurityInterceptor {

    AuthenticationService authenticationService

    SecurityInterceptor() {
        matchAll()
                .excludes(controller: "apiAuthentication")
                .excludes(controller: "authentication")
    }

    boolean before() {
        if (!authenticationService.isAuthenticated()) {
            redirect(controller: "authentication", action: "login")
            return false
        }
        return true
    }


    boolean after() { true }

    void afterView() {
        // no-op
    }
}
