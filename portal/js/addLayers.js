///////////////////// SAFETY INTERVENTIONS //////////////////////////////////////////////////////////////
//////////// new July 25 ///////////




$(document).ready(function() {
	console.log("body?");
	//	$("#page").css("visibility", "visible");

});
dojo.connect(map, "onload", function() {
	console.log("loaded");

});

$(".interventionBtns").on(" touchstart  click", function() {
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
	}, 30);

	//interventionLayer.setVisibleLayers();
	console.log(interventionLayerIDs);
	//$("#ArterialSlowZone").removeAttr("checked");

	setTimeout(function() {
		checkInterventionBtns(interventionLayerIDs);
	}, 20);

});

function checkInterventionBtns(interventionLayerIDs) {

	//if ($("#ArterialSlowZone").is(':checked')) {
	if (hasClass('ASZBtn', 'active')){

		var locID = 3;
		interventionLayerIDs.push(locID);

	}

	//if ($("#SafeStreetsForSeniors").is(':checked')) {
	if (hasClass('SSFSBtn', 'active')){

		var locID = 5;
		interventionLayerIDs.push(locID);
	}

	//if ($("#NeighborhoodSlowZone").is(':checked')) {
	if (hasClass('slowZonesBtn', 'active')){

		var locID = 6;
		interventionLayerIDs.push(locID);
	}

	//if ($("#EngineeringImprovements").is(':checked')) {
	if (hasClass('engineeringBtn', 'active')){

		var locID = 1;
		var locID2 = 2;
		interventionLayerIDs.push(locID, locID2);
	}

	//if ($("#SpeedHump").is(':checked')) {
	if (hasClass('speedHumpsBtn', 'active')){

		var locID = 4;
		interventionLayerIDs.push(locID);
	}

	//if ($("#LeadingPedestrianSignals").is(':checked')) {
	if (hasClass('LPIBtn', 'active')){

		var locID = 0;
		interventionLayerIDs.push(locID);
	}

	interventionLayer.setVisibleLayers(interventionLayerIDs);
	console.log(interventionLayerIDs);

}

/////////////////////////  OUTREACH /////////////////////////////////////////////////////////////////////////////////
/*
$(".list_item1").on("click", function() {
console.log("get to listitem?");
var thisCheckbox = this;
setTimeout(function() {
//if ($(this).addClass('active');
 //if ($(thisCheckbox).is(':checked')) {
 if ($(thisCheckbox).is(':checked')) {
  console.log("checked");
 $(thisCheckbox).prop('checked', 'checked');

 }
else if (!$(thisCheckbox).is(':checked')){
console.log("get to  this one");
$(thisCheckbox).prop('checked', 'false');
}
 }, 60);
});

$(".list_item").click(function(){

    if(this.checked)
    {
        $(".list_item").each(function(){this.checked= true;});

    }
    else
    {

        $(".list_item").each(function(){this.checked= false;});

    }

});*/


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
		//	$(test).prop('checked', 'checked');
		} else {
			$(this).addClass('active');
			$(test).css("background-color", "white");
			$( test ).find( "i" ).css( "opacity", .6);
			$( test ).find( "span" ).css( "opacity", .6);

		}
	}, 30);

	//outreachLayer.setVisibleLayers(outreachLayerIDs);
	//console.log(outreachLayerIDs);

	setTimeout(function() {
		checkOutreachBtns(outreachLayerIDs);
	}, 20);

});

function checkOutreachBtns(outreachLayerIDs) {
/*
	if ($("#Schools").is(':checked')) {

		var locID = 0;
		outreachLayerIDs.push(locID);
		$("#Schools").prop('checked', 'checked');

	}
	if ($("#SeniorCenters").is(':checked')) {

		var locID = 1;
		outreachLayerIDs.push(locID);
		console.log("seniors added");

	}
	if ($("#TLC").is(':checked')) {

		var locID = 2;
		outreachLayerIDs.push(locID);
		console.log("tlc added");

	}
	if ($("#TownHallMeeting").is(':checked')) {

		var locID = 3;
		outreachLayerIDs.push(locID);
		console.log("townhall added");
		outreachLayerIDs.push(locID);

	}
	if ($("#Workshops").is(':checked')) {

		var locID = 4;
		outreachLayerIDs.push(locID);
		console.log("workshops added");
		outreachLayerIDs.push(locID);

	}
	outreachLayer.setVisibleLayers(outreachLayerIDs);
	console.log(outreachLayerIDs);
*/

	//if ($("#Schools").hasClass('active')) {
	if (hasClass('SchoolBtn', 'active')) {
		console.log("School checked");
		var locID = 0;
		outreachLayerIDs.push(locID);
		$("#Schools").prop('checked', 'checked');

	}
	
	if (hasClass('SeniorBtn', 'active')) {

		var locID = 1;
		outreachLayerIDs.push(locID);
		console.log("seniors added");

	}
	if (hasClass('TLCBtn', 'active')) {

		var locID = 2;
		outreachLayerIDs.push(locID);
		console.log("tlc added");

	}
	if (hasClass('TownHallBtn', 'active')) {

		var locID = 3;
		outreachLayerIDs.push(locID);
		console.log("townhall added");
		outreachLayerIDs.push(locID);

	}
	if (hasClass('WorkshopBtn', 'active')) {

		var locID = 4;
		outreachLayerIDs.push(locID);
		console.log("workshops added");
		outreachLayerIDs.push(locID);

	}
	outreachLayer.setVisibleLayers(outreachLayerIDs);




}

function hasClass(elementID, className)
{
var classList = document.getElementById(elementID).className.split(/\s+/);
for (var i = 0; i < classList.length; i++) {
   if(classList[i]==className)
   {
	return true
   }
     //do something
   }
   return false;
}
///////////////////////////////// SUMMARY ////////////////////////////////////////////////////////////////////

function checkSummaryLegend() {
	//var locScale = map.getScale();
	//	console.log("year: " + yearly + " month: " + monthly + "  injury: " + injury + " fatality: " + fatality );

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

//	var police, community, council;
//var injurySum, fatalitySum;

$(".summarySwitchBtns").on("touchstart  click", function() {
	map.infoWindow.hide();
	//summaryLayerIDs = [];

	summaryLayerIDs.length = 0;
	/*if (injurySum) {
		summaryInjuryLayer.setVisibleLayers(summaryLayerIDs);
	} else if (fatalitySum) {
		summaryFatalityLayer.setVisibleLayers(summaryLayerIDs);
	}*/
	console.log(summaryLayerIDs);
	setTimeout(function() {
		if ($("#summaryInjuries").hasClass('active')) {
			$("#summaryFatalities").css("color", "#777");
			$("#summaryInjuries").css("color", "white");
			console.log("injury active");
			injurySum = true;
			fatalitySum = false;
			//summaryInjuryLayer.setVisibility(true);
			//summaryFatalityLayer.setVisibility(false);

			//	checkSummaryInjuryBtns(summaryLayerIDs);
		} else if ($("#summaryFatalities").hasClass('active')) {
			$("#summaryInjuries").css("color", "#777");
			$("#summaryFatalities").css("color", "white");
			console.log("fatality active");
			fatalitySum = true;
			injurySum = false;
			//summaryInjuryLayer.setVisibility(false);
			//summaryFatalityLayer.setVisibility(true);
			
			//	checkSummaryFatalityBtns(summaryLayerIDs);
		}
	}, 20);

	setTimeout(function() {
		checkSummaryBtns(summaryLayerIDs);
	}, 20);

});

$(".districtBtns").on("touchstart  click", function() {
	map.infoWindow.hide();
	//police, community, council;

	var sumView = ($(this).find('input').attr('id'));
	//	summaryLayerIDs = [];
	summaryLayerIDs.length = 0;
	var locID; ($('.districtBtns').css("background-color", "rgb(255,255,255)"));
	$('.districtBtns').css("color", "#777"); ($(this).css("background-color", "#3276b1")); ($(this).css("color", "white"));

	if (sumView == "policePrecinct") {
		police = true, community = false, council = false;
		console.log("precinct");
		//id push here
		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	} else if (sumView == "communityDistrict") {
		police = false, community = true, council = false;
		console.log("communityDistrict");
		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	} else if (sumView == "cityCouncilDistrict") {
		police = false, community = false, council = true;
		console.log("cityCouncilDistrict");
		setTimeout(function() {
			checkSummaryBtns(summaryLayerIDs);
		}, 20);
	}
});

function checkSummaryBtns(summaryLayerIDs) {

	console.log("check");
	//	summaryLayerIDs = [];
	summaryLayerIDs.length = 0;

	if (police)
		summaryLayerIDs.push(0);
	else if (community)
		summaryLayerIDs.push(1);
	else if (council)
		summaryLayerIDs.push(2);

	if (injurySum) {
		console.log("get here?");
		summaryInjuryLayer.setVisibility(true);
		summaryFatalityLayer.setVisibility(false);
		summaryInjuryLayer.setVisibleLayers(summaryLayerIDs);
	} else if (fatalitySum) {
		summaryInjuryLayer.setVisibility(false);
		summaryFatalityLayer.setVisibility(true);
		summaryFatalityLayer.setVisibleLayers(summaryLayerIDs);
	}

	checkSummaryLegend();

	console.log(summaryLayerIDs);

}
