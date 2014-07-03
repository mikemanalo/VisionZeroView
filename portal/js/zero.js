//----------------------------------------------------------//	
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });
//----------------------------------------------------------//	
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

$('form').submit(function(){
	alert($(this["options"]).val());
    return false;
});
//----------------------------------------------------------//
$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });
//----------------------------------------------------------//
$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});	
//----------------------------------------------------------//
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.input-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});
//----------------------------------------------------------//
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
//---------------------------------------------------------//
$("[name='InjuriesWhat']").bootstrapSwitch();
$("[name='InjuriesWhen']").bootstrapSwitch();