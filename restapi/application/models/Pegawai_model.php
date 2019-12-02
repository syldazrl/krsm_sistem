<?php

class Pegawai_model extends CI_Model
{
    public function get($id){
        if($id != null){
            $this->db->where('nip', $id['nip']);
            $result = $this->db->get('pegawai');
            return $result->result_array();
        }
        else {
            $result = $this->db->get('pegawai');
            return $result->result_array();
        }
    }

    public function insert($data){
        $result = $this->db->insert('pegawai', $data);
        return $result;
    }

    public function update($data){
        $this->db->where("nip", $data->nip);
        $result =  $this->db->update("pegawai", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('nip', $id['nip']);
        $result = $this->db->delete('pegawai');
        return $result;
    }
}
