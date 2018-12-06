package com.hmtmcse.gra


class AppInitService {

    def user() {
        if (User.count() == 0) {
            User user = new User()
            user.firstName = "Touhid"
            user.lastName = "Mia"
            user.email = "admin@gra.local"
            user.password = "123456"
            user.save(flash: true)
            return user
        }
    }

    def swaggerConfig(){

    }
}
