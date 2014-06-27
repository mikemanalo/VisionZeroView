//----------------------------------------------Swaps svg for png in older browsers-----------------------------------------------//
if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png');
    });
}

//--------------------------------------------------Dropdown Title Change--------------------------------------------------------//
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.input-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

//-------------------------------------------------Controls the slide-panel that makes the menu----------------------------------//
	$('#opener').on('click', function() {		
		var panel = $('#slide-panel');
		var map =$('#map');
		if (panel.hasClass("visible")) {
			//map.animate({'margin-left':'0px'}); // add this if map should slide with panel
			panel.removeClass('visible').animate({'margin-left':'-300px'});
		} else {
			panel.addClass('visible').animate({'margin-left':'0px'});
			//map.animate({'margin-left':'300px'});
		}	
		return true;	
	});

$(".alignment .btn").click(function() {
    // whenever a button is clicked, set the hidden helper
    $("#alignment").val($(this).text());
}); 
	
/*function classToggle() {
    this.classList.toggle('radioBtn');
    this.classList.toggle('radioBtnOn');

}
document.querySelector('#div').addEventListener('click', classToggle);*/