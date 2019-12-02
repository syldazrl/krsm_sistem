<?php

class DosenWali_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('nip', $id['nip']);
            $result = $this->db->get('dosen_wali');
            return $result->result_array();
        }
        else {
            $result = $this->db->query("
                SELECT
                    pegawai.nip, pegawai.nm_pegawai, mahasiswa.npm, mahasiswa.nm_mahasiswa, pegawai.jabatan
                FROM
                    `dosen_wali`
                    LEFT JOIN `pegawai` ON `dosen_wali`.`nip` = `pegawai`.`nip`
                    LEFT JOIN `mahasiswa` ON `dosen_wali`.npm = `mahasiswa`.`npm`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->insert("dosen_wali", $data);
        $result = $this->db->query("
            SELECT
                pegawai.nip, pegawai.nm_pegawai, mahasiswa.npm, mahasiswa.nm_mahasiswa
            FROM
                `dosen_wali`
                LEFT JOIN `pegawai` ON `dosen_wali`.`nip` = `pegawai`.`nip`
                LEFT JOIN `mahasiswa` ON `dosen_wali`.npm = `mahasiswa`.`npm`
            WHERE
                dosen_wali.nip = '$data->nip' and
                dosen_wali.npm = '$data->npm'
        ");
        return $result->result_array();
    }

    public function update($data){
        $this->db->where("npm", $data->npm);
        $result =  $this->db->update("dosen_wali", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('npm', $id['npm']);
        $result = $this->db->delete('dosen_wali');
        return $result;
    }
}
