<?php

class Mahasiswa_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $npm = $id['npm'];
            $result = $this->db->query("
                SELECT
                    `mahasiswa`.*,
                    `jurusan`.`nm_jurusan`
                FROM
                    `mahasiswa`
                    LEFT JOIN `jurusan` ON `mahasiswa`.`kd_jurusan` = `jurusan`.`kd_jurusan`
                WHERE mahasiswa.npm = '$npm'
            ");
            return $result->result_array();
        }
        else {
            $result = $this->db->query("
                SELECT
                    `mahasiswa`.*,
                    `jurusan`.`nm_jurusan`
                FROM
                    `mahasiswa`
                    LEFT JOIN `jurusan` ON `mahasiswa`.`kd_jurusan` = `jurusan`.`kd_jurusan`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('mahasiswa', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("npm", $data->npm);
        $result =  $this->db->update("mahasiswa", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('npm', $id['npm']);
        $result = $this->db->delete('mahasiswa');
        return $result;
    }
    
}
