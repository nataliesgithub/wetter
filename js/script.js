$(document).ready(function(){

	navigator.geolocation.getCurrentPosition(function(position) {

		var koordinaten = {
			longitude:position.coords.longitude, 
			latitude:position.coords.latitude
		};

		$.ajax({ //Promise Callback: spezielle Objekte, kann erst ausgeführt werden, wenn Methode bereit ist

			//API Request, um zu intentifizieren
			url: 'https://api.forecast.io/forecast/9913fe3fb0ae16c65896c6408574aa2d/' + koordinaten.latitude + ',' + koordinaten.longitude,
			
			data: {

				//?units=si&lang=de in php z.b.
				units: 'si',
				lang: 'de'
			},

			//jasonP deklarieren, API-Abfrage
			dataType : 'jsonp'


		}).done(function(data) {
				
				console.log(data);
				$("#currentTemp").text(data.currently.apparentTemperature + "°C");
				//$("#source").text(data.flags['metno-license']); 
				//Wenn ein Sonderzeichen im Key vorkommt, muss dieser mit eckigen Klammern geschrieben und kann nicht mehr via Punkt-Notation angesteuert werden
				
				//GOOGLE GEO-CODING ANFRAGE:
				$.ajax({
					
					url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8',
					
					data:{
					 	
					 	latlng: koordinaten.latitude + ',' + koordinaten.longitude, 
					 	
					 	key: 'AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8';
					 	
					 	language: 'de';
					}

				}).done(function(data){

					console.log(data);
				
				});


		});
	});
	
});