(function (angular) {
    'use strict'
    angular.module("Mahasiswa", [])
    .controller("MahasiswaController", function ($scope, $http) {
        $scope.DatasMahasiswa = [];
        $scope.Datasjenjang=[{"jenjang":"D3"},{"jenjang":"S1"}];
        $scope.input = {};
        $scope.DatasJurusan = [];
        $scope.SelectedJurusan = {};
        $scope.status = "Simpan";
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
            url: "http://localhost/krsm_sistem/restapi/Jurusan/Panggil",
            header: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            $scope.DatasJurusan = response.data.data;
        })

        $scope.Simpan = function () {
            if ($scope.status == "Simpan") {
                $scope.input.kd_jurusan = $scope.SelectedJurusan.kd_jurusan;
                $http({
                    method: "POST",
                    url: "http://localhost/krsm_sistem/restapi/Mahasiswa/Tambah",
                    data: $scope.input,
                    header: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    $scope.input.nm_jurusan = $scope.SelectedJurusan.nm_jurusan;
                    $scope.DatasMahasiswa.push(angular.copy($scope.input));
                    alert("Data berhasil disimpan");
                }, function (error) {
                    alert("Data gagal disimpan");
                })
            } else {
                $scope.input.kd_jurusan = $scope.SelectedJurusan.kd_jurusan;
                delete $scope.input.nm_jurusan;
                $http({
                    method: "PUT",
                    url: "http://localhost/krsm_sistem/restapi/Mahasiswa/Ubah",
                    data: $scope.input,
                    header: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    $scope.input.nm_jurusan = $scope.SelectedJurusan.nm_jurusan;
                    alert("Data berhasil diubah");
                }, function (error) {
                    alert("Data gagal diubah");
                })
            }
        }
        $scope.Hapus = function (item) {
            $http({
                method: "DELETE",
                url: "http://localhost/krs_sistem/restapi/Mahasiswa/Hapus?npm=" + item.npm,
            }).then(function (response) {
                var index = $scope.DatasMahasiswa.indexOf(item);
                $scope.DatasMahasiswa.splice(index, 1);
                alert("Data Berhasil Dihapus");
                $scope.DatasMahasiswa.push($scope.input);
            }, function (error) {
                alert("Data Gagal Dihapus");
            })
        }

        $scope.GetData = function (item) {
            $scope.input = item;
            $scope.status = "Update";
            angular.forEach($scope.DatasJurusan, function (value, key) {
                if (value.kd_jurusan == item.kd_jurusan) {
                    $scope.SelectedJurusan = value;
                }
            })
        }
        $scope.GetSimpan = function (item) {
            $scope.input = {};
            $scope.status = "Simpan";
        }
    })
        
})(window.angular);