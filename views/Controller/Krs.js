(function (angular) {
    'use strict'
    angular.module("Krs", [])
        .controller("KrsController", function ($scope, $http) {
            $scope.DatasKrs = [];
            $scope.DatasDetailKrs = [];
            $scope.DatasThnAkademik = [];
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Krs/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasKrs = response.data.data;
            })
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Krs/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasDetailKrs = response.data.data;
            })
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Thn_akademik/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasThnAkademik = response.data.data;
            })
        })
})(window.angular);