
function build_homepage(){
	body.empty();
	let homeBody = $('<div id = "homeDiv"></div>');
	homeBody.append('<div class = "buttonDiv" onclick = build_flight_interface()>Flights</div>');
	homeBody.append('<br>');
	homeBody.append('<img src= "plane_icon.png"></img></div>');
	homeBody.append('<div class = "buttonDiv" onclick= build_analytics_interface()>Analytics</div>');
	homeBody.append('<br>');
	homeBody.append('<img src = "analytics_icon.png" style = "width: 50% height: auto"></img>')
	$('body').append(homeBody);
}
function build_flight_interface(){
	body.empty();
	let listDiv = $('<div id = "flightsDiv"></div>');
	let body = $('body');
	body.append(listDiv);
	
	
}