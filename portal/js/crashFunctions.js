/*********************** listeners ***************************/

$(document).ready(function() {
	$("[name='InjuriesWhat']").on('switchChange.bootstrapSwitch', function(e) {
		map.infoWindow.hide();

		if ($("[name='InjuriesWhat']").is(':checked')) {
			console.log("Injuries");
			injury = true;
			fatality = false;

		} else {
			console.log("Fatalities");
			injury = false;
			fatality = true;
		}
		toggleCrashLayers();
	});
});

$(document).ready(function() {
	$("[name='InjuriesWhen']").on('switchChange.bootstrapSwitch', function(e) {
		map.infoWindow.hide();

		if ($("[name='InjuriesWhen']").is(':checked')) {
			console.log("Monthly");
			monthly = true;
			yearly = false;

			var val = $('#jqxslider').jqxSlider('getValue');
			var toolTipVal = sliderLookup(val);
			$("#dateLabel").text(toolTipVal);

		} else {
			console.log("Yearly");
			monthly = false;
			yearly = true;

			var val = $('#jqxslider2').jqxSlider('getValue');
			var toolTipVal = slider2Lookup(val);
			$("#dateLabel").text(toolTipVal);

		}
		toggleCrashLayers();
	});

});

$(document).ready(function() {
	// test //
	all = true;

	$('.crashTypes').on('click', function() {
		map.infoWindow.hide();

		var mode = ($(this).find('input').attr('id'));
		console.log(mode);
		switch (mode) {
			case 'ped':
				ped = true;
				bike = false;
				motor = false;
				all = false;
				break;
			case 'motor':
				ped = false;
				bike = false;
				motor = true;
				all = false;
				break;
			case 'bike':
				ped = false;
				bike = true;
				motor = false;
				all = false;
				break;
			case 'all':
				ped = false;
				bike = false;
				motor = false;
				all = true;
				break;
			default:
				all = true;
		}
		console.log(ped + " " + bike + " " + motor + " " + all);
		toggleCrashLayers();
	});

});

/*************************** layer toggle functions *****************************************************/
/*
 *
 var fatality, injury;
 var monthly, yearly;
 var all, ped, bike, motor;*/

function toggleCrashLayers() {

	var what, when, who;

	if (injury)
		what = "injury";
	else
		what = "fatality";
	if (yearly)
		when = "yearly";
	else
		when = "monthly";

	if (all)
		who = "all";
	else if (ped)
		who = "ped";
	else if (bike)
		who = "bike";
	else if (motor)
		who = "motor";

	var currentCrashMap = what + "_" + when + "_" + who + "_Layer";
	console.log(currentCrashMap);

	//injury_monthly_ped_Layer.setVisibility(true);

	if (injury) {
		var visibleInjuryLayerIds = [];
		if (monthly) {
			if (all) {
				allCrashLayersOff();

				injury_monthly_all_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 8);
				//// commented out for dotdevgisiis01 demo

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

				//visibleInjuryLayerIds.push(curInjuryValue);

				injury_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 8);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

					//visibleInjuryLayerIds.push(curInjuryValue);

					injury_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				});
			} else if (ped) {
				allCrashLayersOff();
				injury_monthly_ped_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 8);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

				injury_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 8);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

					injury_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (bike) {
				allCrashLayersOff();
				injury_monthly_bike_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 8);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

				injury_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 8);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

					injury_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (motor) {
				allCrashLayersOff();
				injury_monthly_motor_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 8);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

				injury_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 8);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

					injury_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			}
		}// end monthly
		
else if (yearly) {
			var visibleInjuryLayerIds = [];
			if (all) {
				allCrashLayersOff();

				injury_yearly_all_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 7);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

				injury_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');

					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);

					curInjuryValue = (curInjuryValue * 7);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

					injury_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				});
			} else if (ped) {
				allCrashLayersOff();
				injury_yearly_ped_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 7);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

				injury_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');

					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);

					curInjuryValue = (curInjuryValue * 7);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

					injury_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (bike) {
				allCrashLayersOff();
				injury_yearly_bike_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 7);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

				injury_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');

					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);

					curInjuryValue = (curInjuryValue * 7);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

					injury_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (motor) {
				allCrashLayersOff();
				injury_yearly_motor_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 7);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

				injury_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');

					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);

					curInjuryValue = (curInjuryValue * 7);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);
					console.log(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

					injury_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			}

		}
		// end yearly

	}//end injury

	/************************* fatalities **********************************************/
	else if (fatality) {
		var visibleInjuryLayerIds = [];
		if (monthly) {
			if (all) {
				allCrashLayersOff();

				fatality_monthly_all_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 4);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 4);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				});
			} else if (ped) {
				allCrashLayersOff();
				fatality_monthly_ped_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 4);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

				fatality_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 4);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);

					fatality_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (bike) {
				allCrashLayersOff();
				fatality_monthly_bike_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 4);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 4);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (motor) {
				allCrashLayersOff();
				fatality_monthly_motor_Layer.setVisibility(true);

				$('#jqxslider').css("display", "block");
				$('#jqxslider2').css("display", "none");
				var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
				curInjuryValue = (curInjuryValue * 4);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider').jqxSlider('getValue');
					curInjuryValue = (curInjuryValue * 4);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			}
		}// end monthly
		
else if (yearly) {
			var visibleInjuryLayerIds = [];
			if (all) {
				allCrashLayersOff();

				fatality_yearly_all_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 4);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);

					curInjuryValue = (curInjuryValue * 4);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);

				});
			} else if (ped) {
				allCrashLayersOff();
				fatality_yearly_ped_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 4);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);
					//$("#dateLabel").text(toolTipVal);
					curInjuryValue = (curInjuryValue * 4);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (bike) {
				allCrashLayersOff();
				fatality_yearly_bike_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 4);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					console.log(toolTipVal);
					curInjuryValue = (curInjuryValue * 4);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

					fatality_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			} else if (motor) {
				allCrashLayersOff();
				fatality_yearly_motor_Layer.setVisibility(true);
				$('#jqxslider2').css("display", "block");
				$('#jqxslider').css("display", "none");
				var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
				var toolTipVal = slider2Lookup(curInjuryValue);
				$("#dateLabel").text(toolTipVal);
				console.log(toolTipVal);

				curInjuryValue = (curInjuryValue * 4);
				console.log("cur: " + curInjuryValue);

				visibleInjuryLayerIds.length = 0;

				visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);

				fatality_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

				$('#jqxslider2').bind('change', function(event) {
					map.infoWindow.hide();
					var curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
					var toolTipVal = slider2Lookup(curInjuryValue);
					$("#dateLabel").text(toolTipVal);
					curInjuryValue = (curInjuryValue * 4);
					console.log("cur: " + curInjuryValue);

					visibleInjuryLayerIds.length = 0;

					visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);
					console.log(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

					fatality_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);
				});
			}

		}
		// end yearly

	}
	//end injury

}

function allCrashLayersOff() {
	injury_yearly_all_Layer.setVisibility(false);
	injury_yearly_ped_Layer.setVisibility(false);
	injury_yearly_motor_Layer.setVisibility(false);
	injury_yearly_bike_Layer.setVisibility(false);
	injury_monthly_all_Layer.setVisibility(false);
	injury_monthly_ped_Layer.setVisibility(false);
	injury_monthly_motor_Layer.setVisibility(false);
	injury_monthly_bike_Layer.setVisibility(false);

	fatality_yearly_all_Layer.setVisibility(false);
	fatality_yearly_ped_Layer.setVisibility(false);
	fatality_yearly_motor_Layer.setVisibility(false);
	fatality_yearly_bike_Layer.setVisibility(false);
	fatality_monthly_all_Layer.setVisibility(false);
	fatality_monthly_ped_Layer.setVisibility(false);
	fatality_monthly_motor_Layer.setVisibility(false);
	fatality_monthly_bike_Layer.setVisibility(false);
}

function checkCrashCatState() {

	map.infoWindow.hide();

	if ($("[name='InjuriesWhat']").is(':checked')) {
		console.log("Injuries");
		injury = true;
		fatality = false;

	} else {
		console.log("Fatalities");
		injury = false;
		fatality = true;
	}
	//	toggleCrashLayers();

	map.infoWindow.hide();

	if ($("[name='InjuriesWhen']").is(':checked')) {
		console.log("Monthly");
		monthly = true;
		yearly = false;

		var val = $('#jqxslider').jqxSlider('getValue');
		var toolTipVal = sliderLookup(val);
		$("#dateLabel").text(toolTipVal);

	} else {
		console.log("Yearly");
		monthly = false;
		yearly = true;

		var val = $('#jqxslider2').jqxSlider('getValue');
		var toolTipVal = slider2Lookup(val);
		$("#dateLabel").text(toolTipVal);

	}

	map.infoWindow.hide();

	console.log(ped + " " + bike + " " + motor + " " + all);
	toggleCrashLayers();

}
