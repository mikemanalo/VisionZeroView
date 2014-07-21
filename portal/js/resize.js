
function resizeMap() {

  sidebarWidth = $('#SideBar').outerWidth(true);
  console.log(sidebarWidth);
  if (map && window.location.hash == "") {
	  $('#map').height(window.innerHeight - 200);
	  // $('#map').width(window.innerWidth - sidebarWidth);
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
    var supportsOrientationChange = "orientationchange" in window,
	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
	    // Announce the new orientation number
	    orientationChanged(window.orientation);
    }, false);

	window.addEventListener("resize", function () {
		 if (map) {
			resizeMap();
		}
	}, false);
}
