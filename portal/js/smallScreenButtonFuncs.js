


$("#smallScreenInfo").on('touchstart click', function() {
	
	//console.log("test");
	
	if ((fatality)||(injury)){
		
		$("#smallScreenModalInfo").html("Injuries and fatalities are grouped by intersection and summarized by month and year using Motor Vehicle Collision data provided by NYPD.  Current year is January to the end of the latest full month.");
				
	}
	else if (interventions){
		
		var interventionInfo = "<i>Leading Pedestrian Interval Signals</i><br>Intersections where DOT installs signals that show a walk sign for pedestrians before showing a green light to vehicle traffic. The goal of these signals is to improve street safety by giving pedestrians a chance to establish their presence in the crosswalk before vehicles make turns across that crosswalk.";
		interventionInfo += "<br><br><i>Street Improvement Projects</i><br>Safety-oriented engineering improvements that use multiple treatments (signals, markings, concrete etc) on both corridors and intersections. Improvements are generally aimed at better organizing traffic, improving travel times, creating shorter, safer pedestrian crossings, and safe routes for bicycle travel. The map displays operational (non-capital) projects from 2013 and 2014";
		interventionInfo += "<br><br><i>Arterial Slow Zones</i><br>The Arterial Slow Zone program uses a combination of a lower speed limit, signal timing changes, distinctive signs and increased enforcement to improve safety on some of New York City's most high-crash corridors. <br> <br>";
        interventionInfo += "<i>Speed Humps</i><br>Speed Humps are a raised area of a roadway designed to reduce vehicle speeds.<br><br>";
        interventionInfo += "<i>Safe Streets for Seniors</i><br>The Safe Streets for Seniors program is an initiative aimed at increasing safety for older New Yorkers. Based on factors such as senior population density, injury crashes, and senior trip generators, DOT has selected and studied 25 Senior Pedestrian Focus Areas. Within these areas, DOT evaluates potential safety improvements and also conducts education outreach to senior centers.";
        interventionInfo += "<br><br><i>Neighborhood Slow Zones</i><br>The Neighborhood Slow Zone program is an application based program which takes a neighborhood area and reduces the speed limit to 20 mph. Areas are chosen based on crashes, presence of schools and other neighborhood amenities, and community support. The treatments include a mixture of markings, signage, and speed humps.";

		$("#smallScreenModalInfo").html(interventionInfo);
	}
	
	else if (outreach){
		var outreachInfo = " <i>Schools</i><br> DOT is conducting outreach to numerous schools in the five boroughs, using age-appropriate materials to educate school children about traffic safety.<br><br>";
    	outreachInfo += "<i>Senior Centers</i><br>DOT is partnering with Senior Centers across New York City to increase communication and obtain specific feedback from older New Yorkers about the challenges they face and potential street safety improvements.<br><br>";
    	outreachInfo += "<i>TLC</i><br>As a partner agency in the Vision Zero Initiative, the Taxi and Limousine Commission has committed to implement a number of safety reforms designed to increase driver awareness, step up enforcement, and improve technology.<br><br>";
    	outreachInfo += "<i>Town Hall Meetings</i><br>In Spring 2014, DOT partnered with New York City Councilmembers across the five boroughs to host a number of Town Halls, where community members could come learn more about Vision Zero and give specific suggestions or concerns regarding traffic safety in their neighborhoods.<br><br>";
    	outreachInfo +="<i>Workshops</i><br>In Spring 2014, DOT hosted nine pedestrian safety workshops across the five boroughs aimed at gathering community feedback on areas in need of safety improvements. This feedback will be used to shape the Borough Pedestrian Safety Action Plans, to be released later in 2014.";
		$("#smallScreenModalInfo").html(outreachInfo);
	}
	
	else if ((fatalitySum)||(injurySum)){
		var summaryInfo = "<i>Police Precinct</i><br>New York City is divided into a number of police precincts with officers who manage enforcement within that area.<br><br>";
		summaryInfo += "<i>Community District</i><br>New York City is comprised of five boroughs, containing 59 community districts citywide established by local law in 1975.  Local communities are represented by community boards that create opportunity for active participation in the political process and provision of services to address evolving community needs.<br><br>";
    	summaryInfo += "<i>City Council District</i><br>New York City is divided into 51 City Council districts, each represented by a councilmember elected by residents of the district.<br><br>";
    	summaryInfo +="<i>Density of Injuries by (Police Precinct, Community District, City Council District)</i><br>Number of traffic injuries and fatalities occurring in a given area, normalized by the population of that area.";

		$("#smallScreenModalInfo").html(summaryInfo);
		
	}
	
});

$("#smallScreenLegend").on('touchstart click', function() {
	  var locScale = map.getScale();
	  var legendModal;
	     if (injury){
            if (yearly){
              	 if (locScale > 64000) {
              	 	legendModal = "Density of All Injuries By Year<br>";
              		legendModal += "<img src='img/legend/Injury_Heat.svg' class='img-responsive text-center' alt='Responsive image' style='width: 100%; margin-top: 1em;'>";
                 	legendModal += "<h6><span style='margin-left: 0.2em;' class='pull-left'>Low</span><span class='pull-right'>High</span></h6>";
                 }
                 else if (locScale < 64001) {
                 	
                 	legendModal = "Number of Pedestrian Injuries and Fatalities: Yearly<br>";
                 	legendModal += "<img src='img/legend/Injury_Leg.svg' class='img-responsive text-center' alt='Responsive image' style='width: auto; margin-top: 0.3em;'><br>";
                 	legendModal += "<img src='img/legend/Fatal_Leg.svg' class='img-responsive text-center' alt='Responsive image' style='width: auto; margin-top: 1.7em;'>";
				}
			}
			else if (monthly){

                 	legendModal = "Number of Pedestrian Injuries and Fatalities: Monthly";
                 	legendModal += "<img src='img/legend/Injury_Leg.svg' class='img-responsive text-center' alt='Responsive image' style='width: auto; margin-top: 0.3em;'><br>";
                 	legendModal += "<img src='img/legend/Fatal_Leg.svg' class='img-responsive text-center' alt='Responsive image' style='width: auto; margin-top: 1.7em;'>";
      		}
		}
	 	else if (fatality){

               legendModal = "Number of Pedestrian Fatalities: Monthly";
               legendModal += "<img src='img/legend/Fatal_Leg.svg' class='img-responsive text-center' alt='Responsive image' style='width: auto; margin-top: 1.7em;'>";
                }


	else if (injurySum){
		//var summaryModalLegend;
		if (police) {
			legendModal = "Density of Injuries by Police Precinct<br>";

		}
		else if (community) {
			legendModal = "Density of Injuries by Community District<br>";

		}
		else if (council) {
			legendModal = "Density of Injuries by City Council District<br>";


		}	
		legendModal+= "<img src='img/legend/Injury_Sum.svg' class='img-responsive text-center' alt='Responsive image' style='width: 100%; margin-top: 1em;'>";
        legendModal +="<h6><span style='margin-left: 0.2em;' class='pull-left'>Low</span><span class='pull-right'>High</span></h6>";	
	}
	else if (fatalitySum){
		
		if (police) {
			legendModal = "Density of Fatalities by Police Precinct<br>";

		}
		else if (community) {
			legendModal = "Density of Fatalities by Community District<br>";

		}
		else if (council) {
			legendModal = "Density of Fatalities by City Council District<br>";

		}	
		legendModal+= "<img src='img/legend/Fatal_Sum.svg' class='img-responsive text-center' alt='Responsive image' style='width: 100%; margin-top: 1em;'>";
        legendModal +="<h6><span style='margin-left: 0.2em;' class='pull-left'>Low</span><span class='pull-right'>High</span></h6>";		
	}

	$("#smallScreenModalLegend").html(legendModal);
	
	
	
	
	
});


