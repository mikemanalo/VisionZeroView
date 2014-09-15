
//// initial state after docuemtn.load ////////////

var activeCategory;

function showLoading() {
	$('button').addClass('disabled'); 
    $('button').prop('disabled', true);
    
    $('a').addClass('disabled');
    $('a').prop('disabled', true);
    $('a').attr('disabled', true);

    $("#loadingImg").show();
}

//show map loading image
function hideLoading() {
	$('button').removeClass('disabled');
    $('button').prop('disabled', false);
    
    $('a').removeClass('disabled');
    $('a').prop('disabled', false);
    $('a').attr('disabled', false);


    $("#loadingImg").hide();
}

function hideSlider() {

    $("#sliderDiv").hide();

}

function showSlider() {
    $("#sliderDiv").show();
    $("#sliderDiv").css("opacity", 1);

}


$(document).ready(function () {
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
    $("#allLabel").addClass('active');
    police = true, community = false, council = false;
    injurySum = true, fatalitySum = false;
    all = true; ped = false, bike = false, motor = false;
});


$(".categoriesNav").on(evt, function () {
    var id = this.id;
    activeCategory = id;

    allCrashLayersOff();
    removeLayer();
    allLayersOff();

    setTimeout(function () {
        CategoryNav(id);
    }, 1000);

});

function CategoryNav(id) {

    map.infoWindow.hide();
    var _layerURL, _layerID;

    if (id == "summaryCat") {

        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_INJURIES/MapServer";
        _layerID = "summaryInjuryLayer";
        summaryInjuryLayer = AddDynamicLayer(_layerURL, _layerID, true);

        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_FATALITIES/MapServer";
        _layerID = "summaryFatalityLayer";
        summaryFatalityLayer = AddDynamicLayer(_layerURL, _layerID, true);



        if (injurySum) { summaryInjuryLayer.setVisibility(true); summaryFatalityLayer.setVisibility(false); }
        else if (fatalitySum) { summaryInjuryLayer.setVisibility(false); summaryFatalityLayer.setVisibility(true); }
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
        setTimeout(function () { checkSummaryBtns(summaryLayerIDs); }, 20);

    } else if (id == "interventionCat") {



        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SAFETY_INTERVENTION/MapServer";
        _layerID = "interventionLayer";
        interventionLayer = AddDynamicLayer(_layerURL, _layerID, true);

        interventions = true;
        interventionLayerIDs = [];
        setTimeout(function () {
            checkInterventionBtns(interventionLayerIDs);
        }, 30);

        $("#sliderDiv").css("display", "none");
        $("#jqxslider").css("display", "none");
        $("#jqxslider2").css("display", "none");
        $("#labelDiv").css("display", "none");
        $("#date3Label").css("display", "none");

    } else if (id == "outreachCat") {

        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer";
        _layerID = "outreachLayer";
        outreachLayer = AddDynamicLayer(_layerURL, _layerID, true);


        outreach = true;
        outreachLayerIDs = [];

        setTimeout(function () {
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
       // toggleCrashLayers();
    }

}
function removeLayer() {
    var layer1 = map.getLayer("outreachLayer");
    var layer2 = map.getLayer("interventionLayer");
    var layer3 = map.getLayer("referenceLayer");
    var layer4 = map.getLayer("summaryInjuryLayer");
    var layer5 = map.getLayer("summaryFatalityLayer");
    if (layer1){
        map.removeLayer(layer1);

       }
    if (layer2){
        map.removeLayer(layer2);

     }
    if (layer3){
        map.removeLayer(layer3);
      }
    if (layer4){
        map.removeLayer(layer4);

        }
    if (layer5){
        map.removeLayer(layer5);

	}
}

function allLayersOff() {
    fatality = false;
    injury = false;
    monthly = false;
    yearly = false;
    interventions = false;
    outreach = false;

}

function disableCatButtons() {
    $("#injuryCat").attr("disabled", "disabled");
    $("#interventionCat").attr("disabled", "disabled");
    $("#outreachCat").attr("disabled", "disabled");
    $("#summaryCat").attr("disabled", "disabled");
}



function enableCatButtons() {
    $("#injuryCat").removeAttr("disabled");
    $("#interventionCat").removeAttr("disabled");
    $("#outreachCat").removeAttr("disabled");
    $("#summaryCat").removeAttr("disabled");
}

function GhostLayerCleanup() {

	if (activeCategory == "interventionCat") {
	
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
		$('#map_layers img[src*=OUTREACH]').parent().remove();
	}
	if (activeCategory == "outreachCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();

	}
	if (activeCategory == "summaryCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().remove();
		$('#map_layers img[src*=OUTREACH]').parent().remove();
	}
	if (activeCategory == "injuryCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
		$('#map_layers img[src*=OUTREACH]').parent().remove();
	}
}

function LayerVisibility() {

	if (activeCategory == "interventionCat") {
		$('#map_layers img[src*=INTERVENTION]').parent().show();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().hide();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().hide();
		$('#map_layers img[src*=OUTREACH]').parent().hide();
	}
	if (activeCategory == "outreachCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().hide();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().hide();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().hide();
		$('#map_layers img[src*=OUTREACH]').parent().show();
	}
	if (activeCategory == "summaryCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().hide();
		//$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().show();
		//$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().show();
		$('#map_layers img[src*=OUTREACH]').parent().hide();
	}
	if (activeCategory == "injuryCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().hide();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().hide();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().hide();
		$('#map_layers img[src*=OUTREACH]').parent().hide();
	}
}
