//// initial state after docuemtn.load ////////////
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

});

$(".categoriesNav").on('click', function() {

	var id = this.id;

	allCrashLayersOff();
	removeLayer();
	allLayersOff();

	if (id == "referenceCat") {

		referenceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_POLICEPRE_INJURIES/MapServer", {
			id : "referenceLayer",
			opacity : .8

		});
		map.addLayer(referenceLayer);
		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");
		fatality = false;
		injury = false;
		monthly = false;
		yearly = false;

	} else if (id == "interventionCat") {

		interventionLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/SAFETY_INTERVENTION/MapServer", {
			id : "interventionLayer",
			opacity : .8

		});
		map.addLayer(interventionLayer);
		var interventionLayerIDs = [];
		setTimeout(function() {
			checkInterventionBtns(interventionLayerIDs);
		}, 30);

		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");

	} else if (id == "outreachCat") {

		outreachLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer", {
			id : "outreachLayer",
			opacity : .8

		});
		map.addLayer(outreachLayer);
		var outreachLayerIDs = [];

		setTimeout(function() {
			checkOutreachBtns(outreachLayerIDs);
		}, 30);

		$("#sliderDiv").css("display", "none");
		$("#jqxslider").css("display", "none");
		$("#jqxslider2").css("display", "none");
		$("#labelDiv").css("display", "none");

	} else if (id == "injuryCat") {

		checkCrashCatState();
		$("#sliderDiv").css("display", "block");
		$("#labelDiv").css("display", "block");
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
	if (layer1)
		map.removeLayer(layer1);
	if (layer2)
		map.removeLayer(layer2);
	if (layer3)
		map.removeLayer(layer3);

}

function allLayersOff() {
	fatality = false;
	injury = false;
	monthly = false;
	yearly = false;
	interventions = false;
	outreach = false;
	summaryFatalities = false;
	summaryInjuries = false;
}

