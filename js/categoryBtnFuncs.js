




$(".categoriesNav").on('click', function() {
	console.log("get to func?");
	var id = this.id;
	console.log("id? " + id);
	
	
	allCrashLayersOff();
	removeLayer();
	
	
	if (id=="referenceCat"){
		
	var	referenceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_POLICEPRE_INJURIES/MapServer", {
		id : "referenceLayer"
		,opacity:.8

	});
	map.addLayer(referenceLayer);
			$("#jqxslider").css("display", "none");
	//$("#jqxslider2").css("visibility", "hidden");
		
		
	}
	
	else	if (id=="interventionCat"){
		
	var	interventionLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/SAFETY_INTERVENTION/MapServer", {
		id : "interventionLayer"
		,opacity:.8

	});
	map.addLayer(interventionLayer);
		$("#jqxslider").css("display", "none");
	//$("#jqxslider2").css("visibility", "hidden");
		
		
	}
	
		else	if (id=="outreachCat"){
		
	var	outreachLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer", {
		id : "outreachLayer"
		,opacity:.8

	});
	map.addLayer(outreachLayer);
		$("#jqxslider").css("display", "none");
	//$("#jqxslider2").css("visibility", "hidden");
		
		
	}
 else	if (id=="injuryCat"){
		
	toggleCrashLayers();
	 	$("#jqxslider").css("display", "block");
	// else if (yearly) $("#jqxslider2").css("visibility", "visible");
		
		
	}
	
	
	
	
	
});





function removeLayer()
{
	var layer1 = map.getLayer("outreachLayer");
	var layer2 = map.getLayer("interventionLayer");
	var layer3 = map.getLayer("referenceLayer");
	if (layer1) map.removeLayer(layer1);
	if (layer2) map.removeLayer(layer2);
	if (layer3) map.removeLayer(layer3);
	
	
}
