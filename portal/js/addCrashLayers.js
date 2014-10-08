function addCrashLayers() {
	
/************************************************************** FATALITY MONTHLY ***********************************************************************/
	var _layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_monthly/MapServer";
	var _layerID = "fatality_monthly_all_Layer";
	fatality_monthly_all_Layer = AddDynamicLayer(_layerURL, _layerID,false);

	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_monthly/MapServer";
	_layerID = "fatality_monthly_ped_Layer";
	fatality_monthly_ped_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_monthly/MapServer";
	_layerID = "fatality_monthly_bike_Layer";
	fatality_monthly_bike_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_monthly/MapServer";
	_layerID =  "fatality_monthly_motor_Layer";
	fatality_monthly_motor_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	
	/******************************************** YEARLY FATALITY ************************************************************/
	

	
	_layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_yearly/MapServer";
	 _layerID = "fatality_yearly_all_Layer";
	fatality_yearly_all_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_yearly/MapServer";
	 _layerID = "fatality_yearly_ped_Layer";
	fatality_yearly_ped_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	_layerURL = "http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_yearly/MapServer";
	 _layerID = fatality_yearly_bike_Layer;
	fatality_yearly_bike_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_yearly/MapServer";
	 _layerID = fatality_yearly_motor_Layer
	fatality_yearly_motor_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
	
	
	/********************************************* INJURY MONTHLY ***********************************************************************************/
	
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/all_monthly_Injuries_and_fatalities/MapServer";
	_layerID ="injury_monthly_all_Layer";
	injury_monthly_all_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
    _layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_and_Injuries_monthly/MapServer";
    _layerID ="injury_monthly_ped_Layer";
	injury_monthly_ped_Layer = AddDynamicLayer(_layerURL, _layerID,false);
	
    _layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_and_Injuries_monthly/MapServer";
    _layerID ="injury_monthly_bike_Layer";
	injury_monthly_bike_Layer = AddDynamicLayer(_layerURL, _layerID,false);
    
    _layerURL =	"http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_and_Injuries_monthly/MapServer";
    _layerID ="injury_monthly_motor_Layer";
	injury_monthly_motor_Layer = AddDynamicLayer(_layerURL, _layerID,false);

	
	/***************************************************** INJURY YEARLY ***************************************************************************************/
	
	
	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/allInjury_yearly/MapServer";
	_layerID = injury_yearly_all_Layer;
	injury_yearly_all_Layer = AddDynamicLayer(_layerURL, _layerID,false);

	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedInjury_yearly/MapServer";
	_layerID = injury_yearly_ped_Layer;
	injury_yearly_ped_Layer = AddDynamicLayer(_layerURL, _layerID,false);
		
	_layerURL =	"http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeInjury_yearly/MapServer";
	_layerID = injury_yearly_bike_Layer;
	injury_yearly_bike_Layer = AddDynamicLayer(_layerURL, _layerID,false);

	_layerURL ="http://" + arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorInjury_yearly/MapServer";
	_layerID = injury_yearly_motor_Layer;
	injury_yearly_motor_Layer = AddDynamicLayer(_layerURL, _layerID,false);


} // end addLayers

function AddLayer(layerName, visible) {

    layerName.setDisableClientCaching(false);
    map.addLayer(layerName);

    layerName.setVisibility(visible);
    
    
    layerName.on("update-start", function () {
        showLoading();
    });

    layerName.on("update-end", function () {
        hideLoading();
    });
}

function AddDynamicLayer(layerURL, layerID, visible) {
	var imageParameters = new esri.layers.ImageParameters();
        imageParameters.format = "jpeg"; 
        
	var DynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerURL, {
		id : layerID
		,opacity:.8,
		"imageParameters" : imageParameters
	});

    DynamicLayer.setDisableClientCaching(false);
    map.addLayer(DynamicLayer);

    DynamicLayer.setVisibility(visible);
    
   	DynamicLayer.on("load", function() { DynamicLayer.minScale = 0; DynamicLayer.maxScale = 0; });

    DynamicLayer.on("update-start", function () {
        showLoading();
    });


    DynamicLayer.on("update-end", function () {
        hideLoading();
        LayerVisibility();
    });
    
    
    return DynamicLayer;
}



