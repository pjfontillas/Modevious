$c.onLoad(function () {
	$c.trace("Starting behavior configuration for #menu-download");
	$("menu-download").observe("click", function (event) {
		$c.trace("Download link pressed, stopping default link behavior");
		event.stop();
		var downloadContainer = $j("#download-container");
		if ($j("#download-container").is(":hidden")) {
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
		}).expose({
			closeOnClick: false,
			closeOnEsc: false,
			color: "#000"
		});
	});
	$("close-download").observe("click", function () {
			$c.trace("Hiding #download-container");
			$j("#download-container").animate({
				top: -1000
			});
			$j.mask.close();
	});
	$c.trace("Finished configuring behavior for #menu-download");
});