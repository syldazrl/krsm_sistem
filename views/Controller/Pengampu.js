(function (angular) {
    'use strict'
    angular.module("Pengampu", [])
        //controller Dosen Wali
        .controller("PengampuController", function ($scope, $http) {
            $scope.DatasPengampu = [];
            $scope.DatasPegawai = [];
            $scope.SelectedPegawai = {};
            $scope.DatasMatakuliah = [];
            $scope.SelectedMatakuliah = {};
            $scope.DatasThnakademik = [];
            $scope.SelectedThnakademik = {};
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/DatasPengampu/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPengampu = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Pegawai/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPegawai = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Thnakademik/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasThnakademik = response.data.data;
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

            $scope.Simpan = function () {
                $scope.input = {};
                $scope.input.nip = $scope.SelectedPegawai.nip;
                $scope.input.npm = $scope.SelectedMatakuliah.kmk;
                $scope.input.npm = $scope.SelectedThnakademik.kmk;
                if ($scope.status == "Simpan") {    
                    $scope.input.nip = $scope.SelectedPegawai.nip;
                    $scope.input.npm = $scope.SelectedMatakuliah.kmk;
                    $scope.input.npm = $scope.SelectedThnakademik.kmk;
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Pengampu/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.DatasPengampu.push(response.data.data[0]);
                        alert("Data Berhasil disimpan");
                    }, function (error) {
                        console.log(error.message);
                        alert("Data gagal disimpan");
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krsm_sistem/restapi/Pengampu/Ubah",
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
                    url: "http://localhost/krsm_sistem/restapi/Pengampu/Hapus?id_thn_akademik=" + item.id_thn_akademik,
                }).then(function (response) {
                    var index = $scope.DatasPengampu.indexOf(item);
                    $scope.DatasDosenWali.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasPengampu.push($scope.input);
                }, function (error) {
                    alert("Data Gagal Dihapus");
                })
            }

            $scope.GetData = function (item) {
                $scope.input = item;
                $scope.status = "Update";
                angular.forEach($scope.DatasPegawai, function (value, key) {
                    if (value.nip == item.nip) {
                        $scope.SelectedPegawai = value;
                    }
                })
                angular.forEach($scope.DatasMatakuliah, function (value, key) {
                    if (value.kmk == item.kmk) {
                        $scope.SelectedMahasiswa = value;
                    }
                })
                angular.forEach($scope.DatasThnakademik, function (value, key) {
                    if (value.id_thn_akademik == item.id_thn_akademik) {
                        $scope.SelectedMahasiswa = value;
                    }
                })
            }

            $scope.GetSimpan = function (item) {
                $scope.status = "Simpan";
            }
        })

})(window.angular);