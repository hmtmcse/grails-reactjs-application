package com.hmtmcse.gra.controllers.api

import com.hmtmcse.gra.AuthenticationDefinitionService
import com.hmtmcse.gra.UserDefinitionService
import com.hmtmcse.gs.GsRestProcessor

class ApiUserV1Controller extends GsRestProcessor {

    UserDefinitionService userDefinitionService

    def getList() {
        return list(userDefinitionService.list())
    }

}
