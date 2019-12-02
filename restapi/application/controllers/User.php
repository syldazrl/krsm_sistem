<?php defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/API_Controller.php';
class User extends API_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("User_model", "UserModel");
    }

    public function Login(){
        $data = $_GET;
        $result = $this->UserModel->login($data);
        $this->api_return(
            [
                "data"=>$result
            ], 200
        );
    }
}