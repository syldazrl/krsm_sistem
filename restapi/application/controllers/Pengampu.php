<?php defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/API_Controller.php';
class Pengampu extends API_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("Pengampu_Model", "PengampuModel");
    }

    public function Panggil(){
        $id = $_GET;
        $result = $this->PengampuModel->get($id);
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
        $data = $this->PengampuModel->insert(json_decode($pos));
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
        $data = $this->PengampuModel->update($pos);
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
        $result = $this->PengampuModel->delete($id);
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