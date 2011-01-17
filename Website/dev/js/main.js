$c.include("/Google_Prettify/prettify.css");
$c.include("/Google_Prettify/prettify.min.js");
$j(document).ready(function () {
	// Initialize download form
	$$(".download").each(function (element) {
		element.observe("click", function (event) {
			$c.console.log("Download link pressed, stopping default link behavior");
			event.stop();
			var downloadContainer = $j("#download-container");
			if (downloadContainer.is(":hidden")) {
				$c.console.log("#download-container was hidden, now showing");
				downloadContainer.show().css({
					left: (document.viewport.getWidth() - downloadContainer.outerWidth(true)) / 2
				});
			}
			$c.console.log("Moving #download-container");
			$c.console.log([
				"document.viewport.getWidth(): ",
				document.viewport.getWidth()
			].join(''));
			$c.console.log([
				"downloadContainer.outerWidth(true): ",
				downloadContainer.outerWidth(true)
			].join(''));
			downloadContainer.animate({
				top: document.viewport.getScrollOffsets().top + 50
			});
		});
		$("hide-download").observe("click", function () {
				$c.console.log("Hiding #download-container");
				$j("#download-container").animate({
					top: -1000
				});
		});
	});
	$c.console.log("Finished configuring behavior for download links");
  
	// Initialize contact form
	$$(".contact").each(function (element) {
		element.observe("click", function (event) {
			event.stop();
			var contactContainer = $j("#contact_container");
			if (contactContainer.is(":hidden")) {
				$c.console.log("#contact_container was hidden, now showing");
				contactContainer.show().css({
					left: (document.viewport.getWidth() - contactContainer.outerWidth(true)) / 2
				});
			}
			$c.console.log("Moving #contact_container");
			$c.console.log([
				"document.viewport.getWidth(): ",
				document.viewport.getWidth()
			].join(''));
			$c.console.log([
				"contactContainer.outerWidth(true): ",
				contactContainer.outerWidth(true)
			].join(''));
			contactContainer.animate({
				top: document.viewport.getScrollOffsets().top + 50
			});
		});
	});
	$j("#contact_form").validate({
		submitHandler: function (form) {
			$j("#contact_container").block({
				message: "<p>Sending message...</p>"
			});
			var ajaxRequest = new Ajax.Request("/contact/ed/", {
				parameters: {
					name: $F("contact_form_name"),
					message: $F("contact_form_message"),
					email: $F("contact_form_email"),
					ajax: "true"
				},
				onSuccess: function (transport) {
					var fn;
					var data = transport.responseText.evalJSON();
					$c.console.log("Ajax Request response: " + data);
					$c.console.log("Ajax Request response.status: " + data.status);
					if (data.status == "success") {
						$j(".blockMsg").html("<p>Message sent!</p>");
						fn = function () {
							$j("#contact_container").unblock().animate({
								top: -1000
							});
							$("contact_form_name").value = '';
							$("contact_form_message").value = '';
							$("contact_form_email").value = '';
						};
					} else {
						if (data.status == "rejected") {
							$j(".blockMsg").html("<p>Please check what you entered</p>");
							fn = function () {
								$j("#contact_container").unblock();
							};
						} else {
							if (data.status == "failure") {
								$j(".blockMsg").html("<p>Something went wrong, please try again or wait a while before resubmitting through this form!</p>");
								fn = function () {
									$j("#contact_container").unblock();
								};
							}
						}
					}
					setTimeout(fn, 3000);
				},
				onFailure: function (transport) {
					$c.console.log("There was a problem with the Ajax Request, here is the response status: " + transport.status);
				}
			});
		},
		invalidHandler: function (form, validator) {
			$c.console.log("Contact form validation failed.");
		}
	});
	$("contact_form_cancel").observe("click", function (event) {
		event.stop();
		$c.console.log("Contact form was cancelled");
		$j("#contact_container").animate({
			top: -1000
		});
		$("contact_form_name").value = '';
		$("contact_form_message").value = '';
		$("contact_form_email").value = '';
	});
	$c.console.log("Finished configuring behavior for contact form");
	$j("#download-container").click(function () {
		if ($j("#contact_container").is(":visible")) {
			$j("#download-container").css("zIndex", 1002);
			$j("#contact_container").css("zIndex", 1001);
		}
	});
	$j("#contact_container").click(function () {
		if ($j("#download-container").is(":visible")) {
			$j("#contact_container").css("zIndex", 1002);
			$j("#download-container").css("zIndex", 1001);
		}
	});
  
	// Initialize sounds
	soundManager.onload = function () {
		soundManager.createSound({
			id: "testUI",
			url: "/media/test-UI.mp3"
		});
		soundManager.createSound({
			id: "focus",
			url: "/media/focus.mp3"
		});
		$$('#menu a').each(function (element) {
			element.observe("mouseover", function () {
				soundManager.play("testUI");
			});
		});
		$$('#splash-menu a').each(function (element) {
			element.observe("click", function () {
				soundManager.play("focus");
			});
		});
	};
	$c.console.log("Sounds initialized");
  
	// Initialize Google Code Prettify
	prettyPrint();
	$c.console.log("Initialized Google Code Prettify");
});