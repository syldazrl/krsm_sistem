<?php

class ThnAkademik_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('Id_thn_akademik', $id['Id_thn_akademik']);
            $result = $this->db->get('thn_akademik');
            return $result->result_array();
        }
        else {
            $result = $this->db->get('thn_akademik');
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->set("status", "TIDAK AKTIF");
        $this->db->where("status", "AKTIF");
        $rUpdate = $this->db->update("thn_akademik");
        $result = $this->db->insert('thn_akademik', $data);
        return $result;
    }

    public function update($data){
        $this->db->set("status", "TIDAK AKTIF");
        $this->db->where("status", "AKTIF");
        $this->db->update("thn_akademik");
        $this->db->where("Id_thn_akademik", $data->Id_thn_akademik);
        $result =  $this->db->update("thn_akademik", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('Id_thn_akademik', $id['Id_thn_akademik']);
        $result = $this->db->delete('thn_akademik');
        return $result;
    }
}
