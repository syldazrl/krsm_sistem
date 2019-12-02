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
            RIGHT JOIN `matakuliah` ON `matakuliah`.`kmk` = `pengampu`.`kmk`
            RIGHT JOIN `thn_akademik` ON `thn_akademik`.`Id_thn_akademik` =
          `pengampu`.`Id_thn_akademik`
            RIGHT JOIN `pegawai` ON `pegawai`.`nip` = `pengampu`.`nip`
            ");
            return $result->result_array();
        }
    }

    public function insert($data){
        $this->db->insert("dosen_wali", $data);
        $result = $this->db->query("
        SELECT
        *
      FROM
        `pengampu`
        RIGHT JOIN `matakuliah` ON `matakuliah`.`kmk` = `pengampu`.`kmk`
        RIGHT JOIN `thn_akademik` ON `thn_akademik`.`Id_thn_akademik` =
      `pengampu`.`Id_thn_akademik`
        RIGHT JOIN `pegawai` ON `pegawai`.`nip` = `pengampu`.`nip`
            WHERE
                pengampu.kmk = '$data->kmk' and
                pengampu.nip = '$data->nip' and
                pengampu.id_thn_akademik = '$data->id_thn_akademik'
        ");
        return $result->result_array();
    }

    public function update($data){
        $this->db->where("npm", $data->npm);
        $result =  $this->db->update("dosen_wali", $data);
        return $result;
    }

    public function delete($id){
        $this->db->where('npm', $id['npm']);
        $result = $this->db->delete('dosen_wali');
        return $result;
    }
}
