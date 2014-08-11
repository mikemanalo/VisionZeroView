function IdentifyTaskInit() {
	$(document).ready(function() {

		allIdentifyParams = new esri.tasks.IdentifyParameters();
		allIdentifyParams.tolerance = 4;
		allIdentifyParams.returnGeometry = true;
		allIdentifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_TOP;
		allIdentifyParams.width = map.width;
		allIdentifyParams.height = map.height;
		
		
		fatality_monthly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_monthly/MapServer");
		fatality_monthly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_monthly/MapServer");
		fatality_monthly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_monthly/MapServer");
		fatality_monthly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_monthly/MapServer");

		fatality_yearly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/allFatalities_yearly/MapServer");
		fatality_yearly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_yearly/MapServer");
		fatality_yearly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_yearly/MapServer");
		fatality_yearly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_yearly/MapServer");

		injury_monthly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/all_monthly_Injuries_and_fatalities/MapServer");
		injury_monthly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedFatalities_and_Injuries_monthly/MapServer");
		injury_monthly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeFatalities_and_Injuries_monthly/MapServer");
		injury_monthly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorFatalities_and_Injuries_monthly/MapServer");

		injury_yearly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/allInjury_yearly/MapServer");
		injury_yearly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/pedInjury_yearly/MapServer");
		injury_yearly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/bikeInjury_yearly/MapServer");
		injury_yearly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/motorInjury_yearly/MapServer");


		interventionIdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/SAFETY_INTERVENTION/MapServer");
		outreachIdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/OUTREACH/MapServer");
		summaryInjIdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_INJURIES/MapServer");
		summaryFatalIdentifyTask = new esri.tasks.IdentifyTask("http://"+ arcgisserver + "/arcgis/rest/services/VISION_ZERO/SUMMARY_2014_FATALITIES/MapServer");
				
		dojo.connect(map, "onClick", executeIdentifyTask);
	});

}

function executeIdentifyTask(evt) {

	var wait = map.centerAt(evt.mapPoint);
	wait.addCallback(function (){

	if (injury) {

		var locScale = map.getScale();
		if (locScale > 64000) {
			alert("Please zoom in to view feature information");
		} else {
			map.infoWindow.hide();
			var locVal;

			if (yearly) {
				var deferred;

				var locSliderVal = $('#jqxslider2').jqxSlider('getValue');
				//	var toolTipVal = slider2Lookup(value);
				//	$("#dateLabel").text(toolTipVal);
				locVal = (locSliderVal * 7);
				
				allIdentifyParams.geometry = evt.mapPoint;
				allIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3, locVal + 4, locVal + 5, locVal + 6];
				allIdentifyParams.mapExtent = map.extent;
				
				if (all)
					deferred = injury_yearly_all_IdentifyTask.execute(allIdentifyParams);
				else if (ped)
					deferred = injury_yearly_ped_IdentifyTask.execute(allIdentifyParams);
				else if (motor)
					deferred = injury_yearly_motor_IdentifyTask.execute(allIdentifyParams);
				else if (bike)
					deferred = injury_yearly_bike_IdentifyTask.execute(allIdentifyParams);
			} else if (monthly) {
				var deferred;

				var locSliderVal = $('#jqxslider').jqxSlider('getValue');
				locVal = (locSliderVal * 8);

				allIdentifyParams.geometry = evt.mapPoint;
				allIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3, locVal + 4, locVal + 5, locVal + 6, locVal + 7, locVal + 8];
				allIdentifyParams.mapExtent = map.extent;
								

				if (all)
					deferred = injury_monthly_all_IdentifyTask.execute(allIdentifyParams);
				else if (ped)
					deferred = injury_monthly_ped_IdentifyTask.execute(allIdentifyParams);
				else if (motor)
                   deferred = injury_monthly_motor_IdentifyTask.execute(allIdentifyParams);
				else if (bike)
					deferred = injury_monthly_bike_IdentifyTask.execute(allIdentifyParams);
			}

			deferred.addCallback(function(response) {

				if (response.length > 0) {
					map.infoWindow.show(evt.mapPoint);
				} else {
					map.infoWindow.hide();
				}

				return dojo.map(response, function(result) {
					var feature = result.feature;
					var locName = result.layerName;
					var split, locParse;
					if (monthly){
						split = locName.split("_"); 
						locParse = split[0];
					}
					else if (yearly){
						split = locName.charAt(3);
						locParse = split;
					}
					//console.log("new name: " + locParse);
					//var locSliderVal = $('#jqxslider').jqxSlider('getValue');
					if (monthly)
						var locDate = sliderLookup(locSliderVal);
					else if (yearly)
						var locDate = slider2Lookup(locSliderVal);
					var locTxt;

					if ((locParse == "injuries")||(locParse == "I")) {
						if (yearly) {
						locTxt = "<table><tr><td><b>Total Injuries: </b>" + "&nbsp;" + " </td><td>${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td><b>Non-Injury Crashes: </b>" + "&nbsp;" + "</td><td> ${nonInj_Crashes}</td></tr></table>";
						}
						else if (monthly){
						locTxt = "<table><tr><td><b>Total Injuries: </b>" + "&nbsp; " + "</td><td>  ${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td><b>Non-Injury Crashes: </b>" + "&nbsp; " + " </td><td> ${Non_Inj_Crashes}</td></tr></table>";
						}
					} else if ((locParse == "fatalities" )||(locParse == "F" )) {
						if (yearly) {
						locTxt = "<table><tr><td><b>Total Fatalities: </b></td><td>" + "&nbsp; " + "  ${Fatalities}</td></tr></table>";
						locTxt += "<table><tr><td><b>Total Injuries: </b></td><td>" + "&nbsp; " + "  ${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td><b>Non-Injury Crashes: </b>" + "&nbsp; " + " </td><td> ${nonInj_Crashes}</td></tr></table>";
						}
						else if (monthly){
						locTxt = "<table><tr><td><b>Total Fatalities: </b></td><td>" + "&nbsp; " + "  ${Fatalities}</td></tr></table>";
						locTxt += "<table><tr><td><b>Total Injuries: </b></td><td>" + "&nbsp; " + "  ${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td><b>Non-Injury Crashes: </b></td><td>" + "&nbsp; " + "  ${Non_Inj_Crashes}</td></tr></table>";
							
						}

					}

					var template = new esri.InfoTemplate();
					template.setTitle(locDate);
					template.setContent(locTxt);

					feature.setInfoTemplate(template);

					return feature;
				});
			});

			map.infoWindow.setFeatures([deferred]);
		} // end else
	} else if (fatality) {
		var locVal;
		map.infoWindow.hide();

		if (yearly) {
			//console.log("get to fat year");
			var deferred;

			var locSliderVal = $('#jqxslider2').jqxSlider('getValue');
			//var toolTipVal = slider2Lookup(value);
			//	$("#dateLabel").text(toolTipVal);
			locVal = (locSliderVal * 4);

			
			allIdentifyParams.geometry = evt.mapPoint;
			allIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3];
			allIdentifyParams.mapExtent = map.extent;
			console.log(allIdentifyParams.layerIds);

			if (all)
				deferred = fatality_yearly_all_IdentifyTask.execute(allIdentifyParams);
			else if (ped)
				deferred = fatality_yearly_ped_IdentifyTask.execute(allIdentifyParams);
			else if (motor)
				deferred = fatality_yearly_motor_IdentifyTask.execute(allIdentifyParams);
			else if (bike)
				deferred = fatality_yearly_bike_IdentifyTask.execute(allIdentifyParams);
		} else if (monthly) {
			//console.log("get to fat month");
			var deferred;

			var locSliderVal = $('#jqxslider').jqxSlider('getValue');
			locVal = (locSliderVal * 4);

			/*allFatIdentifyParams.geometry = evt.mapPoint;
			allFatIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3];
			allFatIdentifyParams.mapExtent = map.extent;
			console.log("month " + allFatIdentifyParams.layerIds);*/

			allIdentifyParams.geometry = evt.mapPoint;
			allIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3];
			allIdentifyParams.mapExtent = map.extent;
			console.log("month " + allIdentifyParams.layerIds);			

			if (all)
				deferred = fatality_monthly_all_IdentifyTask.execute(allIdentifyParams);
			else if (ped)
				deferred = fatality_monthly_ped_IdentifyTask.execute(allIdentifyParams);
			else if (motor)
				deferred = fatality_monthly_motor_IdentifyTask.execute(allIdentifyParams);
			else if (bike)
				deferred = fatality_monthly_bike_IdentifyTask.execute(allIdentifyParams);
		}

		deferred.addCallback(function(response) {
			//console.log("get tot hereeeee?");
			//console.log(response.length);

			if (response.length > 0) {
				map.infoWindow.show(evt.mapPoint);
			} else {
				map.infoWindow.hide();
			}

			return dojo.map(response, function(result) {
				var feature = result.feature;
				if (monthly)
					var locDate = sliderLookup(locSliderVal);
				else if (yearly)
					var locDate = slider2Lookup(locSliderVal);
				//var locDate = sliderLookup(locSliderVal);
				var locTxt;
				if (yearly) {
					locTxt = "<table><tr><td><b>Total Fatalites: </b>" + "&nbsp; " + "</td><td> ${Fatalities}</td></tr></table>";
					locTxt += "<table><tr><td><b>Non-Injury Crashes: </b>" + "&nbsp; " + "</td><td> ${nonInj_Crashes}</td></tr></table>";
				} else if (monthly) {
					locTxt = "<table><tr><td><b>Total Fatalites: </b>" + "&nbsp; " + "</td><td> ${Fatalities}</td></tr></table>";
					locTxt += "<table><tr><td><b>Non-Injury Crashes: </b>" + "&nbsp; " + "</td><td> ${Non_Inj_Crashes}</td></tr></table>";
				}

				var template = new esri.InfoTemplate();
				template.setTitle(locDate);
				template.setContent(locTxt);

				feature.setInfoTemplate(template);

				return feature;
			});
		});

		map.infoWindow.setFeatures([deferred]);

	}
	else if(interventions){
		
			//console.log("get to intervent ident");
			var deferred;

			allIdentifyParams.geometry = evt.mapPoint;
			
			allIdentifyParams.layerIds = [interventionLayerIDs];
			allIdentifyParams.mapExtent = map.extent;

			deferred = interventionIdentifyTask.execute(allIdentifyParams);

		deferred.addCallback(function(response) {


			if (response.length > 0) {
				map.infoWindow.show(evt.mapPoint);
			} else {
				map.infoWindow.hide();
			}

			return dojo.map(response, function(result) {
				var feature = result.feature;
				var locName = result.layerName;
				console.log("layername" + locName);

				var locText;
				var template = new esri.InfoTemplate();
				switch (locName){
					case  "ASZ_Final_Dissolve":					
					locTxt = "<table><tr><td><b>Corridor: </b>${CORRIDOR}</td></tr>";
					locTxt += "<tr><td>From" + "&nbsp;" + "${FROM_STREET}";
					locTxt += " To" + "&nbsp;"  + "${TO_STREET}</td></tr></table>";
					template.setTitle("Arterial Slow Zones");
					break;
					
					case  "Safe_Streets_For_Seniors_preVZ":					
					locTxt = "<table><tr><td><b>Name:</b>" + "&nbsp; " + "${Name}</td></tr>";
					locTxt += "<tr><td><b>Year:</b>" + "&nbsp;  " + " ${Year}</td></tr></table>";
					template.setTitle("Safe Streets For Seniors");
					break;

					case  "Neighborhood_Slow_Zones_pre_post_VZ":					
					locTxt = "<table><tr><td><b>Name:" + "&nbsp;" + " </b>${Name}</td></tr>";
					locTxt += "<tr><td><b>Year:</b>" + "&nbsp;" + " ${Year}</td></tr></table>";
					template.setTitle("Neighborhood Slow Zones");
					break;
					
					case  "SAFETY_ENGG_SIP_Corridors":	 case "SAFETY_ENGG_SIP_Intersections":			
					locTxt = "<table><tr><td><b>Project Name:" + "&nbsp;" + "</b>${Pjct_Name}</td></tr>";
					locTxt += "<tr><td><b>Project Type:</b>" + "&nbsp;" + "${SIPProjTyp}</td></tr></table>";
					template.setTitle("Safety Engineering Projects");
					break;

					case  "sb_2014Dissolve_0725":					
					locTxt = "<table><tr><td><b>On Street:" + "&nbsp;" + " </b>${FIRST_Main}</td></tr>";
					locTxt += "<tr><td>From" + "&nbsp;" + " ${FIRST_From}";
					locTxt += " To" + "&nbsp;" + "${FIRST_ToSt}</td></tr>";
					locTxt += "<tr><td><b>Date Installed:</b> " + "&nbsp;" + "${FIRST_Inst}</td></tr>";
					locTxt += "<tr><td><b>Num. of Humps::</b> " + "&nbsp;" + "${FIRST_NumO}</td></tr></table>";
					template.setTitle("Speed Humps");
					break;		

					case  "LPI":					
					locTxt = "<table><tr><td><b>Main Street:" + "&nbsp;" + " </b>${MainStreet}</td></tr>";
					locTxt += "<tr><td><b>Cross Street:</b>" + "&nbsp;" + " ${CrossStree}</td></tr></table>";
					template.setTitle("Leading Pedestrian Signals");
					break;
										
					default:
					locTxt = "No data available";
					break;		
				}
					

				
				template.setContent(locTxt);

				feature.setInfoTemplate(template);

				return feature;
			});
		});

		map.infoWindow.setFeatures([deferred]);
	
		
	}
	
	else if(outreach){
		
			//console.log("get to outreach ident");
			var deferred;

			allIdentifyParams.geometry = evt.mapPoint;			
			allIdentifyParams.layerIds = [outreachLayerIDs];
			allIdentifyParams.mapExtent = map.extent;

			deferred = outreachIdentifyTask.execute(allIdentifyParams);

		deferred.addCallback(function(response) {


			if (response.length > 0) {
				map.infoWindow.show(evt.mapPoint);
			} else {
				map.infoWindow.hide();
			}

			return dojo.map(response, function(result) {
				var feature = result.feature;
				var locName = result.layerName;
			//	console.log("layername" + locName);

				var locText;
				var template = new esri.InfoTemplate();
				switch (locName){
					case  "Outreach_schools":					
					locTxt = "<table><tr><td><b>School: </b>" + "&nbsp;" + "${SiteServed}</td></tr>";
					locTxt += "<tr><td><b>Activity:</b> " + "&nbsp;" + " ${Activity}</td></tr>";
					locTxt += "<tr><td><b>Event Date:</b> " + "&nbsp;" + "${EventDate}</td></tr>";
					template.setTitle("School Outreach Events");
					break;
					
					 /// fill in when map layers are ready ///////////////////////
					case  "TownHallLocations":					
					locTxt = "<table><tr><td><b>Location: </b>" + "&nbsp;" + "${Sheet1__NA}</td></tr>";
					locTxt += "<tr><td><b>Address:</b>" + "&nbsp;" + " ${Sheet1__AD}</td></tr></table>";
					template.setTitle("Town Halls");
					break;

					case  "workshop_locations":					
					locTxt = "<table><tr><td><b>Location:" + "&nbsp;" + " </b>${Sheet1__Na}</td></tr>";
					locTxt += "<tr><td><b>Year:</b>" + "&nbsp;" + " ${Sheet1__AD}</td></tr></table>";
					template.setTitle("Workshops");
					break;
					
					case  "Senior_Centers":					
					locTxt = "<table><tr><td><b>Location:" + "&nbsp;" + "</b>${Site_Serve}</td></tr>";
					locTxt += "<tr><td><b>Event:" + "&nbsp; " + "</b>${Activity}</td></tr>";
					locTxt += "<tr><td><b>Event Date:" + "&nbsp; " + "</b>${EventDate}</td></tr></table>";
					template.setTitle("Senior Centers");
					break;

					case  "tlc":					
					locTxt = "<table><tr><td><b>Location:" + "&nbsp;" + "</b>${Title}</td></tr>";
					locTxt += "<tr><td><b>Address:" + "&nbsp;" + "</b>${Location}</td></tr></table>";
					template.setTitle("TLC");
					break;		


										
					default:
					locTxt = "No data available";
					break;		
				}
					

				
				template.setContent(locTxt);

				feature.setInfoTemplate(template);

				return feature;
			});
		});

		map.infoWindow.setFeatures([deferred]);
		
		
		
	}
	
	
	else if(injurySum || fatalitySum){
		
			//console.log("get to summary ident");
			var deferred;


			allIdentifyParams.geometry = evt.mapPoint;
			
			allIdentifyParams.layerIds = [summaryLayerIDs];
			//console.log("ids: " + summaryLayerIDs);
			allIdentifyParams.mapExtent = map.extent;

			if (injurySum) deferred = summaryInjIdentifyTask.execute(allIdentifyParams);
			if (fatalitySum) deferred = summaryFatalIdentifyTask.execute(allIdentifyParams);

		deferred.addCallback(function(response) {
 
 console.log("get to callback");

			if (response.length > 0) {
				map.infoWindow.show(evt.mapPoint);
			} else {
				map.infoWindow.hide();
			}

			return dojo.map(response, function(result) {
				var feature = result.feature;
				var locName = result.layerName;
				//console.log("layername" + locName);

				var locText;
				var template = new esri.InfoTemplate();
				switch (locName){
					case  "Summary_2014_PP_ALL_FATALITIES":	case  "Summary_2014_PP_ALL_INJURIES":			
					locTxt = "<table><tr><td><b>Precinct: </b>" + "&nbsp;" + "</td><td>${Precinct}</td></tr>";
					template.setTitle("Police Precinct Summary: 2014 YTD");
					break;
					
					case  "Summary_2014_CD_ALL_FATALITIES":	case  "Summary_2014_CD_ALL_INJURIES":			
					locTxt = "<table><tr><td><b>Community District: </b>" + "&nbsp;" + "</td><td>${BoroCD}</td></tr>";
					template.setTitle("Community District Summary: 2014 YTD");
					break;
					
					case  "Summary_2014_CC_ALL_FATALITIES":	case  "Summary_2014_CC_ALL_INJURIES":			
					locTxt = "<table><tr><td><b>Council District: </b>" + "&nbsp;" + "</td><td>${CounDist}</td></tr>";
					template.setTitle("City Council Summary: 2014 YTD");
					break;
					
				}
									
				locTxt += "<tr><td><b>Total fatalites:</b>" + "&nbsp;" + " </td><td>${SUM_Fatalities}</td></tr>";
				locTxt += "<tr><td><b>Total Injuries:</b>" + "&nbsp;" + " </td><td>${SUM_Injuries}</td></tr>";
				locTxt += "<tr><td><b>Pedestrian Fatalites:</b>" + "&nbsp;" + " </td><td>${SUM_PedFatalities}</td></tr>";
				locTxt += "<tr><td><b>Pedestrian Injuries:</b>" + "&nbsp; " + " </td><td>${SUM_PedInjuries}</td></tr>";
				locTxt += "<tr><td><b>Bicycle Fatalites:</b>" + "&nbsp;" + " </td><td> ${SUM_BikeFatalities}</td></tr>";
				locTxt += "<tr><td><b>Bicycle Injuries:</b>" + "&nbsp;" + " </td><td> ${SUM_BikeInjuries}</td></tr>";
				locTxt += "<tr><td><b>Motorist Fatalites:</b>" + " &nbsp;" + " </td><td>${SUM_MVOFatalities}</td></tr>";
				locTxt += "<tr><td><b>Motorist Injuries:</b>" + "&nbsp;" + " </td><td>${SUM_MVOInjuries}</td></tr>";
				locTxt += "<tr><td><b>Non-Injury Crashes:</b>" + "&nbsp;" + " </td><td>${SUM_nonInj_Crashes}</td></tr></table>";

									
				template.setContent(locTxt);

				feature.setInfoTemplate(template);

				return feature;
			});
		});

		map.infoWindow.setFeatures([deferred]);

				
	}

}); // wait callback

}