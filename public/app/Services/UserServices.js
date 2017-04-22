angular.module("userServices",[])
        .factory("User",function ($http) {
            userFactory = {};
            userFactory.create = function (regData) {
                $http.post('/api/addUser',regData);
            }
        })