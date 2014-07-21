

///////////////////// SAFETY INTERVENTIONS //////////////////////////////////////////////////////////////

	
$(".interventionBtns").on("click", function() {
	interventionLayerIDs = [];

	interventionLayerIDs.length = 0;
	//interventionLayer.setVisibleLayers();
	console.log(interventionLayerIDs);

	setTimeout(function(){ checkInterventionBtns(interventionLayerIDs);}, 30);

});
	
function checkInterventionBtns(interventionLayerIDs){
	
	if ($("#ArterialSlowZone").is(':checked')) {

		var locID = 1;
		interventionLayerIDs.push(locID);
		
	} 


	if ($("#SafeStreetsForSeniors").is(':checked')) {

		var locID = 6;
		interventionLayerIDs.push(locID);
	} 

		
	if ($("#NeighborhoodSlowZone").is(':checked')) {

		var locID = 5;
		interventionLayerIDs.push(locID);
	}
		

	if ($("#EngineeringImprovements").is(':checked')) {

		var locID = 2; var locID2 = 3;
		interventionLayerIDs.push(locID);
	} 

	if ($("#SpeedHump").is(':checked')) {

		var locID = 4;
		interventionLayerIDs.push(locID);
	} 


	if ($("#LeadingPedestrianSignals").is(':checked')) {

		var locID = 0;
		interventionLayerIDs.push(locID);
	} 

		
interventionLayer.setVisibleLayers(interventionLayerIDs);
console.log(interventionLayerIDs);


}

/////////////////////////  OUTREACH /////////////////////////////////////////////////////////////////////////////////


	
$(".outreachBtns").on("click", function() {
	outreachLayerIDs = [];

	outreachLayerIDs.length = 0;
	outreachLayer.setVisibleLayers(outreachLayerIDs);
	console.log(outreachLayerIDs);

	setTimeout(function(){ checkOutreachBtns(outreachLayerIDs);}, 30);

});
	
function checkOutreachBtns(outreachLayerIDs){
	
	if ($("#Schools").is(':checked')) {

		var locID = 0;
		outreachLayerIDs.push(locID);
		
	} 
	if ($("#SeniorCenters").is(':checked')) {

		//var locID = 1;
		//outreachLayerIDs.push(locID);
		console.log("seniors added");
		
		
	} 
	if ($("#TLC").is(':checked')) {

	//	var locID = 2;
		//outreachLayerIDs.push(locID);
		console.log("tlc added");
		
	} 
	if ($("#TownHallMeeting").is(':checked')) {

		var locID = 1;
		//outreachLayerIDs.push(locID);
		console.log("townhall added");
			outreachLayerIDs.push(locID);
		
	} 
	if ($("#Workshops").is(':checked')) {

		var locID = 2;
		//outreachLayerIDs.push(locID);
		console.log("workshops added");
			outreachLayerIDs.push(locID);
		
	} 
	outreachLayer.setVisibleLayers(outreachLayerIDs);
	console.log(outreachLayerIDs);
	
}

 ///////////////////////////////// SUMMARY ////////////////////////////////////////////////////////////////////
 $(".summarySwitchBtns").on("click", function() {
 	map.infoWindow.hide();
	//summaryLayerIDs = [];

	summaryLayerIDs.length = 0;
	if (injurySum) { summaryInjuryLayer.setVisibleLayers(summaryLayerIDs); }
	else if (fatalitySum) { summaryFatalityLayer.setVisibleLayers(summaryLayerIDs); }
	console.log(summaryLayerIDs);
	setTimeout(function(){ 	
 		if ($("#summaryInjuries").hasClass('active')){
 		console.log("injury active"); 
 		injurySum = true; fatalitySum = false;
 		summaryInjuryLayer.setVisibility(true);  summaryFatalityLayer.setVisibility(false);
	
 //	checkSummaryInjuryBtns(summaryLayerIDs);
 		}
 		else if ($("#summaryFatalities").hasClass('active')){
 		console.log("fatality active"); 
 		fatalitySum = true; injurySum = false; 
 		summaryInjuryLayer.setVisibility(false);  summaryFatalityLayer.setVisibility(true);
 //	checkSummaryFatalityBtns(summaryLayerIDs);
 		}
 	}, 20);
 	

	setTimeout(function(){ checkSummaryBtns(summaryLayerIDs);}, 20);

});



$(".districtBtns").on("click", function() {
	map.infoWindow.hide();
	//police, community, council;

	var sumView = ($(this).find('input').attr('id'));
//	summaryLayerIDs = [];
	summaryLayerIDs.length = 0;
	var locID;
	

	if (sumView == "policePrecinct") {
		police = true, community = false, council = false;
		console.log("precinct");
		//id push here
		setTimeout(function(){ checkSummaryBtns(summaryLayerIDs);}, 20);
	} else if (sumView == "communityDistrict") {
		police = false, community = true, council = false;
		console.log("communityDistrict");
		setTimeout(function(){ checkSummaryBtns(summaryLayerIDs);}, 20);
	} else if (sumView == "cityCouncilDistrict") {
		police = false, community = false, council = true;
		console.log("cityCouncilDistrict");
		setTimeout(function(){ checkSummaryBtns(summaryLayerIDs);}, 20);
	}
});


	
function checkSummaryBtns(summaryLayerIDs){
	
	console.log("check");
//	summaryLayerIDs = [];
	summaryLayerIDs.length = 0;
	
	if(police) summaryLayerIDs.push(0);
	else if (community) summaryLayerIDs.push(1);
	else if (council) summaryLayerIDs.push(2);

	
	if (injurySum) {
		console.log("get here?");
		summaryInjuryLayer.setVisibility(true);  summaryFatalityLayer.setVisibility(false);
		summaryInjuryLayer.setVisibleLayers(summaryLayerIDs);
	}
	else if (fatalitySum) {
		summaryInjuryLayer.setVisibility(false);  summaryFatalityLayer.setVisibility(true);
		summaryFatalityLayer.setVisibleLayers(summaryLayerIDs);
	}
	
	
	console.log(summaryLayerIDs);
	

	
	
}
