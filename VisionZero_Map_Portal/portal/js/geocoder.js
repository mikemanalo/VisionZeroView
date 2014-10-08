function zoomTo(lat, lon) {
    require(["esri/geometry/Point", "esri/geometry/webMercatorUtils", "esri/graphic"], function (Point, webMercatorUtils, Graphic) {
        map.infoWindow.hide();
		map.graphics.clear();
        var point = new Point(lon, lat);

        var wmpoint = webMercatorUtils.geographicToWebMercator(point);

        var xmin = point.x - 3000;
        var ymin = point.y - 3000;
        var xmax = point.x + 3000;
        var ymax = point.y + 3000;

        var pointExtent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, map.spatialReference);
        map.setExtent(pointExtent);

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

    $("#btnsearch").on(evt, function () {

        var adminBoundary = $("#searchBorough").text().trim();
        var search = $("#address").val();

        GeoParser(search, adminBoundary)
    });
	
	$('#address').keydown(function(event){    
		if(event.keyCode==13){
		event.preventDefault();
		$('#btnsearch').trigger('click');
		}
	});
}

function GeoParser(searchValue, adminBoundary) {
    //alert(adminBoundary);

    if (adminBoundary == "Borough") {
        alert("Please select borough");
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


function GetGeoSupportJSON(searchTerm, adminBoundary) {
    var freeText = toTitleCase(searchTerm + " " + adminBoundary);
    gslocation.location = freeText;
    $.getJSON('https://api.cityofnewyork.us/geoclient/v1/search.json?callback=?&app_id=d72f9ac0&app_key=d1d9ba774e1bc021c256c3e53752adc4&returnPolicy=true&returnPossiblesWithExact=true&returnRejections=true&returnTokens=true&input=' + freeText, function (d) {

        if (d.results.length == 0) {
            alert("No match to location entered.");
        }

        if (d.status == "OK")
            processGSResult(d);

        if (d.status == "REJECTED")
            processGSReject(d);
    });
}

function processGSResult(d) {
    $.each(d.results, function (i, item) {


        if (item.status == "EXACT_MATCH") {

            gslocation.lon = parseFloat(item.response.xCoordinate);
            gslocation.lat = parseFloat(item.response.yCoordinate);
            zoomTo(gslocation.lat, gslocation.lon);
            return false;
        }

        if (item.status == "POSSIBLE_MATCH") {

            alert("Location not found. Did you mean: \n" + SimplifyResponse(item.request));
            return false;
        }


    });

}
function SimplifyResponse(txt) {
    var init = txt.indexOf('[');
    var fin = txt.indexOf(']');
    var str = txt.substr(init + 1, fin - init - 1);

    var partsOfStr = str.split(',');
    var item, result;
    result = "";
    for (var i = 0; i < partsOfStr.length; i++) {
        item = partsOfStr[i].split("=");

        if (item[1] != "null") {
            result += item[1] + " ";
        }
    }

    return result;
}
function processGSReject(d) {
    $.each(d.results, function (i, item) {

        alert(item.response.message);
        return false;
    });
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function GetCD(cd) {

    queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/1");

    query = new esri.tasks.Query();
    query.returnGeometry = true;

    query.outFields = ["BoroCD"];

    map.infoWindow.hide();
    map.graphics.clear();

    //onClick event returns the evt point where the user clicked on the map.
    //This is contains the mapPoint (esri.geometry.point) and the screenPoint (pixel xy where the user clicked).
    //set query geometry = to evt.mapPoint Geometry
    query.where = "BoroCD  = " + cd;

    //Execute task and call showResults on completion
    queryTask.execute(query, function (fset) {
        if (fset.features.length === 1) {
            showFeature(fset.features[0]);
        }
    });
}

function GetZip(zip) {
    query = new esri.tasks.Query();
    query.returnGeometry = true;

    query.outFields = ["BoroCD"];

    map.infoWindow.hide();
    map.graphics.clear();

    query.where = "BoroCD  = " + cd;

    //Execute task and call showResults on completion
    queryTask.execute(query, function (fset) {
        if (fset.features.length === 1) {
            showFeature(fset.features[0]);
        }
    });
}

function GetPrecinct(precinct) {

    queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/4");

    query = new esri.tasks.Query();
    query.returnGeometry = true;

    query.outFields = ["Precinct"];

    map.infoWindow.hide();
    map.graphics.clear();

    query.where = "Precinct  = " + precinct;

    //Execute task and call showResults on completion
    queryTask.execute(query, function (fset) {
        if (fset.features.length === 1) {
            showFeature(fset.features[0]);
        }
    });
}

function GetCityCouncil(council) {
    queryTask = new esri.tasks.QueryTask("http://www.nycdot.info:6080/arcgis/rest/services/GISAPP_GAZETTEER/NYCDOTBasemapAdminBoundaries/MapServer/0");

    query = new esri.tasks.Query();
    query.returnGeometry = true;

    query.outFields = ["CounDist"];

    map.infoWindow.hide();
    map.graphics.clear();

    query.where = "CounDist  = " + council;

    //Execute task and call showResults on completion
    queryTask.execute(query, function (fset) {
        if (fset.features.length === 1) {
            showFeature(fset.features[0]);
        }
    });
}

function showFeature(feature) {
    map.graphics.clear();
    feature.setSymbol(fillSymbol);
    map.graphics.add(feature);

    var featureExtent = feature.geometry.getExtent().expand(5.0);
    map.setExtent(featureExtent);
    

        hideLoading();
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


$(document).ready(function () {



    $(".dropdown-menu li a").on(evt, function () {
        var selText = $(this).text();
        $(this).parents('.input-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });
    LocationSearch();

});
//***Geolocate***

//converts Wkt string to an ESRI Geometry object
function wktToEsriGeometry(wkt_string) {
    if (wkt_string.substring(0, 7) == 'POLYGON') {
        var polygonJsonString = "{\"rings\":[[";
        var wkt_prep = wkt_string.split(",");
        wkt_prep[0] = wkt_prep[0].replace("POLYGON ((", "");
        var lastIndex = wkt_prep.length - 1;
        wkt_prep[lastIndex] = wkt_prep[lastIndex].replace("))", "");
        for (var i = 0; i <= lastIndex; i++) {
            if (wkt_prep[i].charAt(0) == " ") {
                wkt_prep[i] = wkt_prep[i].slice(1);
            }
            wkt_prep[i] = wkt_prep[i].replace(" ", ",");
            polygonJsonString += "[";
            polygonJsonString += wkt_prep[i];
            if (i < lastIndex) {
                polygonJsonString += "],";
            }
            else {
                polygonJsonString += "]";
            }
        }
        polygonJsonString += "]],\"spatialReference\":{\"wkid\":2263}}";
        var polygonJson = JSON.parse(polygonJsonString);
        var polygon = new esri.geometry.Polygon(polygonJson);
        
        return polygon;
    }
    if (wkt_string.substring(0, 10) == 'LINESTRING') {
        var lineJsonString = "{\"paths\":[[";
        var wkt_prep = wkt_string.split(",");
        wkt_prep[0] = wkt_prep[0].replace("LINESTRING (", "");
        var lastIndex = wkt_prep.length - 1;
        wkt_prep[lastIndex] = wkt_prep[lastIndex].replace(")", "");
        for (var i = 0; i <= lastIndex; i++) {
            if (wkt_prep[i].charAt(0) == " ") {
                wkt_prep[i] = wkt_prep[i].slice(1);
            }
            wkt_prep[i] = wkt_prep[i].replace(" ", ",");
            lineJsonString += "[";
            lineJsonString += wkt_prep[i];
            if (i < lastIndex) {
                lineJsonString += "],";
            }
            else {
                lineJsonString += "]";
            }
        }
        lineJsonString += "]], \"spatialReference\": { \"wkid\": 2263 }}";
        var polylineJson = JSON.parse(lineJsonString);
        var polyline = new esri.geometry.Polyline(polylineJson);
        return polyline;
    }
    if (wkt_string.substring(0, 5) == 'POINT') {
        wkt_string = wkt_string.replace("POINT (", "");
        wkt_string = wkt_string.replace(")", "");
        wkt_string = wkt_string.replace(" ", ",");
        var wkt_prep = wkt_string.split(",");
        var point = new esri.geometry.Point(wkt_prep, new esri.SpatialReference({ wkid: 2263 }));
        return point;
    }
    // });
}

function getCurrentLocation() {
	
	showLoading();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addGeolocationMarker, locationError);
        return true;
    }
    else {
        alert("Browser doesn't support Geolocation. Visit http://caniuse.com to discover browser support for the Geolocation API.");
        firstView = false;
        return false;
    }
}



function addGeolocationMarker(location) {
	

        

    var nycWkt = "POLYGON ((913353.48495726287 120189.72554992139, 916779.94759251177 118476.49439634383, 930771.33660441637 123616.18818517029, 947903.64978067577 132467.88340824842, 961895.03912067413 145031.57973749936, 983024.89187400043 144746.04126659036, 996445.203944087 145888.19547833502, 1001299.3595900834 138178.65446700156, 1040418.1412605047 151598.96653708816, 1057550.4544367641 155025.42917233706, 1057835.9929076731 169587.89545416832, 1056979.3774949163 173585.43503125012, 1061547.9943419248 176440.82072466612, 1061262.455542922 186720.20863042772, 1061262.455542922 191859.90274733305, 1060405.8401301801 202139.29065309465, 1066116.6111889184 203281.44486483932, 1068400.9196124226 208421.13865366578, 1068400.9196124226 212989.75550067425, 1052981.8375897557 225838.99062892795, 1050697.5291662514 221270.37378191948, 1048698.7592136711 225838.99062892795, 1047842.1438009292 229265.45326417685, 1043273.5269539207 232977.45437033474, 1050411.9906953424 250109.76754659414, 1045557.835377425 258390.38549976051, 1041845.8339431733 261816.84813500941, 1028996.5991430134 265243.31077025831, 1028996.5991430134 268955.31220451, 1024713.5207669288 271525.15909892321, 1022143.6738725007 268098.69646367431, 1008437.8233315051 273238.39025250077, 1003869.2064845115 260960.23272225261, 998729.51236759126 249538.69060476124, 997872.8966267556 244113.45801691711, 981051.616621092 214203.29441216588, 978494.88124901056 196424.14886817336, 972634.05668458343 194732.77003309131, 971768.69981950521 193513.40403351188, 963893.8087451756 177011.89766649902, 942192.87872192264 174156.51230117679, 934768.87650959194 176155.28225375712, 929343.6439217627 173014.35808941722, 914495.63916900754 138178.65446700156, 912211.33074550331 124187.26545508206, 913353.48495726287 120189.72554992139))";

    nycPolygon = wktToEsriGeometry(nycWkt);
    pt = new esri.geometry.Point(location.coords.longitude, location.coords.latitude, new esri.SpatialReference({ wkid: 4326 }));
    var nysp = new esri.SpatialReference({ wkid: 2263 });
    var gsvc = new esri.tasks.GeometryService("http://" + arcgisserver + "/ArcGIS/rest/services/Utilities/Geometry/GeometryServer");
    gsvc.project([pt], nysp, function (projectedPoint) {
        if (nycPolygon.contains(projectedPoint[0])) {
            if (!geoGraphic) {
                addGeoGraphic(projectedPoint[0]);
            } else {
                //move the graphic if it already exists
                geoGraphic.setGeometry(projectedPoint[0]);
            }


            var xmin = projectedPoint[0].x - 3000;
            var ymin = projectedPoint[0].y - 3000;
            var xmax = projectedPoint[0].x + 3000;
            var ymax = projectedPoint[0].y + 3000;

            var pointExtent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, map.spatialReference);
            map.setExtent(pointExtent);
			 hideLoading();
            
            return true;
        }
        else {
            alert("Your location is outside of the City of New York city limits. This application is for NYC Data only.");
             hideLoading();
            return false;
        }
    });
}


function locationError(error) {
    //hideLoading();
    firstView = false;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Location Services: Location not provided. Check your browser settings.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location Services: Current location not available");
            break;
        case error.TIMEOUT:
            alert("Location Services: Timeout");
            break;
        default:
            alert("Location Services: Unknown Error");
            break;
    }
    

        hideLoading();
}

function addGeoGraphic(pt) {
    
    var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 255, 0.5]), 8), new dojo.Color([0, 0, 255, 0.9]));
    geoGraphic = new esri.Graphic(pt, symbol, map.spatialReference);
    map.graphics.add(geoGraphic);
}
