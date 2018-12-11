package com.hmtmcse.gra

import com.hmtmcse.gs.GsApiActionDefinition


class UserDefinitionService {

    GsApiActionDefinition list(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.includeAllThenExcludeFromResponse(["password", "version"])
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition

    }
}
