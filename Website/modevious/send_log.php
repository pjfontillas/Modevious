<?php
	$admin = 'me@pjfontillas.com';
	$log = $_POST['log'];
	$from = 'Modevious Console';
	$fromEmail = 'no-reply@modevious.com';
	$ip = $_SERVER['REMOTE_ADDR'];
	$subject = 'Console Log';
	$time = date("D F d Y", time());
	$url = $_POST['url'];
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= "From: $from <$fromEmail>" . "\r\n";
	$content = "<html><head><title>$subject</title></head><body><p>Log for: <a href=\"$url\">$url</a><br />IP: $ip</p><p>" . $log . "</p></body></html>";
	
	if(mail($admin,$subject,$content,$headers)) {
		echo "Log successfully sent.";
	} else {
		echo "There was a problem sending the log.";
	}
?>