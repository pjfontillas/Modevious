<?php
	$admin = 'me@pjfontillas.com';
	$log = $_POST['log'];
	$from = 'Modevious Console';
	$fromEmail = 'no-reply@modevious.com';
	$ip = $_SERVER['REMOTE_ADDR'];
	$subject = 'Console Log';
	$time = date("D F d Y", time());
	$url = $_POST['url'];
	
	$headers = "From: $from <$fromEmail>";
	$content = "<html><body><p>Log for: $url<br />IP: $ip</p><p>" . $log . "</p></body></html>";
	
	if(mail($admin,$subject,$content,$headers)) {
		echo "Log successfully sent.";
	} else {
		echo "There was a problem sending the log.";
	}
?>