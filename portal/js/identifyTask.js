function IdentifyTaskInit() {
	$(document).ready(function() {

		allInjIdentifyParams = new esri.tasks.IdentifyParameters();
		allInjIdentifyParams.tolerance = 4;
		allInjIdentifyParams.returnGeometry = true;
		allInjIdentifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_TOP;
		allInjIdentifyParams.width = map.width;
		allInjIdentifyParams.height = map.height;

		allFatIdentifyParams = new esri.tasks.IdentifyParameters();
		allFatIdentifyParams.tolerance = 4;
		allFatIdentifyParams.returnGeometry = true;
		allFatIdentifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_TOP;
		allFatIdentifyParams.width = map.width;
		allFatIdentifyParams.height = map.height;

		fatality_monthly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/allFatalities_monthly/MapServer");
		fatality_monthly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/pedFatalities_monthly/MapServer");
		fatality_monthly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/bikeFatalities_monthly/MapServer");
		fatality_monthly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/motorFatalities_monthly/MapServer");

		fatality_yearly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/allFatalities_yearly/MapServer");
		fatality_yearly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/pedFatalities_yearly/MapServer");
		fatality_yearly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/bikeFatalities_yearly/MapServer");
		fatality_yearly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/motorFatalities_yearly/MapServer");

		injury_monthly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/all_monthly_Injuries_and_fatalities/MapServer");
		injury_monthly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/pedFatalities_and_Injuries_monthly/MapServer");
		injury_monthly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/bikeFatalities_and_Injuries_monthly/MapServer");
		injury_monthly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/motorFatalities_and_Injuries_monthly/MapServer");

		injury_yearly_all_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/allInjury_yearly/MapServer");
		injury_yearly_ped_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/pedInjury_yearly/MapServer");
		injury_yearly_bike_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/bikeInjury_yearly/MapServer");
		injury_yearly_motor_IdentifyTask = new esri.tasks.IdentifyTask("http://dotqagisiis03:6080/arcgis/rest/services/VISION_ZERO/motorInjury_yearly/MapServer");

		dojo.connect(map, "onClick", executeIdentifyTask);
	});

}

function executeIdentifyTask(evt) {

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

				allInjIdentifyParams.geometry = evt.mapPoint;
				allInjIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3, locVal + 4, locVal + 5, locVal + 6];
				allInjIdentifyParams.mapExtent = map.extent;

				if (all)
					deferred = injury_yearly_all_IdentifyTask.execute(allInjIdentifyParams);
				else if (ped)
					deferred = injury_yearly_ped_IdentifyTask.execute(allInjIdentifyParams);
				else if (motor)
					deferred = injury_yearly_motor_IdentifyTask.execute(allInjIdentifyParams);
				else if (bike)
					deferred = injury_yearly_bike_IdentifyTask.execute(allInjIdentifyParams);
			} else if (monthly) {
				var deferred;

				var locSliderVal = $('#jqxslider').jqxSlider('getValue');
				locVal = (locSliderVal * 8);

				allInjIdentifyParams.geometry = evt.mapPoint;
				allInjIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3, locVal + 4, locVal + 5, locVal + 6, locVal + 7, locVal + 8];
				allInjIdentifyParams.mapExtent = map.extent;

				if (all)
					deferred = injury_monthly_all_IdentifyTask.execute(allInjIdentifyParams);
				else if (ped)
					deferred = injury_monthly_ped_IdentifyTask.execute(allInjIdentifyParams);
				else if (motor)
					deferred = injury_monthly_motor_IdentifyTasksk.execute(allInjIdentifyParams);
				else if (bike)
					deferred = injury_monthly_bike_IdentifyTask.execute(allInjIdentifyParams);
			}

			deferred.addCallback(function(response) {

				if (response.length > 0) {
					map.infoWindow.show(evt.mapPoint);
				} else {
					map.infoWindow.hide();
				}

				return dojo.map(response, function(result) {
					var feature = result.feature;
					//var locSliderVal = $('#jqxslider').jqxSlider('getValue');
					if (monthly)
						var locDate = sliderLookup(locSliderVal);
					else if (yearly)
						var locDate = slider2Lookup(locSliderVal);
					var locText;

					if (yearly) {
						locTxt = "<table><tr><td>Total Injuries at Location: </td><td> ${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td>Non-Injury Crashes at Location: </td><td> ${nonInj_Crashes}</td></tr></table>";
					} else if (monthly) {
						locTxt = "<table><tr><td>Total Injuries at Location: </td><td> ${Injuries}</td></tr></table>";
						locTxt += "<table><tr><td>Non-Injury Crashes at Location: </td><td> ${Non_Inj_Crashes}</td></tr></table>";

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
			console.log("get to fat year");
			var deferred;

			var locSliderVal = $('#jqxslider2').jqxSlider('getValue');
			//var toolTipVal = slider2Lookup(value);
			//	$("#dateLabel").text(toolTipVal);
			locVal = (locSliderVal * 4);

			allFatIdentifyParams.geometry = evt.mapPoint;
			allFatIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3];
			allFatIdentifyParams.mapExtent = map.extent;
			console.log(allFatIdentifyParams.layerIds);

			if (all)
				deferred = fatality_yearly_all_IdentifyTask.execute(allFatIdentifyParams);
			else if (ped)
				deferred = fatality_yearly_ped_IdentifyTask.execute(allFatIdentifyParams);
			else if (motor)
				deferred = fatality_yearly_motor_IdentifyTask.execute(allFatIdentifyParams);
			else if (bike)
				deferred = fatality_yearly_bike_IdentifyTask.execute(allFatIdentifyParams);
		} else if (monthly) {
			console.log("get to fat month");
			var deferred;

			var locSliderVal = $('#jqxslider').jqxSlider('getValue');
			locVal = (locSliderVal * 4);

			allFatIdentifyParams.geometry = evt.mapPoint;
			allFatIdentifyParams.layerIds = [locVal, locVal + 1, locVal + 2, locVal + 3];
			allFatIdentifyParams.mapExtent = map.extent;
			console.log("month " + allFatIdentifyParams.layerIds);

			if (all)
				deferred = fatality_monthly_all_IdentifyTask.execute(allFatIdentifyParams);
			else if (ped)
				deferred = fatality_monthly_ped_IdentifyTask.execute(allFatIdentifyParams);
			else if (motor)
				deferred = fatality_monthly_motor_IdentifyTask.execute(allFatIdentifyParams);
			else if (bike)
				deferred = fatality_monthly_bike_IdentifyTask.execute(allFatIdentifyParams);
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
				var locText;
				if (yearly) {
					locTxt = "<table><tr><td>Total Fatalites at Location: </td><td> ${Fatalities}</td></tr></table>";
					locTxt += "<table><tr><td>Non-Injury at Location: </td><td> ${nonInj_Crashes}</td></tr></table>";
				} else if (monthly) {
					locTxt = "<table><tr><td>Total Fatalites at Location: </td><td> ${Fatalities}</td></tr></table>";
					locTxt += "<table><tr><td>Non-Injury at Location: </td><td> ${Non_Inj_Crashes}</td></tr></table>";
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

}