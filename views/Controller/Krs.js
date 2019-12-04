(function (angular) {
    'use strict'
    angular.module("Krs", [])
        //Controller Krs
        .controller("KrsController", function ($scope, $http) {
            // $scope.DatasDosenWali = [];
            $scope.DatasKrs = [];
            $scope.DatasPegawai = [];
            $scope.DatasPengampu = [];
            $scope.DatasMahasiswa = [];
            $scope.DatasThnAkademik = [];
            $scope.SelectedPegawai = {};
            $scope.SelectedMahasiswa = {};
            $scope.TampilMatakuliah=false;
            $scope.Serach = "";
            $scope.Input = {};
            var a = $scope.SelectedMahasiswa.valueOf.length;
            $scope.status = "Simpan";
            // $http({
            //     method: "get",
            //     url: "http://localhost/krsm_sistem/restapi/Krs/Panggil",
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }).then(function (response) {
            //     $scope.DatasKrs = response.data.data;
            // }, error => {
            //     console.log(error.data);
            // });

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
                url: "http://localhost/krsm_sistem/restapi/Pegawai/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPegawai = response.data.data;
            })

            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Matakul/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasPengampu = response.data.data;
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

            $scope.SetData = function () {
                $scope.SelectedMahasiswa = {};
                $scope.TampilMatakuliah=false;
                angular.forEach($scope.DatasMahasiswa, function (value, key) {
                    if (value.npm == $scope.Serach) {
                        $scope.SelectedMahasiswa = value;
                        $scope.TampilMatakuliah=true;
                    }
                })
                // if ($scope.SelectedMahasiswa.length == 0) {
                //     $scope.SelectedMahasiswa = {};
                    
                // }
            }

            $scope.Simpan = function () {
                $scope.input = {};
                $scope.DatasKrs=[];
                var thn;
                angular.forEach($scope.DatasPengampu, function(value, key){
                    if(value.Checked==true){
                        $scope.DatasKrs.push(angular.copy(value));
                    }
                });
                angular.forEach($scope.DatasThnAkademik, function(value, key){
                    if(value.status=="AKTIF"){
                        thn = value.Id_thn_akademik;
                    }
                });
                $scope.input.detail_krs = $scope.DatasKrs;
                $scope.input.npm = $scope.SelectedMahasiswa.npm;
                $scope.input.Id_thn_akademik = thn;
                $scope.input.dosen_wali = $scope.SelectedMahasiswa.dosen_wali;
                if ($scope.status == "Simpan") {
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Krs/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        // $scope.DatasKrs.push(response.data.data[0]);
                        alert("Data Berhasil disimpan");
                        $scope.DatasKrs=[];
                        $scope.SelectedMahasiswa={};
                        $scope.input={};
                        $scope.TampilMatakuliah=false;
                        $scope.Serach = "";
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