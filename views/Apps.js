(function (angular) {
    'use strict'
    angular.module("MyApp", ["MyController", "ngAnimate", "ui.router"])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("Home");
            $stateProvider
                .state("Home", {
                    url: "/Home",
                    templateUrl: "views/pages/Home.html",
                    controller: "HomeController"
                })
                .state("Mahasiswa", {
                    url: "/Mahasiswa",
                    templateUrl: "views/pages/Mahasiswa.html",
                    controller: "MahasiswaController"
                })
                .state("Matakuliah", {
                    url: "/Matakuliah",
                    templateUrl: "views/pages/Matakuliah.html",
                    controller: "MatakuliahController"
                })
                .state("Jurusan", {
                    url: "/Jurusan",
                    templateUrl: "views/pages/Jurusan.html",
                    controller: "JurusanController"
                })
                .state("Pegawai", {
                    url: "/Pegawai",
                    templateUrl: "views/pages/Pegawai.html",
                    controller: "PegawaiController"
                })
                .state("Thn_akademik", {
                    url: "/Thn_akademik",
                    templateUrl: "views/pages/Thn_akademik.html",
                    controller: "ThnAkademikController"
                })
                .state("DosenWali", {
                    url: "/DosenWali",
                    templateUrl: "views/pages/DosenWali.html",
                    controller: "DosenWaliController"
                })
                .state("Krs", {
                    url: "/Krs",
                    templateUrl: "views/pages/Krs.html",
                    controller: "KrsController"
                });
        })
        
        .controller("view", function($scope, $window){
            if($window.sessionStorage.getItem("username")==undefined || $window.sessionStorage.getItem("username")=="" || $window.sessionStorage.getItem("username")==null){
                window.location.href="login.html";
            }
            $scope.Logout= function(){
                sessionStorage.clear();
                window.location.href="index.html";
            }
        })
})(window.angular);
