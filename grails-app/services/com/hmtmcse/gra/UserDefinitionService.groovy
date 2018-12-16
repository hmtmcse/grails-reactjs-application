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
        gsApiActionDefinition.successResponseAsData()
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
                    throw new GsRequestParamException(email + " " + "The Email already exists. Please try with other Email.")
                }
                return email
            }
        }
        gsApiActionDefinition.addRequestProperty("password").required()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition

    }


    GsApiActionDefinition update(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.includeAllThenExcludeFromResponse(["password", "version"])
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition

    }
}
