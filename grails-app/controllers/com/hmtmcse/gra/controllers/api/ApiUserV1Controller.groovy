package com.hmtmcse.gra.controllers.api

import com.hmtmcse.gra.AuthenticationDefinitionService
import com.hmtmcse.gra.UserDefinitionService
import com.hmtmcse.gs.GsRestProcessor

class ApiUserV1Controller extends GsRestProcessor {

    UserDefinitionService userDefinitionService

    def getList() {
        return list(userDefinitionService.list())
    }

    def postList() {
        return list(userDefinitionService.list())
    }

    def getDetails() {
        return details(userDefinitionService.list())
    }

    def postCreate() {
        return create(userDefinitionService.create())
    }

    def postUpdate() {
        return list(userDefinitionService.list())
    }

    def deleteDelete() {
        return list(userDefinitionService.list())
    }


}
