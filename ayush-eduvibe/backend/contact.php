<?php
include 'config.php';
$name=$_POST['name']; $email=$_POST['email'];
$subject=$_POST['subject']; $message=$_POST['message'];
$sql="INSERT INTO contacts(name,email,subject,message) VALUES('$name','$email','$subject','$message')";
echo mysqli_query($conn,$sql) ? "Message Sent" : "Error";
?>