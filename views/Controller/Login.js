(function (angular) {
    'use strict'
    angular.module("Login", [])
        .controller("UserController", function ($scope, $http, $window) {
            $scope.input = {};
            $scope.Login = function () {
                var Url = "http://localhost/krs_sistem/restapi/User?username=" + $scope.input.username + "&password=" + $scope.input.password;
                $http({
                    method: "get",
                    url: Url
                }).then(function (response) {
                    alert("Sukses Login");
                    $window.sessionStorage.setItem("username", response.data.data.data.username);
                    $window.sessionStorage.setItem("nama", response.data.data.data.nama);
                    window.location.href = "index.html"
                }, function (error) {s
                    alert("Gagal Login");
                    $window.sessionStorage.setItem("username", response.data.data.data.username);
                    $window.sessionStorage.setItem("nama", response.data.data.data.nama);
                })
            }
        })

})(window.angular);