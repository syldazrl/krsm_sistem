<?php defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/API_Controller.php';
class Pegawai extends API_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("Pegawai_model", "PegawaiModel");
    }

    public function Panggil(){
        $id = $_GET;
        $result = $this->PegawaiModel->get($id);
        if(!empty($result)){
            $this->api_return(
                [
                    "data" => $result
                ], 200
            );
        }else{
            $this->api_return(
                [
                    "data" => "Data Kosong"
                ], 400
            );
        }
    }

    public function Tambah(){
        $pos = $this->input->raw_input_stream;
        $data = $this->PegawaiModel->insert(json_decode($pos));
        if($data){
            $this->api_return(
                [
                    'status' => "Data berhasil disimpan"
                ],
        200);
        }else{
            $this->api_return(
                [
                    'status' => "Data gagal disimpan"
                ],
        400);
        }
    }

    public function Ubah(){
        $pos =json_decode($this->input->raw_input_stream);
        $data = $this->PegawaiModel->update($pos);
        if($data){
            $this->api_return(
                [
                    'status' =>"Data berhasil diubah"
                ],
        200);
        }else{
            $this->api_return(
                [
                    'status' => "Data gagal diubah"
                ],
        400);
        }
    }

    public function Hapus(){
        $id = $_GET;
        $result = $this->PegawaiModel->delete($id);
        if($result){
            $this->api_return(
                [
                    "data" => $result
                ], 200
            );
        }else{
            $this->api_return(
                [
                    "data" => $result
                ], 400
            );
        }
    } 
}