


       /*     	     dojo.connect(map, "onLoad",  function () {

console.log("stats? :"+ stats[0].SUM_BikeFat);
			
            });
            
var curInjuryValue = $('#jqxslider').jqxSlider('getValue');


var fatality, injury, monthly, yearly, all, ped, bike, motor; 


$("#dateLabel").text(toolTipVal);  //stat1, stat2

$(element).is(":visible") 
*/


$('#jqxslider').bind('change', function(event) {
//if (injury){
	
	checkStats();
	

	
});


//}

function checkStats(){
		if (monthly){
		var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
	//	console.log("statpage" + curInjuryValue );
		if (ped){
			$("#stat1").text("Pedestrian Fatalities: " + stats[curInjuryValue].SUM_PedFat);
			$("#stat2").text("Pedestrian Injuries: " + stats[curInjuryValue].SUM_PedInj);
			
			//console.log($("#stat1").text);	
		}
		else if (bike){
			$("#stat1").text("Cyclist Fatalities: " + stats[curInjuryValue].SUM_BikeFat);
			$("#stat2").text("Cyclist Injuries: " + stats[curInjuryValue].SUM_BikeInj);
			
			//console.log($("#stat1").text);	
		}
		else if (motor){
			$("#stat1").text("Motorist Fatalities: " + stats[curInjuryValue].SUM_MVOFat);
			$("#stat2").text("Motorist Injuries: " + stats[curInjuryValue].SUM_MVOInj);
			
			//console.log($("#stat1").text);	
		}
		else if (all){
			$("#stat1").text("All Fatalities: " + stats[curInjuryValue].SUM_Fatalities);
			$("#stat2").text("All Injuries: " + stats[curInjuryValue].SUM_Injuries);
			
			//console.log($("#stat1").text);	
		}
		
		
	}
	
		else if (yearly){
			
			$("#stat1").text("yearly stats available soon");
			$("#stat2").text("please check again later");
			
			/*
		var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
	//	console.log("statpage" + curInjuryValue );
		if (ped){
			$("#stat1").text("Pedestrian Fatalities: " + stats[curInjuryValue].SUM_PedFat);
			$("#stat2").text("Pedestrian Injuries: " + stats[curInjuryValue].SUM_PedInj);
			
			//console.log($("#stat1").text);	
		}
		else if (bike){
			$("#stat1").text("Cyclist Fatalities: " + stats[curInjuryValue].SUM_BikeFat);
			$("#stat2").text("Cyclist Injuries: " + stats[curInjuryValue].SUM_BikeInj);
			
			//console.log($("#stat1").text);	
		}
		else if (motor){
			$("#stat1").text("Cyclist Fatalities: " + stats[curInjuryValue].SUM_MVOFat);
			$("#stat2").text("Cyclist Injuries: " + stats[curInjuryValue].SUM_MVOInj);
			
			//console.log($("#stat1").text);	
		}
		else if (all){
			$("#stat1").text("Cyclist Fatalities: " + stats[curInjuryValue].SUM_Fatalities);
			$("#stat2").text("Cyclist Injuries: " + stats[curInjuryValue].SUM_Injuries);
			
			//*/
		
		
	}
}
