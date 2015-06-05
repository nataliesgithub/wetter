$(document).ready(function(){

	$.ajax({
		"dataType" : "jsonp", //deklarieren, dass es sich um json-p handelt
		"url" : "https://api.forecast.io/forecast/7fb7656ea98c42261ad6a1b66b4e309e/47.4165925,9.3197752?callback=?&units=si" //Callback JSON-P anfrage ?callback=? und Von Fahrenheit zu Celsius &units=si
	}).done(function(data){

		console.log(data);
		$("#currentTemp").text(data.currently.apparentTemperature + "° C");
		$("#source").text(data.flags['metno-license']); //Wenn ein Sonderzeichen im Key vorkommt, muss dieser mit eckigen Klammern geschrieben und kann nicht mehr via Punkt-Notation angesteuert werden
	});

	
	//console.log(navigator.geolocation);
	navigator.geolocation.getCurrentPosition(function(position) {

		console.log(position);

	});

	
});