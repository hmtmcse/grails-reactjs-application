package com.hmtmcse.gra

class BootStrap {

    AppInitService appInitService

    def init = { servletContext ->
        appInitService.initUser()
    }
    def destroy = {
    }
}
