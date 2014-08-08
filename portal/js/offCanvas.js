$(function(){
  $('#site-overlay').fadeOut('fast');
  $('.toggle-nav').click(function(){
    $('#site-wrapper').toggleClass('show-nav');
    $('#site-overlay').fadeIn('fast');
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { //esc key
        if ($('#site-wrapper').hasClass('show-nav')) {
          $('#site-overlay').fadeOut('fast');
            $('#site-wrapper').toggleClass('show-nav');
        }
    }
});

$('#site-overlay').click(function(){
  $('#site-overlay').fadeOut('fast');
  $('#site-wrapper').toggleClass('show-nav');
})

});
