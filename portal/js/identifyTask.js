function executeIdentifyTask(evt) {

	if (injury) {

		var locScale = map.getScale();
		var locSliderVal = $('#jqxslider').jqxSlider('getValue');

		allInjIdentifyParams.geometry = evt.mapPoint;
		allInjIdentifyParams.layerIds = [locSliderVal];
		allInjIdentifyParams.mapExtent = map.extent;

		if (locScale > 64000) {
			alert("Please zoom in to view feature information");
		} 
		else {

			var deferred = allInjIdentifyTask.execute(allInjIdentifyParams);

			deferred.addCallback(function(response) {

				if (response.length > 0) {
					map.infoWindow.show(evt.mapPoint);
				} else {
					map.infoWindow.hide();
				}

				return dojo.map(response, function(result) {
					var feature = result.feature;
					//var locSliderVal = $('#jqxslider').jqxSlider('getValue');
					var locDate = sliderLookup(locSliderVal);
					var locTxt = "<table><tr><td>Total Injury/Fatality Crashes: </td><td> ${Inj_Crashes}</td></tr></table>";
					locTxt += "<table><tr><td>Total Injuries at Location: </td><td> ${Injuries}</td></tr></table>";
					locTxt += "<table><tr><td>Total Crashes at Location: </td><td> ${CRASHES}</td></tr></table>";

					var template = new esri.InfoTemplate();
					template.setTitle("Total Crash Injuries: <br>" + locDate);
					template.setContent(locTxt);

					feature.setInfoTemplate(template);

					return feature;
				});
			});

			map.infoWindow.setFeatures([deferred]);
			} // end else
		} else 
		
		if (fatality) {
			var locSliderVal = $('#jqxslider').jqxSlider('getValue');
			allFatIdentifyParams.geometry = evt.mapPoint;
			allFatIdentifyParams.layerIds = [locSliderVal];
			allFatIdentifyParams.mapExtent = map.extent;

			var deferred = allFatIdentifyTask.execute(allFatIdentifyParams);

			deferred.addCallback(function(response) {

				if (response.length > 0) {
					map.infoWindow.show(evt.mapPoint);
				} else {
					map.infoWindow.hide();
				}

				return dojo.map(response, function(result) {
					var feature = result.feature;
					var locSliderVal = $('#jqxslider').jqxSlider('getValue');
					var locDate = sliderLookup(locSliderVal);
					var locTxt = "<table><tr><td>Total Injury/Fatality Crashes: </td><td> ${Inj_Crashes}</td></tr></table>";
					locTxt += "<table><tr><td>Total Fatalites at Location: </td><td> ${Fatalities}</td></tr></table>";
					locTxt += "<table><tr><td>Total Crashes at Location: </td><td> ${CRASHES}</td></tr></table>";

					var template = new esri.InfoTemplate();
					template.setTitle("Total Crash Fatalities: <br>" + locDate);
					template.setContent(locTxt);

					feature.setInfoTemplate(template);

					return feature;
				});
			});

			map.infoWindow.setFeatures([deferred]);

		}
	

}