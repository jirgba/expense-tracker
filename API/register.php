<?php
    header('Access-Control-Allow-Origin: *');
    include('connect.php');
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];
    $phoneNumber = $data['phoneNumber'];

    $submit = "insert into register(username, email, password, phoneNumber) values ('$username','$email','$password','$phoneNumber')";
    $submit = mysqli_query($connection, $submit);
    
    if($submit){
        $msg = "Submitted";
    }
    else{
        $msg = "NotSubmitted";
    }
    echo json_encode($msg);
?>