<?php

class ThnAkademik_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('id_thn_akademik', $id['id_thn_akademik']);
            $result = $this->db->get('thn_akademik');
            return $result->result_array();
        }
        else {
            $result = $this->db->get('thn_akademik');
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('thn_akademik', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("id_thn_akademik", $data->thn_ajaran);
        $result =  $this->db->update("thn_akademik", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('id_thn_akademik', $id['id_thn_akademik']);
        $result = $this->db->delete('thn_akademik');
        return $result;
    }
}
