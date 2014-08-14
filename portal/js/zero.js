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
$(".dropdown-menu li a").on("touchstart click",function(){
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
//-----------------------------------Proxy for IE-----------------------------------------------------------------//
function isIE()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
 {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv == -1 ? false: true;
}

//---Drop Down Fix?-//


$('[data-toggle=dropdown]').each(function() {
 this.addEventListener('click', function() {}, false);
});

 

//-----------------------------------------------------------------------------------------------------------------------//
$( '#searchInput' ).on( 'keypress', function( e ) {
        if ((e.keyCode == 13) && (e.target.type != "textarea")) {
            e.preventDefault();
            $( this ).trigger( 'submit' );
        }
    });

$( '#searchInput1' ).on( 'keypress', function( e ) {
       if ((e.keyCode == 13) && (e.target.type != "textarea")) {
            e.preventDefault();
            $( this ).trigger( 'submit' );
        }
    } );

