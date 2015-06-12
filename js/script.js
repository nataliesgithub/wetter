$(document).ready(function(){
	/*
	$.ajax({
		"dataType" : "jsonp", //deklarieren, dass es sich um json-p handelt
		"url" : "https://api.forecast.io/forecast/7fb7656ea98c42261ad6a1b66b4e309e/47.4165925,9.3197752?callback=?&units=si" //Callback JSON-P anfrage ?callback=? und Von Fahrenheit zu Celsius &units=si
		}).done(function(data){
	*/

		navigator.geolocation.getCurrentPosition(function(position) {

		var koordinaten = {
			longitude:position.coords.longitude, 
			latitude:position.coords.latitude
		};

		$.ajax({ //Promise Callback: spezielle Objekte, kann erst ausgeführt werden, wenn Methode bereit ist

			//API Request, um zu intentifizieren
			url: 'https:api.forecast.io/forecast/9913fe3fb0ae16c65896c6408574aa2d' + koordinaten.latitude + ',' + koordinaten.longitude,
			
			data: {
				//?units=si&lang=de in php z.b.
				units: 'si',
				lang: 'de'
			}).done(function(data) {
				console.log(data);

			//jasonP deklarieren, API-Abfrage
			dataType : 'jsonp'


			});


		});

		/*
		TEMPERATUR ANZEIGEN:

		console.log(data);
		$("#currentTemp").text(data.currently.apparentTemperature + "° C");
		$("#source").text(data.flags['metno-license']); //Wenn ein Sonderzeichen im Key vorkommt, muss dieser mit eckigen Klammern geschrieben und kann nicht mehr via Punkt-Notation angesteuert werden
		*/
	});


	/*
	KOORDINATEN AUSGEBEN:

	console.log(navigator.geolocation);
	navigator.geolocation.getCurrentPosition(function(position) {

		console.log(position);
		$('.longitude').text(position.coords.longitude);
		$('.latitude').text(position.coords.latitude);
		$('.accuracy').text(position.coords.accuracy);

	

	}); ajax 1 beenden
	*/

	
});