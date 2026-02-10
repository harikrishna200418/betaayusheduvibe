<?php
include 'config.php';
$name=$_POST['name']; $email=$_POST['email']; $phone=$_POST['phone'];
$pass=password_hash($_POST['password'], PASSWORD_DEFAULT);
$sql="INSERT INTO users(name,email,phone,password) VALUES('$name','$email','$phone','$pass')";
echo mysqli_query($conn,$sql) ? "Registration Successful" : "Error";
?>