function addCrashLayers() {
	
/************************************************************** FATALITY MONTHLY ***********************************************************************/

	fatality_monthly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_monthly/MapServer", {
		id : "fatality_monthly_all_Layer"

	});
	AddLayer(fatality_monthly_all_Layer,false);

	fatality_monthly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_monthly/MapServer", {
		id : "fatality_monthly_ped_Layer"

	});
	AddLayer(fatality_monthly_ped_Layer,false);
	
	fatality_monthly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_monthly/MapServer", {
		id : "fatality_monthly_bike_Layer"

	});
	AddLayer(fatality_monthly_bike_Layer,false);
	
	fatality_monthly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_monthly/MapServer", {
		id : "fatality_monthly_motor_Layer"

	});
	AddLayer(fatality_monthly_motor_Layer,false);
	
	
	/******************************************** YEARLY FATALITY ************************************************************/
	
	
	fatality_yearly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_yearly/MapServer", {
		id : "fatality_yearly_all_Layer"
		

	});
	AddLayer(fatality_yearly_all_Layer, false);
	
	fatality_yearly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_yearly/MapServer", {
		id : "fatality_yearly_ped_Layer"

	});
	AddLayer(fatality_yearly_ped_Layer, false);
	
	fatality_yearly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_yearly/MapServer", {
		id : "fatality_yearly_bike_Layer"

	});
	AddLayer(fatality_yearly_bike_Layer, false);
	
	fatality_yearly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_yearly/MapServer", {
		id : "fatality_yearly_motor_Layer"

	});
	AddLayer(fatality_yearly_motor_Layer, false);
	
	
	
	/********************************************* INJURY MONTHLY ***********************************************************************************/
	
	
	
	injury_monthly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/all_monthly_Injuries_and_fatalities/MapServer", {
		id : "injury_monthly_all_Layer"
		

	});
	AddLayer(injury_monthly_all_Layer, false);
    
	injury_monthly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_ped_Layer"

	});
	AddLayer(injury_monthly_ped_Layer, false);
    
	injury_monthly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_bike_Layer"

	});
	AddLayer(injury_monthly_bike_Layer, false);
    	
	injury_monthly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_and_Injuries_monthly/MapServer", {
		id : "injury_monthly_motor_Layer"

	});
	AddLayer(injury_monthly_motor_Layer, false);

	
	/***************************************************** INJURY YEARLY ***************************************************************************************/
	
	
	
	injury_yearly_all_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allInjury_yearly/MapServer", {
		id : "injury_yearly_all_Layer"
		,opacity:.8

	});
	AddLayer(injury_yearly_all_Layer, false);

	injury_yearly_ped_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedInjury_yearly/MapServer", {
		id : "injury_yearly_ped_Layer"
		,opacity:.8

	});
	AddLayer(injury_yearly_ped_Layer, false);
		
	injury_yearly_bike_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeInjury_yearly/MapServer", {
		id : "injury_yearly_bike_Layer"
		,opacity:.8

	});
	AddLayer(injury_yearly_bike_Layer, false);

	injury_yearly_motor_Layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorInjury_yearly/MapServer", {
		id : "injury_yearly_motor_Layer"
		,opacity:.8

	});
	
	AddLayer(injury_yearly_motor_Layer, false);


} // end addLayers

function AddLayer(layerName, visible) {
    layerName.on("update-start", function () {
        showLoading();
    });

    layerName.on("update-end", function () {
        hideLoading();
    });
    layerName.setDisableClientCaching(false);
    map.addLayer(layerName);

    layerName.setVisibility(visible);
}



