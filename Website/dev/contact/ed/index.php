<?php
$from = $_POST['name'];
$fromEmail = $_POST['email'];
$fromMessage = $_POST['message'];
$ajax = isset($_POST['ajax']);
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
		<div id="core" class="ui-corner-all">
			<div class="full">
				<p class="padded">
	';
}
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
if ($ajax != 1) {
	echo '
			</p>
		</div>
		<div class="clear-float"></div>      
	</div><!-- End #core -->
	';
	require_once($_SERVER['DOCUMENT_ROOT'] . '/include/footer.htm');
	echo '
			</body>
		</html>
		';
}
?>