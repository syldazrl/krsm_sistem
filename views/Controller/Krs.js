(function (angular) {
    'use strict'
    angular.module("Krs", [])
        //Controller Krs
        .controller("KrsController", function ($scope, $http) {
            // $scope.DatasDosenWali = [];
            $scope.DatasKrs = [];
            $scope.DatasPegawai = [];
            $scope.DatasMatakuliah = [];
            $scope.DatasMahasiswa = [];
            $scope.DatasThnAkademik = [];
            $scope.SelectedMahasiswa={};
            $scope.Serach="";
            $scope.Input={};
            var a = $scope.SelectedMahasiswa.valueOf.length;
            $scope.status = "Simpan";
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
                url: "http://localhost/krsm_sistem/restapi/Mahasiswa/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasMahasiswa = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Matakuliah/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasMatakuliah = response.data.data;
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

            $scope.SetData = function(){
                $scope.SelectedMahasiswa={};
                angular.forEach($scope.DatasMahasiswa, function(value, key){
                    if(value.npm == $scope.Serach){
                        $scope.SelectedMahasiswa = value;
                    }
                })
                if($scope.SelectedMahasiswa.length==0){
                    $scope.SelectedMahasiswa = {};
                }
            }

            $scope.Simpan = function () {
                $scope.input = {};
                $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                $scope.input.npm = $scope.SelectedMahasiswa.npm;
                $scope.input.thn_ajaran = $scope.SelectedThnAkademik.thn_ajaran;
                if ($scope.status == "Simpan") {
                    $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                    $scope.input.npm = $scope.SelectedMahasiswa.npm;
                    $scope.input.thn_ajaran = $scope.SelectedThnAkademik.thn_ajaran;
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Krs/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.DatasKrs.push(response.data.data[0]);
                        alert("Data Berhasil disimpan");
                    }, function (error) {
                        console.log(error.message);
                        alert("Data gagal disimpan");
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krsm_sistem/restapi/Krs/Ubah",
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
                    url: "http://localhost/krsm_sistem/restapi/Krs/Hapus?id_krs=" + item.id_krs,
                }).then(function (response) {
                    var index = $scope.DatasKrs.indexOf(item);
                    $scope.DatasKrs.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasKrs.push($scope.input);
                }, function (error) {
                    alert("Data Gagal Dihapus");
                })
            }

            $scope.GetData = function (item) {
                $scope.input = item;
                $scope.status = "Update";
                angular.forEach($scope.DatasKrs, function (value, key) {
                    if (value.id_krs == item.id_krs) {
                        $scope.SelectedKrs = value;
                    }
                })
                angular.forEach($scope.DatasMahasiswa, function (value, key) {
                    if (value.npm == item.npm) {
                        $scope.SelectedMahasiswa = value;
                    }
                })
                angular.forEach($scope.DatasMatakuliah, function (value, key) {
                    if (value.kmk == item.kmk) {
                        $scope.SelectedMatakuliah = value;
                    }
                })
                angular.forEach($scope.DatasThnAkademik, function (value, key) {
                    if (value.thn_ajaran == item.thn_ajaran) {
                        $scope.SelectedThnAkademik = value;
                    }
                })
            }

            $scope.GetSimpan = function (item) {
                $scope.status = "Simpan";
            }
        })
})(window.angular);