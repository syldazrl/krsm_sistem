<?php

class Matakuliah_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('kmk', $id['kmk']);
            $result = $this->db->get('matakuliah');
            return $result->result_array();
        }
        else {
            $result = $this->db->get('matakuliah');
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('matakuliah', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("kmk", $data->kmk);
        $result =  $this->db->update("matakuliah", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('kmk', $id['kmk']);
        $result = $this->db->delete('matakuliah');
        return $result;
    }
    
}
