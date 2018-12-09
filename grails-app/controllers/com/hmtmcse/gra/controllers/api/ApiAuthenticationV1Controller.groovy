package com.hmtmcse.gra.controllers.api

import com.hmtmcse.gra.AuthenticationDefinitionService
import com.hmtmcse.gs.GsRestProcessor

class ApiAuthenticationV1Controller extends GsRestProcessor {

    AuthenticationDefinitionService authenticationDefinitionService

    def postLogin() {
        return customProcessor(authenticationDefinitionService.login())
    }

    def getLogout() {
        return customProcessor(authenticationDefinitionService.logout())
    }
}
