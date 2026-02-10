<?php
session_start(); include '../config.php';
$user=$_POST['username']; $pass=$_POST['password'];
$q=mysqli_query($conn,"SELECT * FROM admin WHERE username='$user' AND password='$pass'");
if(mysqli_num_rows($q)>0){ $_SESSION['admin']=$user; header("Location: dashboard.php"); }
else echo "Invalid Admin Login";
?>