//// initial state after docuemtn.load ////////////

function showLoading() {
    $("#loadingImg").show();
}

//show map loading image
function hideLoading() {
    $("#loadingImg").hide();
}

function hideSlider() {
	
    $("#sliderDiv").hide();
    
}

function showSlider() {
    $("#sliderDiv").show();
      $("#sliderDiv").css("opacity", 1);

}


$(document).ready(function() {

	$("#ArterialSlowZone").prop('checked', true);
	$("#ArterialSlowZone").addClass('active');
	$("#SafeStreetsForSeniors").prop('checked', false);
	$("#NeighborhoodSlowZone").prop('checked', false);
	$("#EngineeringImprovements").prop('checked', false);
	$("#SpeedHump").prop('checked', false);
	$("#LeadingPedestrianSignals").prop('checked', false);

	$("#Schools").prop('checked', true);
	$("#Schools").addClass('active');
	$("#TLC").prop('checked', false);
	$("#TownHallMeeting").prop('checked', false);
	$("#Workshops").prop('checked', false);
	$("#SeniorCenters").prop('checked', false);
	
	$("#summaryInjuries").prop('checked', true);
	$("#summaryInjuries").addClass('active');
	police = true, community= false, council=false;
	injurySum = true, fatalitySum = false;
	
	
	//$(".btn.btn-default.districtBtns

});

$(".categoriesNav").on('touchstart click', function() {

	var id = this.id;

	allCrashLayersOff();
	removeLayer();
	allLayersOff();
	map.infoWindow.hide();

	if (id == "summaryCat") {

		summaryInjuryLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_INJURIES/MapServer", {
			id : "summaryInjuryLayer",opacity : .8

		});
		AddLayer(summaryInjuryLayer,false);
		/*summaryInjuryLayer.on("update-start", function () {
		    showLoading();
		});

		summaryInjuryLayer.on("update-end", function () {
		    hideLoading();
		});
		map.addLayer(summaryInjuryLayer);*/
		summaryFatalityLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_FATALITIES/MapServer", {
			id : "summaryFatalityLayer"//,opacity : .8

		});
		AddLayer(summaryFatalityLayer,false);
		/*summaryFatalityLayer.on("update-start", function () {
		    showLoading();
		});

		summaryFatalityLayer.on("update-end", function () {
		    hideLoading();
		});
		map.addLayer(summaryFatalityLayer);*/
		console.log("injurSum = " + injurySum + "    fatalitySum = " + fatalitySum);
		
		if (injurySum) {summaryInjuryLayer.setVisibility(true);  summaryFatalityLayer.setVisibility(false);}
		else if (fatalitySum) {summaryInjuryLayer.setVisibility(false);  summaryFatalityLayer.setVisibility(true);}
		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");
		$("#date3Label").css("display", "none");
		fatality = false;
		injury = false;
		monthly = false;
		yearly = false;
		//var summaryLayerIDs = [];
		setTimeout(function(){ checkSummaryBtns(summaryLayerIDs);}, 20);

	} else if (id == "interventionCat") {

		interventionLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SAFETY_INTERVENTION/MapServer", {
			id : "interventionLayer",opacity : .8

		});
		AddLayer(interventionLayer,true);
		/*interventionLayer.on("update-start", function () {		    
		    showLoading();		    
		});

		interventionLayer.on("update-end", function () {		    
		    hideLoading();		    
		});
        */
		//map.addLayer(interventionLayer);
		interventions = true;
		interventionLayerIDs = [];
		setTimeout(function() {
			checkInterventionBtns(interventionLayerIDs);
		}, 30);

		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");
		$("#date3Label").css("display", "none");

	} else if (id == "outreachCat") {

		outreachLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer", {
			id : "outreachLayer",opacity : .8

		});
		AddLayer(outreachLayer, true);
		
		outreach = true;
		outreachLayerIDs = [];

		setTimeout(function() {
			checkOutreachBtns(outreachLayerIDs);
		}, 30);

		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");
		$("#date3Label").css("display", "none");
		

	} else if (id == "injuryCat") {

		checkCrashCatState();
		$("#sliderDiv").css("display", "block");
		$("#labelDiv").css("display", "block");
		$("#date3Label").css("display", "block");
		
		
		if (monthly) {
			$("#jqxslider").css("display", "block");
			$("#jqxslider2").css("display", "none");
		} else if (yearly) {
			$("#jqxslider2").css("display", "block");
			$("#jqxslider").css("display", "none");

		}
	}

});

function removeLayer() {
	var layer1 = map.getLayer("outreachLayer");
	var layer2 = map.getLayer("interventionLayer");
	var layer3 = map.getLayer("referenceLayer");
	var layer4 = map.getLayer("summaryInjuryLayer");
	var layer5 = map.getLayer("summaryFatalityLayer");
	if (layer1)
		map.removeLayer(layer1);
	if (layer2)
		map.removeLayer(layer2);
	if (layer3)
		map.removeLayer(layer3);
	if (layer4)
		map.removeLayer(layer4);
	if (layer5)
		map.removeLayer(layer5);
		
}

function allLayersOff() {
	fatality = false;
	injury = false;
	monthly = false;
	yearly = false;
	interventions = false;
	outreach = false;
	//summaryFatalities = false;
//	summaryInjuries = false;
	//injurySum = false;
	//fatalitySum = false;

}

function disableCatButtons(){
       $("#injuryCat").attr("disabled","disabled");
       $("#interventionCat").attr("disabled","disabled");
       $("#outreachCat").attr("disabled","disabled");
       $("#summaryCat").attr("disabled","disabled");
}



function enableCatButtons(){
       $("#injuryCat").removeAttr("disabled");
       $("#interventionCat").removeAttr("disabled");
       $("#outreachCat").removeAttr("disabled");
       $("#summaryCat").removeAttr("disabled");
}
