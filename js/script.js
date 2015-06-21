$(document).ready(function(){

	var skycons = new Skycons({
		color: "white",
		resizeClear: true
	});
	
	var koordinaten;

	navigator.geolocation.getCurrentPosition(function(position) {

		koordinaten = {
			longitude:position.coords.longitude, 
			latitude:position.coords.latitude
		};

		drawMap(new google.maps.LatLng(koordinaten.latitude, koordinaten.longitude));

		//api anfrage mit forecast.io:
		$.ajax({ //Promise Callback: spezielle Objekte, kann erst ausgeführt werden, wenn Methode bereit ist

			url: 'https://api.forecast.io/forecast/9913fe3fb0ae16c65896c6408574aa2d/' + koordinaten.latitude + ',' + koordinaten.longitude,
			
			data: {

				units: 'si',
				lang: 'de'
			},

			//jasonP deklarieren, API-Abfrage (Intentifikation)
			dataType : 'jsonp'


		}).done(function(data) {
				
			//console.log(data);

			//Temperatur
			$("#currentTemp").text(data.currently.apparentTemperature + " °C");
			//Wetterbeschreibung
			$("#currentDesc").text(data.currently.summary);

			//$("#source").text(data.flags['metno-license']); 

			skycons.add($('.icon1')[0], data.currently.icon);
			skycons.play();

				
			//google geocooding:
			$.ajax({
					
				url: 'https://maps.googleapis.com/maps/api/geocode/json',
					
				data:{
					 	
					 latlng: koordinaten.latitude + ',' + koordinaten.longitude, 
					 key: 'AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8',
					 language: 'de'
				}

			}).done(function(data){
				//console.log(data);
				//$("#currentLoc").text(data.results[0].formatted_address); 

				//Location
				$("#currentLoc").text(data.results[0].address_components[2].long_name); 
				//Adress
				$("#currentAddr").text(data.results[0].formatted_address);;
			});
		});
	});

	//subpage mit karte
	$(document).on('pageshow', '#sub', function() {
		console.log(koordinaten);
		drawMap(new google.maps.LatLng(koordinaten.latitude, koordinaten.longitude));
	});

	function drawMap(latlng) {
		var options = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map($('.map-canvas')[0], options);

		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
	}

	
	/*
	//anaonyme Funktion oder Funktionsreferenz übergeben (definierte Funktion) bei set Timeout
	setTimeout(function() {

		skycons.set($('.icon1')[0], Skycons.PARTLY_CLOUDY_DAY);

	}, 5000); */
	
});