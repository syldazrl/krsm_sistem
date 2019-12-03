<?php

class Matakul_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $id_pengampu = $id['id_pengampu'];
            $result = $this->db->query("
                SELECT
                    `matakuliah`.`kmk`,
                    `matakuliah`.`nm_matakul`,
                    `matakuliah`.`sks`,
                    `matakuliah`.`semester`,
                    `pengampu`.`id_pengampu`,
                    `pengampu`.`nip`,
                    `pengampu`.`kelas`,
                    `thn_akademik`.`Id_thn_akademik`,
                    `thn_akademik`.`thn_ajaran`
                FROM
                    `pengampu`
                        LEFT JOIN `thn_akademik` ON `thn_akademik`.`Id_thn_akademik` = `pengampu`.`Id_thn_akademik`
                        LEFT JOIN `matakuliah` ON `pengampu`.`kmk` = `matakuliah`.`kmk`
                WHERE
                    `thn_akademik`.`status` = 'AKTIF'
                ");
            return $result->result_array();
        }
        else {
            $result = $this->db->query("
                SELECT
                    `matakuliah`.`kmk`,
                    `matakuliah`.`nm_matakul`,
                    `matakuliah`.`sks`,
                    `matakuliah`.`semester`,
                    `pengampu`.`id_pengampu`,
                    `pengampu`.`nip`,
                    `pengampu`.`kelas`,
                    `thn_akademik`.`Id_thn_akademik`,
                    `thn_akademik`.`thn_ajaran`
                FROM
                    `pengampu`
                        LEFT JOIN `thn_akademik` ON `thn_akademik`.`Id_thn_akademik` = `pengampu`.`Id_thn_akademik`
                        LEFT JOIN `matakuliah` ON `pengampu`.`kmk` = `matakuliah`.`kmk`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('pengampu', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("id_pengampu", $data->pengampu);
        $result =  $this->db->update("pengampu", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('id_pengampu', $id['id_pengampu']);
        $result = $this->db->delete('pengampu');
        return $result;
    }
    
}
