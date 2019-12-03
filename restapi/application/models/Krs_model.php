<?php

class Krs_model extends CI_Model
{
    public function get($id){
        $this->db->where("id_krs", $data['id_krs']);
        $this->db->where("dosen_wali", $data['dosen_wali']);
        $this->db->where("npm", $data['npm']);
        $this->db->where("ket", $data['ket']);
        $this->db->where("Id_thn_akademik", $data['Id_thn_akademik']);
        $result = $this->db->get("krs");
        if($result->num_rows()>0){
            return true;
        }else{
            return false;
        }
    }

    public function insert($data){
        $this->db->trans_start();
        $DataKRS = [
            'dosen_wali'=>$data->dosen_wali,
            'npm'=>$data->npm,
            'ket'=>$data->ket,
            'Id_thn_akademik'=>$data->Id_thn_akademik
        ];
        $this->db->insert('krs', $DataKRS);
        $id_krs = $this->db->insert_id();
        foreach ($data->detail_krs as $key => $value) {
            $detail = [
                'id_pengampu' => $value->id_pengampu,
                'id_krs' => $id_krs
            ];
            $this->db->insert("detail_krs", $detail);
        }
        if($this->db->trans_status() == false){
            $this->db->trans_rollback();
            return false;
        }else{
            $this->db->trans_complete();
            return true;
        }
        return $result;
    }

    public function update($data){
        $this->db->where("id_krs", $data->id_krs);
        $result =  $this->db->update("krs", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('id_krs', $id['id_krs']);
        $result = $this->db->delete('krs');
        return $result;
    }
}
