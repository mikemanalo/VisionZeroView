
			   $(document).ready(function () {
			   	 $("#sliderDiv").css("display", "none"); 
                $("#jqxslider").jqxSlider({
                    theme: 'bootstrap',
                    value: 0,
                    min: 0,
                    max: 64,  // ticks until May 2014, will need updating
                    mode: "fixed",
                    step: 1,
                    ticksFrequency: 1,
                    tooltip: true
                });
              //  createTooltip();
                var upperTicks = $("#jqxslider .jqx-slider-tickscontainer:eq(0)").children();
                var lowerTicks = $("#jqxslider .jqx-slider-tickscontainer:eq(1)").children();
                for (var i = 0; i < upperTicks.length; i++) {
                    if (i % 12 !=0) {
                      //  $(upperTicks[i]).css("display", "none");
                        $(lowerTicks[i]).css("display", "none");
                    };
                };
                 $("#sliderDiv").css("display", "block");  
			});
			
				$(document).ready(function () {
                $("#jqxslider2").jqxSlider({
                    theme: 'bootstrap',
                    value: 0,
                    min: 0,
                    max: 5,  // ticks until May 2014, will need updating
                    mode: "fixed",
                    step: 1,
                    ticksFrequency: 1,
                    tooltip: true
                });
              //  createTooltip();
                var upperTicks = $("#jqxslider .jqx-slider-tickscontainer:eq(0)").children();
              //  var lowerTicks = $("#jqxslider .jqx-slider-tickscontainer:eq(1)").children();
              //  for (var i = 0; i < upperTicks.length; i++) {
                  //  if (i % 12 !=0) {
                      //  $(upperTicks[i]).css("display", "none");
                        //$(lowerTicks[i]).css("display", "none");
                  //  };
               // }; 
               
               //tooltip.css('visibility', 'visible');
			});




function sliderSetup () {

	var visibleFatalityLayerIds = [], visibleInjuryLayerIds = [];
	var curFatalityValue, curInjuryValue;
	

			
		/////////////////// monthly slider ///////////////////////////////////////////////////////	

	var thumb = $($('#jqxslider').find('.jqx-slider-slider')[1]), tooltip = createTooltip(), tooltipActive = true;

	thumb.bind('mousedown', function(event) {
		tooltip.css('visibility', 'hidden');
		refreshTooltip($('#jqxslider').jqxSlider('value'));
		tooltipActive = true;
	});

	$(document).bind('mousemove', function(event) {
		if (tooltipActive) {
			refreshTooltip($('#jqxslider').jqxSlider('value'));
		}
	});

	$(document).bind('mouseup', function() {
		tooltip.css('visibility', 'hidden');
		tooltipActive = false;
	});

	function createTooltip() {
		var tooltip = $('<div />');
		$(document.body).append(tooltip);
		tooltip.css('visibility', 'hidden');
		tooltip.fadeTo(0, 2.0);
		tooltip.addClass('jqx-rc-all');
		tooltip.addClass('tooltip');
		return tooltip;
	}

	function refreshTooltip(value) {
		var thumb = $($('#jqxslider').find('.jqx-slider-slider')[1]), thumbX = thumb.offset().left, thumbY = thumb.offset().top;
		tooltip.css('left', thumbX - (tooltip.outerWidth(true) - thumb.outerWidth(true)) / 2);
		tooltip.css('top', thumbY - tooltip.outerHeight(true) - 25);
		var toolTipVal = sliderLookup(value);
		$("#dateLabel").text(toolTipVal);
		$("#date2Label").text(toolTipVal);
		tooltip.text(toolTipVal);
	}
	
	//////////////////////// yearly slider ////////////////////////////////////////////////////////


	/*var thumb = $($('#jqxslider2').find('.jqx-slider-slider')[1]), tooltip = createTooltip(), tooltipActive = true;

	thumb.bind('mousedown', function(event) {
		tooltip.css('visibility', 'visible');
		refreshTooltip($('#jqxslider2').jqxSlider('value'));
		tooltipActive = true;
	});

	$(document).bind('mousemove', function(event) {
		if (tooltipActive) {
			refreshTooltip($('#jqxslider2').jqxSlider('value'));
		}
	});

	$(document).bind('mouseup', function() {
		tooltip.css('visibility', 'hidden');
		tooltipActive = false;
	});

	function createTooltip() {
		var tooltip = $('<div />');
		$(document.body).append(tooltip);
		tooltip.css('visibility', 'visible');
		tooltip.fadeTo(0, 2.0);
		tooltip.addClass('jqx-rc-all');
		tooltip.addClass('tooltip');
		return tooltip;
	}

	function refreshTooltip(value) {
		var thumb = $($('#jqxslider2').find('.jqx-slider-slider')[1]), thumbX = thumb.offset().left, thumbY = thumb.offset().top;
		tooltip.css('left', thumbX - (tooltip.outerWidth(true) - thumb.outerWidth(true)) / 2);
		tooltip.css('top', thumbY - tooltip.outerHeight(true) - 25);
		var toolTipVal = sliderLookup(value);
		tooltip.text(toolTipVal);
	}*/
	
}


function sliderLookup(value) {

	var locMonth, locYear;

	var monthVal = value % 12;
	var yearVal = parseInt(value / 12);

	switch(monthVal) {
		case 0:
			locMonth = "Jan";
			break;
		case 1:
			locMonth = "Feb";
			break;
		case 2:
			locMonth = "March";
			break;
		case 3:
			locMonth = "Apr";
			break;
		case 4:
			locMonth = "May";
			break;
		case 5:
			locMonth = "June";
			break;
		case 6:
			locMonth = "July";
			break;
		case 7:
			locMonth = "Aug";
			break;
		case 8:
			locMonth = "Sept";
			break;
		case 9:
			locMonth = "Oct";
			break;
		case 10:
			locMonth = "Nov";
			break;
		case 11:
			locMonth = "Dec";
			break;
		default:
			locMonth = "Jan";
			break;

	}

	switch(yearVal) {
		case 0:
			locYear = "2009";
			break;
		case 1:
			locYear = "2010";
			break;
		case 2:
			locYear = "2011";
			break;
		case 3:
			locYear = "2012";
			break;
		case 4:
			locYear = "2013";
			break;
		case 5:
			locYear = "2014";
			break;

		default:
			locYear = "2009";
			break;

	}

	var curDate = locMonth + " " + locYear;

	return curDate;

}

function slider2Lookup(value) {
	var locYear;
	
	switch(value) {
		case 0:
			locYear = "2009";
			break;
		case 1:
			locYear = "2010";
			break;
		case 2:
			locYear = "2011";
			break;
		case 3:
			locYear = "2012";
			break;
		case 4:
			locYear = "2013";
			break;
		case 5:
			locYear = "2014 YTD";
			break;

		default:
			locYear = "2009";
			break;

	}

	return locYear;
	
	
}

