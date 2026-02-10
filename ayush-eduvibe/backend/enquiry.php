<?php
include 'config.php';
$name=$_POST['name']; $email=$_POST['email']; $phone=$_POST['phone'];
$country=$_POST['country']; $message=$_POST['message'];
$sql="INSERT INTO enquiries(name,email,phone,country,message) VALUES('$name','$email','$phone','$country','$message')";
echo mysqli_query($conn,$sql) ? "Enquiry Submitted" : "Failed";
?>