(function (angular) {
    'use strict'
    angular.module("TahunAkademik", [])
        //controller Tahun Akademik
        .controller("ThnAkademikController", function ($scope, $http) {
            $scope.DatasThnAkademik = [];
            $scope.DatasStatus = [{"status":"AKTIF"},{"status":"TIDAK AKTIF"}];
            $scope.input = {};
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Thn_akademik/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasThnAkademik = response.data.data;
            }, function (error) {
                alert(error.message);
            })

            $scope.Simpan = function () {
                if ($scope.status == "Simpan") {
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Thn_akademik/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        alert(response.data.status);
                        angular.forEach($scope.DatasThnAkademik, function(value, key){
                            if(value.status=="AKTIF"){
                                value.status= "TIDAK AKTIF";
                            }
                        })
                        $scope.DatasThnAkademik.push($scope.input);
                    }, function (error) {
                        alert(error.data.status);
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krsm_sistem/restapi/Thn_akademik/Ubah",
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
                    url: "http://localhost/krsm_sistem/restapi/Thn_akademik/Hapus?Id_thn_akademik=" + item.Id_thn_akademik,
                }).then(function (response) {
                    var index = $scope.DatasThnAkademik.indexOf(item);
                    $scope.DatasThnAkademik.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasThnAkademik.push($scope.input);
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