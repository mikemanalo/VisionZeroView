function addCrashLayers() {
	
/************************************************************** FATALITY MONTHLY ***********************************************************************/

	fatality_monthly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_monthly/MapServer", {
		id : "fatality_monthly_all_Layer"

	});
	map.addLayer(fatality_monthly_all_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	
	fatality_monthly_all_Layer.setVisibility(false);
	
	

	fatality_monthly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_monthly/MapServer", {
		id : "fatality_monthly_ped_Layer"

	});
	map.addLayer(fatality_monthly_ped_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_monthly_ped_Layer.setVisibility(false);
	
	
	
	
	fatality_monthly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_monthly/MapServer", {
		id : "fatality_monthly_bike_Layer"

	});
	map.addLayer(fatality_monthly_bike_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_monthly_bike_Layer.setVisibility(false);
	
	
	
	
	fatality_monthly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "arcgis/rest/services/VISION_ZERO/motorFatalities_monthly/MapServer", {
		id : "fatality_monthly_motor_Layer"

	});
	map.addLayer(fatality_monthly_motor_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_monthly_motor_Layer.setVisibility(false);
	
	
	/******************************************** YEARLY FATALITY ************************************************************/
	
	
	fatality_yearly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_yearly/MapServer", {
		id : "fatality_yearly_all_Layer"

	});
	map.addLayer(fatality_yearly_all_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_yearly_all_Layer.setVisibility(false);
	
	

	fatality_yearly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_yearly/MapServer", {
		id : "fatality_yearly_ped_Layer"

	});
	map.addLayer(fatality_yearly_ped_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_yearly_ped_Layer.setVisibility(false);
	
	
	
	
	fatality_yearly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_yearly/MapServer", {
		id : "fatality_yearly_bike_Layer"

	});
	map.addLayer(fatality_yearly_bike_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_yearly_bike_Layer.setVisibility(false);
	
	
	
	
	fatality_yearly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_yearly/MapServer", {
		id : "fatality_yearly_motor_Layer"

	});
	map.addLayer(fatality_yearly_motor_Layer);
	//var testArray = [];
	//testArray[0] = 0;
	fatality_yearly_motor_Layer.setVisibility(false);
	
	
	
	/********************************************* INJURY MONTHLY ***********************************************************************************/
	
	
	
	injury_monthly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/all_monthly_Injuries_and_fatalities/MapServer", {
		id : "injury_monthly_all_Layer"

	});
	map.addLayer(injury_monthly_all_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_monthly_all_Layer.setVisibility(false);



	injury_monthly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_ped_Layer"

	});
	map.addLayer(injury_monthly_ped_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_monthly_ped_Layer.setVisibility(false);
	
	
	
	injury_monthly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_bike_Layer"

	});
	map.addLayer(injury_monthly_bike_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_monthly_bike_Layer.setVisibility(false);
	
	
	
	injury_monthly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_motor_Layer"

	});
	map.addLayer(injury_monthly_motor_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_monthly_motor_Layer.setVisibility(false);
	
	
	
	/***************************************************** INJURY YEARLY ***************************************************************************************/
	
	
	
	injury_yearly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allInjury_yearly/MapServer", {
		id : "injury_yearly_all_Layer"

	});
	map.addLayer(injury_yearly_all_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_yearly_all_Layer.setVisibility(false);



	injury_yearly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedInjury_yearly/MapServer", {
		id : "injury_yearly_ped_Layer"

	});
	map.addLayer(injury_yearly_ped_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_yearly_ped_Layer.setVisibility(false);
	
	
	
	injury_yearly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeInjury_yearly/MapServer", {
		id : "injury_yearly_bike_Layer"

	});
	map.addLayer(injury_yearly_bike_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_yearly_bike_Layer.setVisibility(false);
	
	
	
	injury_yearly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorInjury_yearly/MapServer", {
		id : "injury_yearly_motor_Layer"

	});
	map.addLayer(injury_yearly_motor_Layer);
	//var allInjuryArray = [];
	//allInjuryArray[0] = 0;
	injury_yearly_motor_Layer.setVisibility(false);	
	


} // end addLayers



