<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/include/links.htm'); ?>
  <title>Contact me</title>
</head>
<body>
<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/include/navigation.htm'); ?>
  <div id="core">
    <div class="full">
      <p class="padded">
<?php
$from = $_POST['name'];
$fromEmail = $_POST['email'];
$fromMessage = $_POST['message'];
$ip = $_SERVER['REMOTE_ADDR'];
$time = time();
$maintenance = "me@pjfontillas.com";
$to = "me@pjfontillas.com";
$subject = "Message from $from";
$econtent = "$fromMessage\n\nSent on " . date("D F d Y", $time) . " from $ip";
$headers = "From: $from <$fromEmail>";
if(mail($to,$subject,$econtent,$headers)) {
echo "Your message was successfully sent! I'll get back to you as soon as possible!";
} else {
echo "There was a problem sending your message. Please contact $maintenance";
}    
?>
      </p>
    </div>
    <div class="clear-float"></div>      
  </div><!-- End #core -->
<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/include/footer.htm'); ?>
</body>
</html>
