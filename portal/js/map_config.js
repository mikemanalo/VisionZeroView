	// PLEASE ONLY CHANGE ENVIRONMENT VARIABLE FROM QA TO PROD & VICE VERSA
  var environment = "QA"; //QA or PROD
 
	//var arcgisserver = "a841-dotqaweb01.nyc.gov";
	
//var arcgisserver = "54.164.42.242:6080";
	var basemapURL = "http://a841-dotweb01.nyc.gov/arcgis/rest/services/GAZETTEER/NYCDOT_Basemap_2013_Grey/MapServer";
	
	if (environment == "PROD"){
		 var domainName= window.location.host;
		 var mapServiceDomain= window.location.host+":6080";
		// arcgisserver = mapServiceDomain;//"54.164.42.242:6080";
		// arcgisserver = "54.164.42.242:6080";
	} 
        
        var arcgisserver = "dotqagisiis03:6080"; // http://dotqavgisweb:6080/
        //var arcgisserver = "http://nycdotvzlb-478704647.us-east-1.elb.amazonaws.com:6080";
		
		
		 
	//// update date - text added to info page header ////
	// var updateDate = "Data as of " + "10/29/2014";
	//// update date - text added to info page header ////
	var updateDate = "<a href='https://data.cityofnewyork.us/Public-Safety/Vision-Zero-View-Data/y74e-vkxy' target='blank'><b>Data</b></a> as of " + "10/24/2014";
	
	$(".lastUpdateDate").html(updateDate);
	