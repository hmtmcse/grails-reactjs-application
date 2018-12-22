package com.hmtmcse.gra


class AppInitService {

    def initUser() {
        if (User.count() == 0) {
            User user = new User()
            user.firstName = "Touhid"
            user.lastName = "Mia"
            user.email = "admin@gra.local"
            user.password = "123456"
            user.save(flash: true)

            for (int i = 1; i < 100; i++){
                user = new User()
                user.firstName = "Touhid-" + i
                user.lastName = "Mia-" + i
                user.email = "admin-${i}@gra.local"
                user.password = "123456"
                user.save(flash: true)
            }


            return user
        }
    }

    def swaggerConfig(){

    }
}
