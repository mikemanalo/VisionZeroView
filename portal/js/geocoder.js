function zoomTo(lat, lon) {
				require(["esri/geometry/Point", "esri/geometry/webMercatorUtils", "esri/graphic"], function(Point, webMercatorUtils, Graphic) {
					map.graphics.clear();
					var point = new Point(lon, lat);

					/*var point = new Point(lon, lat, {
						wkid : "4326"
					});*/
					console.log(point);

					var wmpoint = webMercatorUtils.geographicToWebMercator(point);
					//map.centerAt(point);

					//var locationGraphic = new Graphic(wmpoint, symbol);


					var xmin = point.x - 3000;
	        		var ymin = point.y - 3000;
	        		var xmax = point.x + 3000;
	        		var ymax = point.y  + 3000;  
	        
	        		var pointExtent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, map.spatialReference);
					map.setExtent(pointExtent);

					//var featureExtent = point.getExtent().expand(5.0);
					//map.setExtent(featureExtent);

					//var locationGraphic = new Graphic(point, symbol);
					var locationGraphic = new Graphic(point, symbol, gslocation, infoTemplate);
					map.graphics.add(locationGraphic);

					map.infoWindow.setTitle(locationGraphic.getTitle());
					map.infoWindow.setContent(locationGraphic.getContent());

					//display the info window with the address information
					var screenPnt = map.toScreen(point);
					map.infoWindow.resize(200, 100);
					map.infoWindow.show(screenPnt, map.getInfoWindowAnchor(screenPnt));

				});
			}

			function LocationSearch() {

				$("#btnsearch").click(function() {
					// alert("Handler for .click() called.");
					var adminBoundary = $("#searchBorough").text().trim();
					var search = $("#address").val();

					GeoParser(search, adminBoundary)

				});
			}

			function GeoParser(searchValue, adminBoundary) {
				//alert(adminBoundary);

				if (adminBoundary == "Boro") {
					alert("Please select Administrative Boundary on Right");
					return;
				} else if (adminBoundary == "Police Precinct") {

					GetPrecinct(searchValue);

				} else if (adminBoundary == "Zip Code") {
					GetZip(searchValue);

				} else if (adminBoundary == "Community District") {

					GetCD(searchValue);
				} else if (adminBoundary == "City Council District") {
					GetCityCouncil(searchValue);
				} else {
					GetGeoSupportJSON(searchValue, adminBoundary);
				}

			}

			/***Project App ID:d72f9ac0
			 Project App Key: d1d9ba774e1bc021c256c3e53752adc4

			 curl -v  -X GET "https://api.cityofnewyork.us/geoclient/v1/intersection.json?app_id=d72f9ac0&app_key=d1d9ba774e1bc021c256c3e53752adc4&crossStreetOne=wall+st&crossStreetTwo=water+st&borough=Manhattan&boroughCrossStreetTwo=Manhattan"

			 https://api.cityofnewyork.us/geoclient/v1/search.json?input=314 west 100 st manhattan&app_id=d72f9ac0&app_key=d1d9ba774e1bc021c256c3e53752adc4
			 ***/

			function GetGeoSupportJSON(searchTerm, adminBoundary) {
				var freeText = toTitleCase(searchTerm + " " + adminBoundary);
				gslocation.location = freeText;
				$.getJSON('https://api.cityofnewyork.us/geoclient/v1/search.json?callback=?&app_id=d72f9ac0&app_key=d1d9ba774e1bc021c256c3e53752adc4&input=' + freeText, function(d) {

					if (d.results.length == 0) {
						alert("No match to location entered.");
					}
					processGSResult(d);
				});
			}

			function processGSResult(d) {
				$.each(d.results, function(i, item) {
					//console.log(item);
					console.log(item.response.xCoordinate, item.response.yCoordinate);
					gslocation.lon = parseFloat(item.response.xCoordinate);
					gslocation.lat = parseFloat(item.response.yCoordinate);
					console.log(gslocation);
					zoomTo(gslocation.lat, gslocation.lon);
				});
			}

			function toTitleCase(str) {
				return str.replace(/\w\S*/g, function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			}

			function GetCD(cd) {

				queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/1");

				query = new esri.tasks.Query();
				query.returnGeometry = true;
				/*query.outSpatialReference = new esri.SpatialReference({
					wkid : map.spatialReference
				});*/
				query.outFields = ["BoroCD"];

				map.infoWindow.hide();
				map.graphics.clear();

				//onClick event returns the evt point where the user clicked on the map.
				//This is contains the mapPoint (esri.geometry.point) and the screenPoint (pixel xy where the user clicked).
				//set query geometry = to evt.mapPoint Geometry
				query.where = "BoroCD  = " + cd;

				//Execute task and call showResults on completion
				queryTask.execute(query, function(fset) {
					if (fset.features.length === 1) {
						showFeature(fset.features[0]);
					}
				});
			}

			function GetZip(zip) {
				query = new esri.tasks.Query();
				query.returnGeometry = true;
				/*query.outSpatialReference = new esri.SpatialReference({
					wkid : 4326
				});*/
				query.outFields = ["BoroCD"];

				map.infoWindow.hide();
				map.graphics.clear();

				query.where = "BoroCD  = " + cd;

				//Execute task and call showResults on completion
				queryTask.execute(query, function(fset) {
					if (fset.features.length === 1) {
						showFeature(fset.features[0]);
					}
				});
			}

			function GetPrecinct(precinct) {

				queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/4");

				//http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/4
				query = new esri.tasks.Query();
				query.returnGeometry = true;
				/*query.outSpatialReference = new esri.SpatialReference({
					wkid : 4326
				});*/
				query.outFields = ["Precinct"];

				map.infoWindow.hide();
				map.graphics.clear();

				query.where = "Precinct  = " + precinct;

				//Execute task and call showResults on completion
				queryTask.execute(query, function(fset) {
					if (fset.features.length === 1) {
						showFeature(fset.features[0]);
					}
				});
			}

			function GetCityCouncil(council) {
				queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/0");

				query = new esri.tasks.Query();
				query.returnGeometry = true;
				/*query.outSpatialReference = new esri.SpatialReference({
					wkid : 4326
				});*/
				query.outFields = ["CounDist"];

				map.infoWindow.hide();
				map.graphics.clear();

				query.where = "CounDist  = " + council;

				//Execute task and call showResults on completion
				queryTask.execute(query, function(fset) {
					if (fset.features.length === 1) {
						showFeature(fset.features[0]);
					}
				});
			}

			function showFeature(feature) {
				map.graphics.clear();
				feature.setSymbol(fillSymbol);
				//feature.setInfoTemplate(infoTemplate);
				map.graphics.add(feature);

				var featureExtent = feature.geometry.getExtent().expand(5.0);
				map.setExtent(featureExtent);
			}

			function showResults(results) {
				// This takes the graphics array you get back from your query and
				// gets the overall extent for them. Make sure return geometry is set to
				// true in your query.
				var extent = esri.graphicsExtent(results.features);

				// Use that to set the extent, 1.5 is something I use in my app, but play with
				// it to find a setting you like, setting the second parameter to true will get you an extend
				// that is at the closest level of your cached service.
				map.setExtent(extent.expand(1.5), true);
			}


			$(document).ready(function() {

				$(".dropdown-menu li a").click(function() {
					var selText = $(this).text();
					$(this).parents('.input-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
				});
				LocationSearch();

			});
