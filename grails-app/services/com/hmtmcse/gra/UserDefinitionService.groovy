package com.hmtmcse.gra

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.GsRequestParamException
import com.hmtmcse.gs.data.GsApiRequestProperty
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomRequestParamProcessor


class UserDefinitionService {

    UserService userService

    GsApiActionDefinition list(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.includeAllThenExcludeFromResponse(["password", "version"])
        gsApiActionDefinition.includeAllThenExcludeFromWhereFilter(["password", "version"])
        return gsApiActionDefinition
    }

    GsApiActionDefinition create(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("firstName").required()
        gsApiActionDefinition.addRequestProperty("lastName")
        gsApiActionDefinition.addRequestProperty("email").required().customRequestParamProcessor = new CustomRequestParamProcessor() {
            @Override
            Object process(String fieldName, GsParamsPairData gsParamsPairData, GsApiRequestProperty propertyDefinition) throws GsRequestParamException {
                String email = gsParamsPairData.params.email
                if (userService.isEmailExist(email)){
                    throw new GsRequestParamException(email + " Email already exists. Please try with other Email.")
                }
                return email
            }
        }
        gsApiActionDefinition.addRequestProperty("password").required()
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }



    GsApiActionDefinition update(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("firstName").required()
        gsApiActionDefinition.addRequestProperty("lastName")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.includeInWhereFilter(["id"])
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition delete(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.includeInWhereFilter(["id"])
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }
}
