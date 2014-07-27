function addCrashLocations() {
	//pointMap = true;
	var visibleFatalityLayerIds = [], visibleInjuryLayerIds = [];
	var curFatalityValue, curInjuryValue;

	var thumb = $($('#jqxslider').find('.jqx-slider-slider')[1]), tooltip = createTooltip(), tooltipActive = true;

	thumb.bind('mousedown', function(event) {
		tooltip.css('visibility', 'visible');
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
		tooltip.css('visibility', 'visible');
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
		tooltip.text(toolTipVal);
	}

	if (fatality && pointMap) {
						$('#jqxslider2').css("display", "none");
		$('#jqxslider').css("display", "block");

		allInjuryLayer.setVisibility(false);
		allFatalityLayer.setVisibility(true);
		allInjHeat09.setVisibility(false); allInjHeat10.setVisibility(false); allInjHeat11.setVisibility(false);
		 allInjHeat12.setVisibility(false); allInjHeat13.setVisibility(false); allInjHeat14.setVisibility(false);
		 		allFatalHeat09.setVisibility(false); allFatalHeat10.setVisibility(false); allFatalHeat11.setVisibility(false);
		 allFatalHeat12.setVisibility(false); allFatalHeat13.setVisibility(false); allFatalHeat14.setVisibility(false);


		/////// new June 17 ////////////////////////
		$('#jqxslider').bind('change', function(event) {
			map.infoWindow.hide();
			curFatalityValue = $('#jqxslider').jqxSlider('getValue');

			visibleFatalityLayerIds.length = 0;
			

			visibleFatalityLayerIds.push(curFatalityValue);

			allFatalityLayer.setVisibleLayers(visibleFatalityLayerIds);

		});
	} else if (injury && pointMap) {
						$('#jqxslider2').css("display", "none");
		$('#jqxslider').css("display", "block");
		console.log("get heree?");

		allFatalityLayer.setVisibility(false);
		allInjuryLayer.setVisibility(true);
				allInjHeat09.setVisibility(false); allInjHeat10.setVisibility(false); allInjHeat11.setVisibility(false);
		 allInjHeat12.setVisibility(false); allInjHeat13.setVisibility(false); allInjHeat14.setVisibility(false);
		 		 		allFatalHeat09.setVisibility(false); allFatalHeat10.setVisibility(false); allFatalHeat11.setVisibility(false);
		 allFatalHeat12.setVisibility(false); allFatalHeat13.setVisibility(false); allFatalHeat14.setVisibility(false);

		/////// new June 17 ////////////////////////
		$('#jqxslider').bind('change', function(event) {
			curInjuryValue = $('#jqxslider').jqxSlider('getValue');

			visibleInjuryLayerIds.length = 0;

			visibleInjuryLayerIds.push(curInjuryValue);

			allInjuryLayer.setVisibleLayers(visibleInjuryLayerIds);

		});
	}
	else if (injury && heatMap) {
		fatality = false;
		console.log("get her?");
				$('#jqxslider').css("display", "none");
		$('#jqxslider2').css("display", "block");
		allInjHeat09.setVisibility(true);

		allFatalityLayer.setVisibility(false);
		allInjuryLayer.setVisibility(false);

		allInjHeat10.setVisibility(false); allInjHeat11.setVisibility(false);
		allInjHeat12.setVisibility(false); allInjHeat13.setVisibility(false); allInjHeat14.setVisibility(false);
		
		allFatalHeat09.setVisibility(false); allFatalHeat10.setVisibility(false); allFatalHeat11.setVisibility(false);
		allFatalHeat12.setVisibility(false); allFatalHeat13.setVisibility(false); allFatalHeat14.setVisibility(false);
		
		
			$('#jqxslider2').on('change', function(event) {
				if (!fatality){
			console.log("j2 change");
				allInjHeat09.setVisibility(false); allInjHeat10.setVisibility(false); allInjHeat11.setVisibility(false);
		allInjHeat12.setVisibility(false); allInjHeat13.setVisibility(false); allInjHeat14.setVisibility(false);
		
			var curSliderVal = $('#jqxslider2').jqxSlider('getValue');
		switch (curSliderVal){

			case 0: allInjHeat09.setVisibility(true); break;
			case 1: allInjHeat10.setVisibility(true); break;
			case 2: allInjHeat11.setVisibility(true); break;
			case 3: allInjHeat12.setVisibility(true); break;
			case 4: allInjHeat13.setVisibility(true); break;
			case 5: allInjHeat14.setVisibility(true); break;
			default: allInjHeat09.setVisibility(true); break;
			
		}
		}
		 
		}); 
		

	}
	
		else if (fatality && heatMap) {
			injury = false;
		console.log("get herfat?");
				$('#jqxslider').css("display", "none");
		$('#jqxslider2').css("display", "block");
		allFatalHeat09.setVisibility(true);

		allFatalityLayer.setVisibility(false);
		allInjuryLayer.setVisibility(false);

		allInjHeat09.setVisibility(false);allInjHeat10.setVisibility(false); allInjHeat11.setVisibility(false);
		allInjHeat12.setVisibility(false); allInjHeat13.setVisibility(false); allInjHeat14.setVisibility(false);
		
		 allFatalHeat10.setVisibility(false); allFatalHeat11.setVisibility(false);
		allFatalHeat12.setVisibility(false); allFatalHeat13.setVisibility(false); allFatalHeat14.setVisibility(false);
		
		
			$('#jqxslider2').on('change', function(event) {
				if (!injury){
			console.log("j2 change fat");
			allFatalHeat09.setVisibility(false);	 allFatalHeat10.setVisibility(false); allFatalHeat11.setVisibility(false);
		allFatalHeat12.setVisibility(false); allFatalHeat13.setVisibility(false); allFatalHeat14.setVisibility(false);
		
			var curSliderVal = $('#jqxslider2').jqxSlider('getValue');
		switch (curSliderVal){

			case 0: allFatalHeat09.setVisibility(true); break;
			case 1: allFatalHeat10.setVisibility(true); break;
			case 2: allFatalHeat11.setVisibility(true); break;
			case 3: allFatalHeat12.setVisibility(true); break;
			case 4: allFatalHeat13.setVisibility(true); break;
			case 5: allFatalHeat14.setVisibility(true); break;
			default: allFatalHeat09.setVisibility(true); break;
			
		}
			}
		 
		}); 
	

	}
	
	
	
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


//// new June 20 //////



    
    
//////////////////////////////////////////////////////////////////////////////