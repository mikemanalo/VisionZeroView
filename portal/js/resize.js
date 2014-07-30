
function resizeMap() {

  //sidebarWidth = $('#SideBar').outerWidth(true);
    //console.log(sidebarWidth);
    var titileDIV = $('#navbarDIV').outerHeight(true);
    var blackBar = $('#blackBar').outerHeight(true);
    var footer = $('#footer').outerHeight(true);
    var sidebar = $('#sidebar').outerHeight(true);
    var offsetHeight = titileDIV + blackBar + footer;
  if (map && window.location.hash == "") {
      var mapHeight = window.innerHeight - offsetHeight - 15;
      if (sidebar < mapHeight)
          $('#map').height(mapHeight);
      else
          $('#map').height(sidebar);
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
