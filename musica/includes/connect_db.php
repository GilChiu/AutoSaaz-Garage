<?php
mysqli_report(MYSQLI_REPORT_OFF);
date_default_timezone_set('Europe/London');

if (strpos($_SERVER['SERVER_NAME'],"192.168")!==false || $_SERVER['SERVER_NAME']=="musica.jukebox"){
	//## locak
	$dbloc=1;
	$_DBconn = 	mysqli_connect('localhost','root','bk001',"musica");

}else{
	$dbloc=2;

	$_DBconn = mysqli_connect('dbconn.musica.co.uk','musicadev','dEvbox@123',"musica_dev");

}



function createToken($id,$ref){
	return	base64_encode($id."-".$ref);
}
?>