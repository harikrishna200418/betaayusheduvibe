<?php session_start();
if(!isset($_SESSION['admin'])) header("Location: admin-login.php");
echo "Welcome Admin"; ?>