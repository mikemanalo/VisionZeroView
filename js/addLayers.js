///////////////////// SAFETY INTERVENTIONS //////////////////////////////////////////////////////////////


$(".interventionBtns").on("touchstart  click", function() {
map.infoWindow.hide();
	interventionLayerIDs = [];
	var test = this;

	interventionLayerIDs.length = 0;
	setTimeout(function() {
		if ($(test).hasClass('active')) {
			$(test).css("background-color", "#e4e4e4");
						$( test ).find( "i" ).css( "opacity", 1);
			$( test ).find( "span" ).css( "opacity", 1);
		} else {
			$(test).css("background-color", "white");
									$( test ).find( "i" ).css( "opacity", .6);
			$( test ).find( "span" ).css( "opacity", .6);

		}
	}, 20);


	setTimeout(function() {
		checkInterventionBtns(interventionLayerIDs);
	}, 20);

});

function checkInterventionBtns(interventionLayerIDs) {

	if (hasClass('ASZBtn', 'active')){

		var locID = 3;
		interventionLayerIDs.push(locID);

	}

	if (hasClass('SSFSBtn', 'active')){

		var locID = 5;
		interventionLayerIDs.push(locID);
	}

	if (hasClass('slowZonesBtn', 'active')){

		var locID = 6;
		interventionLayerIDs.push(locID);
	}

	if (hasClass('engineeringBtn', 'active')){

		var locID = 1;
		var locID2 = 2;
		interventionLayerIDs.push(locID, locID2);
	}

	if (hasClass('speedHumpsBtn', 'active')){

		var locID = 4;
		interventionLayerIDs.push(locID);
	}


	if (hasClass('LPIBtn', 'active')){

		var locID = 0;
		interventionLayerIDs.push(locID);
	}
	
	if(interventionLayerIDs.length === 0){
	
	  interventionLayerIDs.push(-1);
	}

	
	interventionLayer.setVisibleLayers(interventionLayerIDs);

}

/////////////////////////  OUTREACH /////////////////////////////////////////////////////////////////////////////////


$(".outreachBtns").on("touchstart  click", function() {
	map.infoWindow.hide();
	outreachLayerIDs = [];

	outreachLayerIDs.length = 0;
	

	var test = this;

	setTimeout(function() {
		if ($(test).hasClass('active')) {
			$(this).removeClass('active');
			$(test).css("background-color", "#e4e4e4");
			$( test ).find( "i" ).css( "opacity", 1);
			$( test ).find( "span" ).css( "opacity", 1);
	
		} else {
			$(this).addClass('active');
			$(test).css("background-color", "white");
			$( test ).find( "i" ).css( "opacity", .6);
			$( test ).find( "span" ).css( "opacity", .6);

		}
	}, 30);

	setTimeout(function() {
		checkOutreachBtns(outreachLayerIDs);
	}, 20);

});

function checkOutreachBtns(outreachLayerIDs) {

	if (hasClass('SchoolBtn', 'active')) {
		var locID = 0;
		outreachLayerIDs.push(locID);
		//$("#Schools").prop('checked', 'checked');

	}
	
	if (hasClass('SeniorBtn', 'active')) {

		var locID = 1;
		outreachLayerIDs.push(locID);

	}
	if (hasClass('TLCBtn', 'active')) {

		var locID = 2;
		outreachLayerIDs.push(locID);

	}
	if (hasClass('TownHallBtn', 'active')) {

		var locID = 3;
		outreachLayerIDs.push(locID);

	}
	if (hasClass('WorkshopBtn', 'active')) {

		var locID = 4;
		outreachLayerIDs.push(locID);

	}
	if (hasClass('StreetTeamBtn', 'active')) {

		var locID = 5;
		outreachLayerIDs.push(locID);

	}
	
	if(outreachLayerIDs.length === 0){
	
	  outreachLayerIDs.push(-1);
	}

	
	outreachLayer.setVisibleLayers(outreachLayerIDs);




}

function hasClass(elementID, className)
{
var classList = document.getElementById(elementID).className.split(/\s+/);
for (var i = 0; i < classList.length; i++) {
   if(classList[i]==className)
   {
	return true;
   }
     //do something
   }
   return false;
}
///////////////////////////////// SUMMARY ////////////////////////////////////////////////////////////////////

function checkSummaryLegend() {


	if (injurySum) {

		if (police) {
			$("#injurySumLegendType").text("Police Precinct");

		} else if (community) {
			$("#injurySumLegendType").text("Community District");

		} else if (council) {
			$("#injurySumLegendType").text("City Council District");

		}
		$("#injurySumLegend").css("display", "block");
		$("#fatalitySumLegend").css("display", "none");
	} else if (fatalitySum) {

		if (police) {
			$("#fatalSumLegendType").text("Police Precinct");

		} else if (community) {
			$("#fatalSumLegendType").text("Community District");

		} else if (council) {
			$("#fatalSumLegendType").text("City Council District");

		}
		$("#injurySumLegend").css("display", "none");
		$("#fatalitySumLegend").css("display", "block");
	}

}


$(".summarySwitchBtns").on("touchstart  click", function() {
	map.infoWindow.hide();

	summaryLayerIDs.length = 0;

	setTimeout(function() {
		if ($("#summaryInjuries").hasClass('active')) {
			$("#summaryFatalities").css("color", "#777");
			$("#summaryInjuries").css("color", "white");
			injurySum = true;
			fatalitySum = false;

		} else if ($("#summaryFatalities").hasClass('active')) {
			$("#summaryInjuries").css("color", "#777");
			$("#summaryFatalities").css("color", "white");
			fatalitySum = true;
			injurySum = false;

		}
	}, 20);

	setTimeout(function() {
		checkSummaryBtns(summaryLayerIDs);
	}, 20);

});

$(".districtBtns").on("touchstart  click", function() {
	map.infoWindow.hide();

	var sumView = ($(this).find('input').attr('id'));

	summaryLayerIDs.length = 0;
	var locID; ($('.districtBtns').css("background-color", "rgb(255,255,255)"));
	$('.districtBtns').css("color", "#777"); ($(this).css("background-color", "#3276b1")); ($(this).css("color", "white"));

	if (sumView == "policePrecinct") {
		police = true, community = false, council = false;

		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	} else if (sumView == "communityDistrict") {
		police = false, community = true, council = false;

		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	} else if (sumView == "cityCouncilDistrict") {
		police = false, community = false, council = true;

		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	}
});

function checkSummaryBtns(summaryLayerIDs) {

	summaryLayerIDs.length = 0;

	if (police)
		summaryLayerIDs.push(0);
	else if (community)
		summaryLayerIDs.push(1);
	else if (council)
		summaryLayerIDs.push(2);

	if (injurySum) {
		summaryInjuryLayer.setVisibility(true);
		summaryFatalityLayer.setVisibility(false);
		summaryInjuryLayer.setVisibleLayers(summaryLayerIDs);
	} else if (fatalitySum) {
		summaryInjuryLayer.setVisibility(false);
		summaryFatalityLayer.setVisibility(true);
		summaryFatalityLayer.setVisibleLayers(summaryLayerIDs);
	}

	checkSummaryLegend();


}
