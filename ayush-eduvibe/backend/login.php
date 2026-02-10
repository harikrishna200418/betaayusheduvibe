<?php
session_start(); include 'config.php';
$email=$_POST['email']; $pass=$_POST['password'];
$q=mysqli_query($conn,"SELECT * FROM users WHERE email='$email'");
$user=mysqli_fetch_assoc($q);
if($user && password_verify($pass,$user['password'])){
$_SESSION['user']=$email; echo "Login Success";
}else echo "Invalid Login";
?>