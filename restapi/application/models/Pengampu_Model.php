<?php

class Pengampu_model extends CI_Model
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
            `pengampu`.*,
                thn_akademik.thn_ajaran,
                matakuliah.kmk, matakuliah.nm_matakul, 
                pegawai.nip, pegawai.nm_pegawai
            FROM
                `pengampu`
                INNER JOIN `thn_akademik` ON `thn_akademik`.`thn_ajaran` = `pengampu`.`thn_ajaran`
                INNER JOIN `matakuliah` ON `matakuliah`.`kmk` = `pengampu`.`kmk`
                INNER JOIN `pegawai` ON `pegawai`.`nip` = `pengampu`.`nip`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->insert("pengampu", $data);
        $result = $this->db->query("
            SELECT
                'pengampu'.*,
                thn_akademik.thn_ajaran,
                matakuliah.kmk, matakuliah.nm_matakul, 
                pegawai.nip, pegawai.nm_pegawai
            FROM
                `pengampu`
                INNER JOIN `thn_akademik` ON `thn_akademik`.`thn_ajaran` = `pengampu`.`thn_ajaran`
                INNER JOIN `matakuliah` ON `matakuliah`.`kmk` = `pengampu`.`kmk`
                INNER JOIN `pegawai` ON `pegawai`.`nip` = `pengampu`.`nip`
            WHERE
                pengampu.kmk = '$data->kmk' and
                pengampu.nip = '$data->nip' and
                pengampu.thn_ajaran = '$data->thn_ajaran'
        ");
        return $result->result_array();
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
