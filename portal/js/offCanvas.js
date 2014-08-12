// This JS takes care of the responsive navigation

var siteOverlay = $('#site-overlay');
var siteWrapper = $('#site-wrapper');

// handles the click function of the hamburger menu
$(function(){
  siteOverlay.fadeOut('fast');
  $('.toggle-nav').click(function(){
    siteWrapper.toggleClass('show-nav');
    siteOverlay.fadeIn('fast');
});

// allows the user to use the escape key to close the responsive menu
$(document).keyup(function(e) {
  if (e.keyCode == 27) { //esc key
    if (siteWrapper.hasClass('show-nav')) {
      siteOverlay.fadeOut('fast');
      siteWrapper.toggleClass('show-nav');
    }
  }
});

// retracts the responsive menu when the darkened overlay is clicked
siteOverlay.click(function(){
  siteOverlay.fadeOut('fast');
  siteWrapper.toggleClass('show-nav');
})

});

//

// hide the "month" select box when Yearly is selected"
$(document).ready(function() {
  $("#yearlyBtn").click(function() {
    $(".crash-date-month").hide(); // hide the month select box
  });
  $("#monthlyBtn").click(function() {
    $(".crash-date-month").show(); // show the month select box
  });
});
