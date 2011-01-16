<?php
$ajax = isset($_POST['ajax']);
if ($ajax) {
	$from = $_POST['name'];
	$fromEmail = $_POST['email'];
	$fromMessage = $_POST['message'];
} else {
	$from = $_POST['contact-name'];
	$fromEmail = $_POST['contact-email'];
	$fromMessage = $_POST['contact-message'];
}
$valid = true;
// none of the fields can be empty
if ($from == '') {
	$valid = false;
}
if ($fromEmail == '') {
	$valid = false;
}
if ($fromMessage == '') {
	$valid = false;
}
if ($ajax != 1) {
	require_once($_SERVER['DOCUMENT_ROOT'] . '/include/links.htm'); 
	echo '
			<title>Contact me</title>
		</head>
		<body>
	';
}
if ($ajax != 1) {
	require_once($_SERVER['DOCUMENT_ROOT'] . '/include/navigation.htm');
	echo '
		<div id="contact_form" class="ui-corner-all">
	';
}
if ($valid) {
	$ip = $_SERVER['REMOTE_ADDR'];
	$time = time();
	$maintenance = "me@pjfontillas.com";
	$to = "me@pjfontillas.com";
	$subject = "Message from $from";
	$econtent = "$fromMessage\n\nSent on " . date("D F d Y", $time) . " from $ip";
	$headers = "From: $from <$fromEmail>";
	if(mail($to,$subject,$econtent,$headers)) {
		if ($ajax) {
			echo "{\"status\":\"success\"}";
		} else {
			echo "Your message was successfully sent! I'll get back to you as soon as possible!";
		}
	} else {
		if ($ajax) {
			echo "{\"status\":\"failure\"}";
		} else {
			echo "There was a problem sending your message. Please contact $maintenance";
		}
	}    
} else {
	if ($ajax) {
		echo '{"status":"rejected"}';
	} else {
		echo "
			<div style=\"display: block; left: 405px; top: 17px; \" class=\"ui-draggable\">
				<h1 class=\"text-center\">Please check what you entered</h1>
				<div class=\"half\">
					<form id=\"contact-form\" method=\"post\" action=\"/contact/ed/\">
						<p>You can send an email to <a class=\"email\" href=\"mailto:me@pjfontillas.com\">me@pjfontillas.com</a>.</p>
						<p>Or simply use this form. Whatcha got to say?</p>
						<p><textarea rows=\"5\" cols=\"40\" name=\"contact-message\" id=\"contact-message\">$fromMessage</textarea></p>
						<p><label>Your name: </label><input name=\"contact-name\" id=\"contact-name\" type=\"text\" value=\"$from\"></p>
						<p><label>Your email: </label><input name=\"contact-email\" id=\"contact-email\" type=\"text\" value=\"$fromEmail\"></p>
						<p><button type=\"submit\" id=\"submit-contact-form\">Send it!</button></p>
					</form><!-- #contact-form -->
				</div>
				<div id=\"address\" class=\"half\">
					<p>Patrick James Fontillas</p>
					<hr>
					<p>123 Cyber Lane</p>
					<hr>
					<p>The Internet, Planet Earth</p>
				</div><!-- #address -->
			</div>
		";	
	}
}
if ($ajax != 1) {
	echo '
		<div class="clear-float"></div>      
	</div><!-- #contact_form -->
	';
	require_once($_SERVER['DOCUMENT_ROOT'] . '/include/footer-no-js.htm');
	echo '
			</body>
		</html>
		';
}
?>