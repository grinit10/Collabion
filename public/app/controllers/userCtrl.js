angular.module('UserController',['userServices'])
    .controller('RegistrationCtrl',function ($http,$location,$timeout,User) {
        var ctrl = this;
        ctrl.showLoading = false;
        this.regUser = function () {
            ctrl.showLoading = true;
            User.create(ctrl.regData).then(
                function (obj) {
                    ctrl.showLoading = false;
                    ctrl.errorMessage = false;
                    ctrl.successMessage = false;
                    if(obj.data.success){
                        ctrl.successMessage = obj.data.message + "...Redirecting";
                        $timeout(function () {
                            $location.path("/");
                        },2000);
                    }
                    else{
                        ctrl.errorMessage = obj.data.message;
                    }
                }
            )
        }
    }
);