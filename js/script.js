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

		});

	});
	
});