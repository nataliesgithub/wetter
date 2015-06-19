$(document).ready(function(){

	var skycons = new Skycons({
		color: "grey",
		resizeClear: true
	});

	navigator.geolocation.getCurrentPosition(function(position) {

		var koordinaten = {
			longitude:position.coords.longitude, 
			latitude:position.coords.latitude
		};

		//API ANRFAGE:
		$.ajax({ //Promise Callback: spezielle Objekte, kann erst ausgeführt werden, wenn Methode bereit ist

			url: 'https://api.forecast.io/forecast/9913fe3fb0ae16c65896c6408574aa2d/' + koordinaten.latitude + ',' + koordinaten.longitude,
			
			data: {

				//?units=si&lang=de in php z.b.
				units: 'si',
				lang: 'de'
			},

			//jasonP deklarieren, API-Abfrage (Intentifikation)
			dataType : 'jsonp'


		}).done(function(data) {
				
				console.log(data);
				$("#currentTemp").text(data.currently.apparentTemperature + "°C");
				//$("#source").text(data.flags['metno-license']); 
				//Sonderzeichen im Key: in eckigen Klammern geschrieben und kann nicht mehr via Punkt-Notation angesteuert werden
				
				//GOOGLE GEO-CODING ANFRAGE:
				$.ajax({
					
					url: 'https://maps.googleapis.com/maps/api/geocode/json',
					
					data:{
					 	
					 	latlng: koordinaten.latitude + ',' + koordinaten.longitude, 
					 	
					 	key: 'AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8',
					 	
					 	language: 'de'
					}


				}).done(function(data){

					console.log(data);
					//$("#currentLoc").text(data.results[0].formatted_address); 
					$("#currentLoc").text(data.results[0].address_components[2].long_name); 

					$(".icon1").text(data.results[0].icon); 

				
				});


		});
	});


	skycons.add($('.icon1')[0], Skycons.RAIN); //jQuery Objetkt 

	skycons.play();
	
	/*
	//anaonyme Funktion oder Funktionsreferenz übergeben (definierte Funktion) bei set Timeout
	setTimeout(function() {

		skycons.set($('.icon1')[0], Skycons.PARTLY_CLOUDY_DAY);

	}, 5000); */
	
});