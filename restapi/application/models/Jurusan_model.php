<?php

class Jurusan_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $kd_jurusan = $id['kd_jurusan'];
            $result = $this->db->query("
                SELECT
                    `jurusan`.*,
                    `pegawai`.`nm_pegawai`
                FROM
                    `jurusan`
                    LEFT JOIN `pegawai` ON `jurusan`.`nip` = `pegawai`.`nip`
                WHERE jurusan.kd_jurusan = '$kd_jurusan'
            ");
        return $result->result_array();
        }
        else{
            $result = $this->db->query("
                SELECT
                    `jurusan`.*,
                    `pegawai`.`nm_pegawai`
                FROM
                    `jurusan`
                    LEFT JOIN `pegawai` ON `jurusan`.`nip` = `pegawai`.`nip`
            ");
        return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('jurusan', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("kd_jurusan", $data->kd_jurusan);
        $result =  $this->db->update("jurusan", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('kd_jurusan', $id['kd_jurusan']);
        $result = $this->db->delete('jurusan');
        return $result;
    }
    
}
