<?php defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/API_Controller.php';
class Krs extends API_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("Krs_model", "KrsModel");
    }

    public function Panggil(){
        $id = $_GET;
        $result = $this->KrsModel->get($id);
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
                ], 200
            );
        }
    }

    public function Tambah(){
        $pos = $this->input->raw_input_stream;
        $data = $this->KrsModel->insert(json_decode($pos));
        if($data){
            $this->api_return(
                [
                    'status' => "Data Berhasil Disimpan"
                ],
        200);
        }else{
            $this->api_return(
                [
                    'status' => "Data Gagal Disimpan"
                ],
        400);
        }
    }

    public function Ubah(){
        $pos =json_decode($this->input->raw_input_stream);
        $data = $this->KrsModel->update($pos);
        if($data){
            $this->api_return(
                [
                    'status' => true
                ],
        200);
        }else{
            $this->api_return(
                [
                    'status' => false
                ],
        400);
        }
    }

    public function Hapus(){
        $id = $_GET;
        $result = $this->KrsModel->delete($id);
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