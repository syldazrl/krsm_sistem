<?php

class Pengampu_Model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('id_pengampu', $id['id_pengampu']);
            $result = $this->db->get('pengampu');
            return $result->result_array();
        }
        else {
            $result = $this->db->query("
            SELECT
                *
                FROM
                `pengampu`
                INNER JOIN `matakuliah` ON `matakuliah`.`kmk` = `pengampu`.`kmk`
                INNER JOIN `thn_akademik` ON `thn_akademik`.`Id_thn_akademik` =
                `pengampu`.`Id_thn_akademik`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('pengampu', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("id_pengampu", $data->nip);
        $result =  $this->db->update("pengampu", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('id_pengampu', $id['id_pengampu']);
        $result = $this->db->delete('pengampu');
        return $result;
    }
}
 