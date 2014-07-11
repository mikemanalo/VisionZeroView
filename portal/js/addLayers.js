

///////////////////// SAFETY INTERVENTIONS //////////////////////////////////////////////////////////////

	
$(".interventionBtns").on("click", function() {
	var interventionLayerIDs = [];

	interventionLayerIDs.length = 0;
	//interventionLayer.setVisibleLayers();
	console.log(interventionLayerIDs);

	setTimeout(function(){ checkInterventionBtns(interventionLayerIDs);}, 30);

});
	
function checkInterventionBtns(interventionLayerIDs){
	
	if ($("#ArterialSlowZone").is(':checked')) {

		var locID = 0;
		interventionLayerIDs.push(locID);
		
	} 


	if ($("#SafeStreetsForSeniors").is(':checked')) {

		var locID = 1;
		interventionLayerIDs.push(locID);
	} 

		
	if ($("#NeighborhoodSlowZone").is(':checked')) {

		var locID = 2;
		interventionLayerIDs.push(locID);
	}
		

	if ($("#EngineeringImprovements").is(':checked')) {

		var locID = 3;
		interventionLayerIDs.push(locID);
	} 

	if ($("#SpeedHump").is(':checked')) {

		var locID = 4;
		interventionLayerIDs.push(locID);
	} 


	if ($("#LeadingPedestrianSignals").is(':checked')) {

		var locID = 5;
		interventionLayerIDs.push(locID);
	} 

		
interventionLayer.setVisibleLayers(interventionLayerIDs);
console.log(interventionLayerIDs);


}

/////////////////////////  OUTREACH /////////////////////////////////////////////////////////////////////////////////


	
$(".outreachBtns").on("click", function() {
	var outreachLayerIDs = [];

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

		var locID = 1;
		//outreachLayerIDs.push(locID);
		console.log("seniors added");
		
		
	} 
	if ($("#TLC").is(':checked')) {

		var locID = 2;
		//outreachLayerIDs.push(locID);
		console.log("tlc added");
		
	} 
	if ($("#TownHallMeeting").is(':checked')) {

		var locID = 3;
		//outreachLayerIDs.push(locID);
		console.log("townhall added");
		
	} 
	if ($("#Workshops").is(':checked')) {

		var locID = 4;
		//outreachLayerIDs.push(locID);
		console.log("workshops added");
		
	} 
	outreachLayer.setVisibleLayers(outreachLayerIDs);
	console.log(outreachLayerIDs);
	
}

 ///////////////////////////////// SUMMARY ////////////////////////////////////////////////////////////////////
 
 
