<?php

class Krs_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('id_krs', $id['id_krs']);
            $result = $this->db->get('krs');
            return $result->result_array();
        }
        else {
            $result = $this->db->query("
            SELECT
            `krs`.*,
                thn_akademik.thn_ajaran,
                matakuliah.kmk, matakuliah.nm_matakul, 
                mahasiswa.npm, mahasiswa.nm_mahasiswa
            FROM
                `krs`
                INNER JOIN `thn_akademik` ON `thn_akademik`.`thn_ajaran` = `krs`.`thn_ajaran`
                INNER JOIN `matakuliah` ON `matakuliah`.`kmk` = `krs`.`kmk`
                INNER JOIN `mahasiswa` ON `mahasiswa`.`npm` = `krs`.`npm`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->insert("krs", $data);
        $result = $this->db->query("
            SELECT
                'krs'.*,
                thn_akademik.thn_ajaran,
                matakuliah.kmk, matakuliah.nm_matakul, 
                mahasiswa.npm, mahasiswa.nm_mahasiswa
            FROM
                `krs`
                INNER JOIN `thn_akademik` ON `thn_akademik`.`thn_ajaran` = `krs`.`thn_ajaran`
                INNER JOIN `matakuliah` ON `matakuliah`.`kmk` = `krs`.`kmk`
                INNER JOIN `mahasiswa` ON `mahasiswa`.`npm` = `krs`.`npm`
            WHERE
                krs.kmk = '$data->kmk' and
                krs.npm = '$data->npm' and
                krs.thn_ajaran = '$data->thn_ajaran'
        ");
        return $result->result_array();
    }

    public function update($data){
        $this->db->where("id_krs", $data->npm);
        $result =  $this->db->update("krs", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('id_krs', $id['id_krs']);
        $result = $this->db->delete('krs');
        return $result;
    }
}
