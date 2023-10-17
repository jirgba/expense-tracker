<?php
header('Access-Control-Allow-Origin: *');
include('connect.php');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$email = $data['email'];
$password = $data['password'];
$submit = "select * from register where email='$email' and password='$password'";

$submit = mysqli_query($connection, $submit);

$count = mysqli_num_rows($submit);
if($count >= 0){

    
    $username = $submit['username'];
    $email = $submit['email'];
    $password = $submit['password'];
    $phoneNumber = $submit['phoneNumber'];


    echo json_encode(array( 
        'msg' => 'Success', 
        'username' => $username,
        'password' => $password,
        'phoneNumber' => $phoneNumber,
        'email' => $email 
    ));

}
else{

    echo json_encode(array('msg' => 'Invalid login details'));
}

?>