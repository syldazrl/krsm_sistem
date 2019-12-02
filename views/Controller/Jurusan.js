(function (angular) {
    'use strict'
    angular.module("Jurusan", [])

        //controller Jurusan
        .controller("JurusanController", function ($scope, $http) {
            $scope.DatasJurusan = [];
            $scope.input = {};
            $scope.DatasPegawai = [];
            $scope.SelectedPegawai = {};
            $scope.status = "Simpan";
            $http({
                method: "get",
                url: "http://localhost/krsm_sistem/restapi/Jurusan/Panggil",
                header: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                $scope.DatasJurusan = response.data.data;
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

            $scope.Simpan = function () {
                if ($scope.status == "Simpan") {
                    $scope.input.nip = $scope.SelectedPegawai.nip;
                    $http({
                        method: "POST",
                        url: "http://localhost/krsm_sistem/restapi/Jurusan/Tambah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.input.nm_pegawai = $scope.SelectedPegawai.nm_pegawai;
                        $scope.DatasJurusan.push(angular.copy($scope.input));
                        alert("Data Berhasil disimpan");
                    }, function (error) {
                        alert("Data gagal disimpan");
                    })
                } else {
                    $scope.input.nm_pegawai = $scope.SelectedPegawai.nm_pegawai;
                    delete $scope.input.nm_pegawai;
                    $http({
                        method: "PUT",
                        url: "http://localhost/krsm_sistem/restapi/Jurusan/Ubah",
                        data: $scope.input,
                        header: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        $scope.input.nm_pegawai = $scope.SelectedPegawai.nm_pegawai;
                        alert("Data berhasil diubah");
                    }, function (error) {
                        alert("Data gagal diubah");
                    })
                }
            }
            $scope.Hapus = function (item) {
                $http({
                    method: "DELETE",
                    url: "http://localhost/krsm_sistem/restapi/Jurusan/Hapus?kd_jurusan=" + item.kd_jurusan,
                }).then(function (response) {
                    var index = $scope.DatasJurusan.indexOf(item);
                    $scope.DatasJurusan.splice(index, 1);
                    alert("Data Berhasil Dihapus");
                    $scope.DatasJurusan.push($scope.input);
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