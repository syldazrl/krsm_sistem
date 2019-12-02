(function (angular) {
    'use strict'
    angular.module("Pengampu", [])
        //Controller Pengampu
        .controller("PengampuController", function ($scope, $http) {
            // $scope.DatasDosenWali = [];
            $scope.DatasPengampu = [];
            $scope.DatasPegawai = [];
            $scope.SelectedPegawai={};
            $scope.DatasMatakuliah = [];
            $scope.DatasThnAkademik = [];
            $scope.SelectedThnAkademik={};
            $scope.DatasKelas=[{"kelas":"A"},{"kelas":"B"},{"kelas":"C"}];
            $scope.Serach="";
            $scope.Input={};
            var a = $scope.SelectedPegawai.valueOf.length;
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krs_sistem/restapi/Pegawai/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPegawai = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krs_sistem/restapi/Matakuliah/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasMatakuliah = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krs_sistem/restapi/Thn_akademik/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasThnAkademik = response.data.data;
            })

            $scope.SetData = function(){
                $scope.SelectedPegawai={};
                angular.forEach($scope.DatasPegawai, function(value, key){
                    if(value.nip == $scope.Serach){
                        $scope.SelectedPegawai = value;
                    }
                })
                if($scope.SelectedPegawai.length==0){
                    $scope.SelectedPegawai = {};
                }
            }

            $scope.Simpan = function () {
                $scope.input = {};
                $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                $scope.input.nip = $scope.SelectedPegawai.nip;
                $scope.input.thn_ajaran = $scope.SelectedThnAkademik.thn_ajaran;
                if ($scope.status == "Simpan") {
                    $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                    $scope.input.nip = $scope.SelectedPegawai.nip;
                    $scope.input.thn_ajaran = $scope.SelectedThnAkademik.thn_ajaran;
                    $http({
                        method: "POST",
                        url: "http://localhost/krs_sistem/restapi/Pengampu/Tambah",
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
                        url: "http://localhost/krs_sistem/restapi/Pengampu/Ubah",
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
                    url: "http://localhost/krs_sistem/restapi/Pengampu/Hapus?id_pengampu=" + item.id_pengampu,
                }).then(function (response) {
                    var index = $scope.DatasPengampu.indexOf(item);
                    $scope.DatasPengampu.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasPengampu.push($scope.input);
                }, function (error) {
                    alert("Data Gagal Dihapus");
                })
            }

            $scope.GetData = function (item) {
                $scope.input = item;
                $scope.status = "Update";
                angular.forEach($scope.DatasPengampu, function (value, key) {
                    if (value.id_pengampu == item.id_pengampu) {
                        $scope.SelectedPengampu = value;
                    }
                })
                angular.forEach($scope.DatasPegawai, function (value, key) {
                    if (value.nip == item.nip) {
                        $scope.SelectedPegawai = value;
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