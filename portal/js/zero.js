//-----------------------Used to Toggle Switch Button-----------------------------------//	
	$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    if ($(this).find('.btn-danger').size()>0) {
    	$(this).find('.btn').toggleClass('btn-danger');
    }
    if ($(this).find('.btn-success').size()>0) {
    	$(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info').size()>0) {
    	$(this).find('.btn').toggleClass('btn-info');
    }
    
    $(this).find('.btn').toggleClass('btn-default');
       
});

//--------------------Used for the dropdown menu for the search------------------------------//
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.input-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

//---------------------Don't Use IE Dummy------------------------------------------------------------------------//
var dummy = document.getElementById('dummy');
       dummy.innerHTML = '<!' + '--[if lte IE 8]>x<![endif]-->';
       var isIE9 = dummy.innerHTML === 'x';
       if (isIE9==true){
       alert("This website is designed for IE9 or higher.  Please update IE, or open the website using Chrome, Firefox, or another modern browser.");
       }
