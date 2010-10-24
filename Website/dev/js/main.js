$c.include("/js/jquery.blockUI.js");
$c.trace("Loaded jquery.blockUI.js");
$c.onLoad(function () {
	$("menu-download").observe("click", function (event) {
		$c.trace("Download link pressed, stopping default link behavior");
		event.stop();
		var downloadContainer = $j("#download-container");
		if (downloadContainer.is(":hidden")) {
			$c.trace("#download-container was hidden, now showing");
			downloadContainer.show().css({
				left: (document.viewport.getWidth() - downloadContainer.outerWidth(true)) / 2 
			}).draggable();
		}
		$c.trace("Moving #download-container");
		$c.trace([
			"document.viewport.getWidth(): ",
			document.viewport.getWidth()
		].join(''));
		$c.trace([
			"downloadContainer.outerWidth(true): ",
			downloadContainer.outerWidth(true)
		].join(''));
		downloadContainer.animate({
			top: document.viewport.getScrollOffsets().top + 50
		});
	});
	$("hide-download").observe("click", function () {
			$c.trace("Hiding #download-container");
			$j("#download-container").animate({
				top: -1000
			});
	});
	$c.trace("Finished configuring behavior for #menu-download");
	$("menu-contact").observe("click", function (event) {
		event.stop();
		var contactContainer = $j("#contact-container");
		if (contactContainer.is(":hidden")) {
			$c.trace("#contact-container was hidden, now showing");
			contactContainer.show().css({
				left: (document.viewport.getWidth() - contactContainer.outerWidth(true)) / 2 
			}).draggable();
		}
		$c.trace("Moving #contact-container");
		$c.trace([
			"document.viewport.getWidth(): ",
			document.viewport.getWidth()
		].join(''));
		$c.trace([
			"contactContainer.outerWidth(true): ",
			contactContainer.outerWidth(true)
		].join(''));
		contactContainer.animate({
			top: document.viewport.getScrollOffsets().top + 50
		});	
	});
	$("submit-contact-form").observe("click", function (event) {
		event.stop();
		$c.trace("Contact form was submitted");
		$j("#contact-container").block({
			message: "<p>Sending message...</p>"
		});
		var ajaxRequest = new Ajax.Request("/contact/ed/", {
			parameters: {
				name: $F("contact-name"),
				message: $F("contact-message"),
				email: $F("contact-email"),
				ajax: "true"
			},
			onSuccess: function (transport) {
				var fn;
				var data = transport.responseText.evalJSON();
				$c.trace("Ajax Request response: " + data);
				$c.trace("Ajax Request response.status: " + data.status);
				if (data.status == "success") {
					$j("#contact-container").block({
						message: "<p>Message sent!</p>"
					});
					fn = function () {
						$j("#contact-container").unblock().animate({
							top: -1000
						});
						$("contact-name").value = '';
						$("contact-message").value = '';
						$("contact-email").value = '';
					};
				} else {
					$j("#contact-container").block({
						message: "<p>Something went wrong, please try again or wait a while before resubmitting through this form!</p>"
					});
					fn = function () {
						$j("#contact-container").unblock();
					};
				}
				setTimeout(fn, 3000);
			},
			onFailure: function (transport) {
				$c.trace("There was a problem with the Ajax Request, here is the response status: " + transport.status);
			}
		});
	});
	$("cancel-contact-form").observe("click", function (event) {
		event.stop();
		$c.trace("Contact form was cancelled");
		$j("#contact-container").animate({
			top: -1000
		});
	});
	$c.trace("Finished configuring behavior for #contact-download");
	$j("#download-container").click(function () {
		if ($j("#contact-container").is(":visible")) {
			$j("#download-container").css("zIndex", 1002);
			$j("#contact-container").css("zIndex", 1001);
		}
	});
	$j("#contact-container").click(function () {
		if ($j("#download-container").is(":visible")) {
			$j("#contact-container").css("zIndex", 1002);
			$j("#download-container").css("zIndex", 1001);
		}
	});
});