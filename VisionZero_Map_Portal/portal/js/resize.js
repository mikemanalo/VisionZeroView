function resizeMap() {
	curWidth = $(window).width();
	curDocWidth = $(document).width();


	var titileDIV = $('#navbarDIV').outerHeight(true);
	var blackBar = $('#blackBar').outerHeight(true);
	var footer = $('#footer').outerHeight(true);
	var sidebar = $('#sidebar').outerHeight(true);
	var offsetHeight = titileDIV + blackBar + footer;
	//hack for weird IE DOM load issue

	$('#map').height(mapHeight);

	if ((curWidth < 767) || (curDocWidth < 767)) {
		var mapHeight = window.innerHeight;
	} else {
		var mapHeight = window.innerHeight - offsetHeight - 15;
	}
	$('#map').height(mapHeight);
	if (map && window.location.hash == "") {
		var mapHeight = window.innerHeight - offsetHeight - 15;

		if (sidebar < mapHeight)
			$('#map').height(mapHeight);
		else
			$('#map').height(sidebar);

		map.reposition();
		map.resize();
	}
}

function orientationChanged(e) {
	switch (e) {
		case -90:
		case 90:
			break;
		default:
			break;
	}
	if (map) {
		resizeMap();
	}
}

function mapWinEvent() {
	var supportsOrientationChange = "orientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	window.addEventListener(orientationEvent, function() {
		// Announce the new orientation number
		orientationChanged(window.orientation);
	}, false);

	window.addEventListener("resize", function() {
		if (map) {
			resizeMap();
		}
	}, false);
}
