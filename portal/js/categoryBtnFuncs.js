
//// initial state after docuemtn.load ////////////

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

        /*summaryInjuryLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_INJURIES/MapServer", {
                     id : "summaryInjuryLayer",opacity : .8

              });
              AddLayer(summaryInjuryLayer,false);*/

        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_INJURIES/MapServer";
        _layerID = "summaryInjuryLayer";
        summaryInjuryLayer = AddDynamicLayer(_layerURL, _layerID, true);

        _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_FATALITIES/MapServer";
        _layerID = "summaryFatalityLayer";
        summaryFatalityLayer = AddDynamicLayer(_layerURL, _layerID, true);

        /*summaryFatalityLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_FATALITIES/MapServer", {
                     id : "summaryFatalityLayer"//,opacity : .8

              });
              AddLayer(summaryFatalityLayer,false);*/

        console.log("injurSum = " + injurySum + "    fatalitySum = " + fatalitySum);

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
        /*
              interventionLayer = new esri.layers.ArcGISDynamicMapServiceLayer(, {
                     id : "interventionLayer",opacity : .8

              });
              AddLayer(interventionLayer,true);
              interventionLayer.on("update-start", function () {                
                  showLoading();             
              });

              interventionLayer.on("update-end", function () {                  
                  hideLoading();             
              });
        */
        //map.addLayer(interventionLayer);


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
        /*
              outreachLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer", {
                     id : "outreachLayer",opacity : .8

              });
              AddLayer(outreachLayer, true);*/

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
       // $('#map_layers img[src*=OUTREACH]').parent().remove();
       }
    if (layer2){
        map.removeLayer(layer2);
     //   $('#map_layers img[src*=INTERVENTION]').parent().remove();
     }
    if (layer3){
        map.removeLayer(layer3);
      }
    if (layer4){
        map.removeLayer(layer4);
      //   $('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
        }
    if (layer5){
        map.removeLayer(layer5);
      //  $('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
	}
}

function allLayersOff() {
    fatality = false;
    injury = false;
    monthly = false;
    yearly = false;
    interventions = false;
    outreach = false;
    //summaryFatalities = false;
    // summaryInjuries = false;
    //injurySum = false;
    //fatalitySum = false;

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
		//$('#map_layers img[src*=INTERVENTION]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
		$('#map_layers img[src*=OUTREACH]').parent().remove();
	}
	if (activeCategory == "outreachCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
		//$('#map_layers img[src*=OUTREACH]').parent().remove();
	}
	if (activeCategory == "summaryCat") {

		$('#map_layers img[src*=INTERVENTION]').parent().remove();
		//$('#map_layers img[src*=SUMMARY_2014_INJURIES]').parent().remove();
		//$('#map_layers img[src*=SUMMARY_2014_FATALITIES]').parent().remove();
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
