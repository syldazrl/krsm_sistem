(function (angular) {
    'use strict'
    angular.module("DosenWali", [])
        //controller Dosen Wali
        .controller("DosenWaliController", function ($scope, $http) {
            $scope.DatasDosenWali = [];
            $scope.DatasPegawai = [];
            $scope.SelectedPegawai = {};
            $scope.DatasMahasiswa = [];
            $scope.SelectedMahasiswa = {};
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/DosenWali/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasDosenWali = response.data.data;
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
                url: "http://localhost/krsm_sistem/restapi/Mahasiswa/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasMahasiswa = response.data.data;
            })

            $scope.Simpan = function () {
                $scope.input = {};
                $scope.input.nip = $scope.SelectedPegawai.nip;
                $scope.input.npm = $scope.SelectedMahasiswa.npm;
                if ($scope.status == "Simpan") {
                    $scope.input.nip = $scope.SelectedPegawai.nip;
                    $scope.input.npm = $scope.SelectedMahasiswa.npm;
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/DosenWali/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.input.nip = $scope.SelectedPegawai.nip;
                        $scope.input.npm = $scope.SelectedMahasiswa.npm;
                        $scope.input.jabatan = $scope.SelectedPegawai.jabatan;
                        $scope.DatasDosenWali.push(response.data.data[0]);
                        alert("Data Berhasil disimpan");
                    }, function (error) {
                        console.log(error.message);
                        alert("Data gagal disimpan");
                    })
                } else {
                    $http({
                        method: "PUT",
                        url: "http://localhost/krsm_sistem/restapi/DosenWali/Ubah",
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
                    url: "http://localhost/krsm_sistem/restapi/DosenWali/Hapus?IdDosenWali=" + item.IdDosenWali,
                }).then(function (response) {
                    var index = $scope.DatasDosenWali.indexOf(item);
                    $scope.DatasDosenWali.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasDosenWali.push($scope.input);
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
                angular.forEach($scope.DatasMahasiswa, function (value, key) {
                    if (value.npm == item.npm) {
                        $scope.SelectedMahasiswa = value;
                    }
                })
            }

            $scope.GetSimpan = function (item) {
                $scope.status = "Simpan";
            }
        })

})(window.angular);