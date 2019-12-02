<?php

class User_model extends CI_Model
{
    public function login($data)
    {
        $Password = $data['password'];
        $Username = $data['username'];
        $result = $this->db->query("
            SELECT * FROM user WHERE (username = '$Username' OR email = '$Username') AND password = '$Password'
        ");
        if($result->num_rows()>0){
            $message = [
                "data"=> $result->result_array(),
                "Status" => true
            ];
            return $message;
        }else{
            $message = [
                "Status" => true
            ];
            return $message;
        }
    }
}
