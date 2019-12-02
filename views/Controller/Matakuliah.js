(function (angular) {
    'use strict'
    angular.module("Matakuliah", [])
        //controller Matakuliah
        .controller("MatakuliahController", function ($scope, $http) {
            $scope.DatasMatakuliah = [];
            $scope.input = {};
            ["car", "cricket", "metro"];
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krs_sistem/restapi/Matakuliah/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasMatakuliah = response.data.data;
            }, function (error) {
                alert(error.message);
            })

            $scope.Simpan = function () {
                if ($scope.status == "Simpan") {
                    $http({
                        method: "POST",
                        url: "http://localhost/krs_sistem/restapi/Matakuliah/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.DatasMatakuliah.push(angular.copy($scope.input));
                        alert("Data berhasil disimpan");
                    }, function (error) {
                        alert("Data gagal disimpan");
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krs_sistem/restapi/Matakuliah/Ubah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        alert("Data berhasil diubah");
                    }, function (error) {
                        alert("Data gagal diubah");
                    })
                }
            }
            $scope.Hapus = function (item) {
                $http({
                    method: "DELETE",
                    url: "http://localhost/krs_sistem/restapi/Matakuliah/Hapus?kmk=" + item.kmk,
                }).then(function (response) {
                    var index = $scope.DatasMatakuliah.indexOf(item);
                    $scope.DatasMatakuliah.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasMatakuliah.push($scope.input);
                }, function (error) {
                    alert("Data Gagal Dihapus");
                })
            }

            $scope.GetData = function (item) {
                $scope.input = item;
                $scope.status = "Update";
            }
            $scope.GetSimpan = function (item) {
                $scope.input = {};
                $scope.status = "Simpan";
            }
        })

    })(window.angular);