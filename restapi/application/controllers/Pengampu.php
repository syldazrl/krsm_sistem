<?php defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/API_Controller.php';
class Pengampu extends API_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("Pengampu_Model", "Pengampumodel");
    }

    public function Panggil(){
        $id = $_GET;
        $result = $this->Pengampumodel->get($id);
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
        $data = $this->Pengampumodel->insert(json_decode($pos));
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
        $data = $this->Pengampumodel->update($pos);
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
        $result = $this->Pengampumodel->delete($id);
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