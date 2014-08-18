/***** crash legend check ****************/


function checkCrashLegend(){
       var locScale = map.getScale();
//     console.log("year: " + yearly + " month: " + monthly + "  injury: " + injury + " fatality: " + fatality );
       
       if (injury){
              if (yearly){

                     if (locScale > 64000) {
                           $("#densityLegend").css("display", "block");  //densityLegendText
                           $("#fatalityLegend").css("display", "none");
                           $("#injuryLegend").css("display", "none");
                                            $("#layerLabel").css("display", "none");
                           
                           if (ped) $("#densityLegendText").text("Density of Pedestrian Injuries By Year");
                           else if (bike) $("#densityLegendText").text("Density of Cyclist Injuries By Year");
                            else if (motor) $("#densityLegendText").text("Density of Motorist Injuries By Year");
                           else if (all) $("#densityLegendText").text("Density of All Injuries By Year");
                           
                     }
                     else if (locScale < 64001) {
                           $("#densityLegend").css("display", "none");
                           $("#fatalityLegend").css("display", "block");
                           $("#injuryLegend").css("display", "block");
                                            $("#layerLabel").css("display", "block");
                     }
              }
              else if (monthly){

                           $("#densityLegend").css("display", "none");
                           $("#fatalityLegend").css("display", "block");
                           $("#injuryLegend").css("display", "block");
              }
       }
              
       else if (fatality){

                           $("#densityLegend").css("display", "none");
                           $("#fatalityLegend").css("display", "block");
                           $("#injuryLegend").css("display", "none");
                     }

}




/*********************** listeners ***************************/


$(document).ready(function() {
       $(".crashTypeSwitchBtns").on(evt, function(e) {
              //console.log("get click");
              
              map.infoWindow.hide();

              setTimeout(function() {
                     if ($("#injuriesBtn").hasClass('active')) {
                           //console.log("Injuries");
                           injury = true;
                           fatality = false;

              
              
                           $("#fatalitiesBtn").css("color", "#777");
                           $("#injuriesBtn").css("color", "#FFF");
                     
                     

                     } else if ($("#fatalitiesBtn").hasClass('active')) {
                           //console.log("Fatalities");
                           injury = false;
                           fatality = true;

                           $("#injuriesBtn").css("color", "#777");
                           $("#fatalitiesBtn").css("color", "rgb(255,255,255)");
                     }
                     toggleCrashLayers();
                           
              }, 20);
       });
}); 




$(document).ready(function() {
       $(".crashTimeSwitchBtns").on(evt, function(e) {
              //console.log("get click");
       
              map.infoWindow.hide();

              setTimeout(function() {
                     if ($("#monthlyBtn").hasClass('active')) {
                           //console.log("monthly");
                           monthly = true;
                           yearly = false;

                           $("#yearlyBtn").css("color", "#777");
                           $("#monthlyBtn").css("color", "rgb(255,255,255)");

                     } else if ($("#yearlyBtn").hasClass('active')) {
                           //console.log("yearly");
                           monthly = false;
                           yearly = true;


                           $("#monthlyBtn").css("color", "#777");
                           $("#yearlyBtn").css("color", "rgb(255,255,255)");
                     }
                     toggleCrashLayers();
                           
              }, 20);
       });
});


$(document).ready(function() {
       // test //
       all = true;

       $('.crashTypes').on(evt, function() {
              map.infoWindow.hide();

                     ($('.crashTypes').css("background-color", "rgb(255,255,255)"));
                     ($('.crashTypes').css("color", "#777"));
                     ($(this).css("background-color", "#3276b1"));
                     ($(this).css("color", "white"));


              var mode = ($(this).find('input').attr('id'));
              //console.log(mode);
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
              //console.log(ped + " " + bike + " " + motor + " " + all);
              toggleCrashLayers();
       });

});

/*************************** layer toggle functions *****************************************************/
/*
*
var fatality, injury;
var monthly, yearly;
var all, ped, bike, motor;*/


function injuryMonthlySet(curInjuryValue){
       var visibleInjuryLayerIds = [];
       var    toolTipVal = sliderLookup(curInjuryValue);

       $("#dateLabel").text(toolTipVal);;
       $("#date2Label").text(toolTipVal);
       $("#date3Label").text(toolTipVal);
                                  
       curInjuryValue = (curInjuryValue * 8);


       visibleInjuryLayerIds.length = 0;

       visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6, curInjuryValue + 7);


       if (all) injury_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if(ped) injury_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (bike) injury_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (motor) injury_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

              
}

                           
function injuryYearlySet(curInjuryValue){
       var visibleInjuryLayerIds = [];
       var    toolTipVal = slider2Lookup(curInjuryValue);

       $("#dateLabel").text(toolTipVal);;
       $("#date2Label").text(toolTipVal);
       $("#date3Label").text(toolTipVal);
                                  
       curInjuryValue = (curInjuryValue * 7);


       visibleInjuryLayerIds.length = 0;

       visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3, curInjuryValue + 4, curInjuryValue + 5, curInjuryValue + 6);

       if (all)  injury_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if(ped)  injury_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (bike) injury_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (motor) injury_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

              
}

function fatalityMonthlySet(curInjuryValue){
       var visibleInjuryLayerIds = [];
       var    toolTipVal = sliderLookup(curInjuryValue);
       $("#dateLabel").text(toolTipVal);;
       $("#date2Label").text(toolTipVal);
       $("#date3Label").text(toolTipVal);
                                  
       curInjuryValue = (curInjuryValue * 4);

       visibleInjuryLayerIds.length = 0;

       visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);


       if (all) fatality_monthly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if(ped) fatality_monthly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (bike) fatality_monthly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (motor) fatality_monthly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);
       
              
}

                           
function fatalityYearlySet(curInjuryValue){
       var visibleInjuryLayerIds = [];
       var    toolTipVal = slider2Lookup(curInjuryValue);
       $("#dateLabel").text(toolTipVal);;
       $("#date2Label").text(toolTipVal);
       $("#date3Label").text(toolTipVal);
                                  
       curInjuryValue = (curInjuryValue * 4);

       visibleInjuryLayerIds.length = 0;

       visibleInjuryLayerIds.push(curInjuryValue, curInjuryValue + 1, curInjuryValue + 2, curInjuryValue + 3);


       if (all) fatality_yearly_all_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if(ped) fatality_yearly_ped_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (bike) fatality_yearly_bike_Layer.setVisibleLayers(visibleInjuryLayerIds);
       else if (motor) fatality_yearly_motor_Layer.setVisibleLayers(visibleInjuryLayerIds);

}

function toggleCrashLayers() {

       var what, when, who;

       if (injury)
              what = "Injuries";
       else
              what = "Fatalities";
       if (yearly)
              when = "Yearly";
       else
              when = "Monthly";

       if (all)
              who = "All";
       else if (ped)
              who = "Pedestrian";
       else if (bike)
              who = "Cyclist";
       else if (motor)
              who = "Motorist";

       var currentCrashMap = "Number of "+ who + " " + what + ": "+ when  ;

       $("#boxLabel").text("Citywide Total For");
       $("#layerLabel").text(currentCrashMap);

       if (injury) {
              var visibleInjuryLayerIds = [];
       
              if (monthly) {

                     if (all) {
                           //var curInjuryValue;  // toolTipVal;
                           allCrashLayersOff();

                           injury_monthly_all_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           }
                           else {
                                  ("get to crashFUnc?");
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }); // new scope
              

                     } else if (ped) {
                           allCrashLayersOff();
                           injury_monthly_ped_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }); // new scope

                     } else if (bike) {
                           allCrashLayersOff();
                           injury_monthly_bike_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }); // new scope
                           

                     } else if (motor) {
                           allCrashLayersOff();
                           injury_monthly_motor_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  injuryMonthlySet(curInjuryValue);
                           }); // new scope

                     }
              }// end monthly
              
else if (yearly) {

                     var visibleInjuryLayerIds = [];

                     if (all) {
                           allCrashLayersOff();

                           injury_yearly_all_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                                                       
                           if($('#yearSelect').is(':visible')) {
                                  ("get to crashFUnc? year visible");
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           }
                           else {
                                  ("get to crashFUnc?");
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }); // new scope
                           
                     } else if (ped) {
                           allCrashLayersOff();
                           injury_yearly_ped_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                                                                                  
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }); // new scope
       
                     } else if (bike) {
                           allCrashLayersOff();
                           injury_yearly_bike_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                                                                                  
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }); // new scope
       
                     } else if (motor) {
                           allCrashLayersOff();
                           injury_yearly_motor_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                                                                                  
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  injuryYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  injuryYearlySet(curInjuryValue);
                           }); // new scope

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
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }); // new scope

                     } else if (ped) {
                           allCrashLayersOff();
                           fatality_monthly_ped_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }); // new scope
                           

                     } else if (bike) {
                           allCrashLayersOff();
                           fatality_monthly_bike_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }); // new scope
       
                     } else if (motor) {
                           allCrashLayersOff();
                           fatality_monthly_motor_Layer.setVisibility(true);

                           $('#jqxslider').css("display", "block");
                           $('#jqxslider2').css("display", "none");
                           
                           if($('#monthSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityMonthlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider').jqxSlider('getValue');
                                  fatalityMonthlySet(curInjuryValue);
                           }); // new scope

                     }
              }// end monthly
              
else if (yearly) {
                     var visibleInjuryLayerIds = [];
                     if (all) {
                           allCrashLayersOff();

                           fatality_yearly_all_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }); // new scope
                           

                     } else if (ped) {
                           allCrashLayersOff();
                           fatality_yearly_ped_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                           
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }); // new scope
                           
       
                     } else if (bike) {
                           allCrashLayersOff();
                           fatality_yearly_bike_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                           
                           
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }); // new scope

                     } else if (motor) {
                           allCrashLayersOff();
                           fatality_yearly_motor_Layer.setVisibility(true);
                           $('#jqxslider2').css("display", "block");
                           $('#jqxslider').css("display", "none");
                            
                                                       
                           if($('#yearSelect').is(':visible')) {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                           }
                           else {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }
                           
                           $("#monthSelect , #yearSelect").on('change', function() {
                                  map.infoWindow.hide();
                                  curInjuryValue = smallScreenCrashLayer();
                                  fatalityYearlySet(curInjuryValue);
                            });
                     

                           $('#jqxslider2').bind('change', function(event) {
                                  map.infoWindow.hide();
                                  curInjuryValue = $('#jqxslider2').jqxSlider('getValue');
                                  fatalityYearlySet(curInjuryValue);
                           }); // new scope
                           
       
                     }

              }
              // end yearly

       }
       //end injury


checkCrashLegend();
checkStats();


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

              setTimeout(function() {
                     if ($("#injuriesBtn").hasClass('active')) {
                           //console.log("Injuries");
                           injury = true;
                           fatality = false;
                           $("#fatalitiesBtn").css("color", "#777");
                           $("#injuriesBtn").css("color", "rgb(255,255,255)");

                     } else if ($("#fatalitiesBtn").hasClass('active')) {
                           //console.log("Fatalities");
                           injury = false;
                           fatality = true;
                           $("#injuriesBtn").css("color", "#777");
                           $("#fatalitiesBtn").css("color", "rgb(255,255,255)");
                     }
                     toggleCrashLayers();
              }, 20);
       //     toggleCrashLayers();

       //map.infoWindow.hide();

              setTimeout(function() {
                     if ($("#monthlyBtn").hasClass('active')) {
                           //console.log("monthly");
                           monthly = true;
                           yearly = false;
                           $("#yearlyBtn").css("color", "#777");
                           $("#monthlyBtn").css("color", "rgb(255,255,255)");

                     } else if ($("#yearlyBtn").hasClass('active')) {
                           //console.log("yearly");
                           monthly = false;
                           yearly = true;
                           $("#monthlyBtn").css("color", "#777");
                           $("#yearlyBtn").css("color", "rgb(255,255,255)");
                     }
                     toggleCrashLayers();
              }, 20);

       //map.infoWindow.hide();

       //console.log(ped + " " + bike + " " + motor + " " + all);
//     toggleCrashLayers();

}
