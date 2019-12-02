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
                    `detail_krs`.`id_krs`,
                    `detail_krs`.`id_pengampu`
                FROM
                    `krs`
                    LEFT JOIN `detail_krs` ON `detail_krs`.`id_krs` = `krs`.`id_krs`
                    LEFT JOIN `pengampu` ON `detail_krs`.`id_pengampu` = `pengampu`.`id_pengampu`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->trans_start();
        
        $this->db->insert('krs', $data->krs);
        $id_krs = $this->db->insert_id();
        foreach ($data['detail_krs'] as $key => $value) {
            $detail = [
                'id_pengampu' => $value['id_pengampu'],
                'id_krs' => $id_krs
            ];
        $this->db->insert("detail_krs", $detail);
        }
        $this->db->stream_complete();

        if($this->db->trans_status() == false){
            return false;
        }
        else{
            return true;
        }
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
