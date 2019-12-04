(function (angular) {
    'use strict'
    angular.module("Pengampu", [])
        //Controller Pengampu
        .controller("PengampuController", function ($scope, $http) {
            // $scope.DatasDosenWali = [];
            $scope.DatasPengampu = [];
            $scope.Dataskelas=[{"kelas":"A"},{"kelas":"B"}];
            $scope.DatasPegawai = [];
            $scope.SelectedPegawai={};
            $scope.DatasMatakuliah = [];
            $scope.DatasThnAkademik = [];
            $scope.SelectedThnAkademik={};
            $scope.input={};
            $scope.Serach="";
            
           
            var a = $scope.SelectedPegawai.valueOf.length;
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Pengampu/Panggil",
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
                $scope.input.Id_thn_akademik = $scope.SelectedThnAkademik.Id_thn_akademik;
                if ($scope.status == "Simpan") {
                    
                    $scope.input.kmk = $scope.SelectedMatakuliah.kmk;
                    $scope.input.nip = $scope.SelectedPegawai.nip;
                    $scope.input.Id_thn_akademik = $scope.SelectedThnAkademik.Id_thn_akademik;
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Pengampu/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.DatasPengampu.push(angular.copy($scope.input));
                        alert("Data Berhasil disimpan");
                    }, function (error) {
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
                    url: "http://localhost/krsm_sistem/restapi/Pengampu/Hapus?id_pengampu=" + item.id_pengampu,
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
                    if (value.Id_thn_akademik == item.Id_thn_akademik) {
                        $scope.SelectedThnAkademik = value;
                    }
                })
            }

            $scope.GetSimpan = function (item) {
                $scope.status = "Simpan";
            }
        })
})(window.angular);