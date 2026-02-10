<?php
include '../config.php';
$res=mysqli_query($conn,"SELECT * FROM enquiries");
while($r=mysqli_fetch_assoc($res)) echo $r['name'].' - '.$r['email'].'<br>';
?>