(function (angular) {
    'use strict'
    angular.module("Pegawai", [])
        //controller Pegawai
        .controller("PegawaiController", function ($scope, $http) {
            $scope.DatasPegawai = [];
            $scope.input = {};
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krs_sistem/restapi/Pegawai/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPegawai = response.data.data;
            }, function (error) {
                alert(error.message);
            })

            $scope.Simpan = function () {
                if ($scope.status == "Simpan") {
                    $http({
                        method: "POST",
                        url: "http://localhost/krs_sistem/restapi/Pegawai/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.DatasPegawai.push(angular.copy($scope.input));
                        alert(response.data.status);
                    }, function (error) {
                        alert(error.data.status);
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krs_sistem/restapi/Pegawai/Ubah",
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
                    url: "http://localhost/krs_sistem/restapi/Pegawai/Hapus?nip=" + item.nip,
                }).then(function (response) {
                    alert("Data Berhasil Dihapus");
                    $scope.DatasPegawai.push($scope.input);
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