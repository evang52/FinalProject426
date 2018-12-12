

var root_url = 'http://comp426.cs.unc.edu:3001';
var sel_airline = '';
var sel_id = 0;
var flight_id = 0;
var revenue = 0;
var cost = 0;
var profit = 0;


function build_homepage() {
	let body = $('body');
	body.empty();
	let homeBody = $('<div id = "homeDiv"><p class = "homeText">' + sel_airline + ' Cashflow Projection</p> <br> </div>');
	homeBody.append('<button id = "choose_new_al"> Choose a New Airline </button>');
	homeBody.append('<br>');
	let butts = $('<div id = homeButDiv></div>');
	homeBody.append(butts);
	butts.append('<button id = "hp_flights">' + sel_airline + ' Flight Information <br> <img id = "plane" src= "plane_icon.gif"></img></button>');
	butts.append('<div class = "a_div"><br><button id = "hp_an">' + sel_airline + ' Analytics / Cash Flow Metrics <br> <img id = "graph" src = "analytics_icon.gif" style = "width: 50% height: auto"></img> </button></div>');
	body.append(homeBody);
	body.append('<button id = "logout"> Logout </button>');
}

function build_flight_interface(){
	let body = $('body');
	body.empty();
	body.append('<button id = "home_button"> Home </button>');
	body.append('<div class = "chooseDiv">Flights</div>');
	let listDiv = $('<div id = "flightsDiv"></div>');
	let ct = $('<p class = "descText">Number of Optional Flights: </p>');
	console.log(sel_id);
	
	$.ajax(root_url + '/flights?filter[airline_id]=' + sel_id,
	       {
		   type: 'GET',
		   xhrFields: {withCredentials: true},
		   success: (response) => {
		   		let count = 0;
			   	response.forEach(function(object) { 
			   	var fl_num = object.number;
			   	var dept_id = object.departure_id;
			   	var arr_id = object.arrival_id;
			   	var dep_tim = object.departs_at;
			   	var dep_code = '';
		   		var arr_code = '';
		   		let but = $('<button class="in_flight" id=' + fl_num + '>' + '</button>');

			   		$.ajax(root_url + '/airports/' + dept_id,
			   		{
			   		type: 'GET',
			   		xhrFields: {withCredentials: true},
			   		success: (response) => {
			   			but.append(response.code + ' to '); 


			   			$.ajax(root_url + '/airports/' + arr_id,
			   			{
			   			type: 'GET',
			   			xhrFields: {withCredentials: true},
			   			success: (response) => {
			   			but.append(response.code); 
			   			but.append(' Departing at ' + dep_tim.substring(11,16));
			   			},
			   			error: () => {
		       			alert('error with arrival ID');
		   				}

			   			});




			   			},
			   			error: () => {
		       			alert('error with departure ID');
		   				}

			   		});

			   		


			   	count++;
			   listDiv.append(but);
			   });	
			   ct.append(count);
		   },
		   error: () => {
		       alert('error with airline ID');
		   }
	       });

	body.append(ct);
	body.append(listDiv);
}

function build_analytics_interface()	{
	// let head = $('head');
	// head.empty();
	// head.append('<title>' + sel_airline + ' Cash Flow Statistics</title>');
	// head.append('<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="crossorigin="anonymous"></script>');
	// head.append('<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>');
	// head.append('<script src = "script.js"> </script>');
	// head.append('<script src = "google.js"> </script>');
	let body = $('body');
	body.empty();
	body.append('<button id = "home_button"> Home </button><br>');
	let topDiv = $('<div></div>');
	topDiv.append('<input type = "text" id = "rev_per_flight" placeholder = "Revenue Per Flight:">');
	topDiv.append('<br>');
	topDiv.append('<input type = "text" id = "cost_per_flight" placeholder = "Cost Per Flight:">');
	body.append(topDiv);
	let bottomDiv = $('<div></div>');
	bottomDiv.append('<p class = "descText">Total Revenue: ' + revenue + '</p><br>');
	bottomDiv.append('<p class = "descText">Total Costs: ' + cost+ '</p><br>');
	bottomDiv.append('<p class = "descText"> Profit: ' + profit + '</p>');
	body.append(bottomDiv);

}


function build_instance_interface()	{
	let body = $('body');
	body.empty();
	body.append('<button class= back_to_flights>Return to All Flights</button>');
	let new_inst_div = $('<div id = "instance_div"></div>');
	new_inst_div.append('<input type = "text" id = "date_input" placeholder = "Date: (YYYY-MM-DD)">');
	body.append(new_inst_div);
	body.append('<button class = "createInstance"> Create New Instance of this Flight </button>');
	body.append('<p class = "descText">Existing Instances</div>');
	let listDiv = $('<div id = "inst_list"></div>');

	$.ajax(root_url + '/instances?filter[flight_id]=' + flight_id,
	       {
		   type: 'GET',
		   xhrFields: {withCredentials: true},
		   dataType: 'json',
		   success: (response) => {
		   		console.log(response);
			   response.forEach(function(object) {listDiv.append('<p>' + object.date + '</p>' + '<br>');});
		   },
		   error: () => {
		   		console.log('error');
		       alert('error');
		   }
	       });
	body.append(listDiv);

}


function build_sel_page()	{
	let body = $('body');
	body.empty();
	body.append('<button id = "logout"> Logout </button>');
	body.append('<div class = "chooseDiv"> Please Select an Airline to View / Modify Financial Projections</div>');
	body.append('<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">');
	let dropdown = $('<div class="dropdown"></div>');
	dropdown.append('<button onclick="dropdown()" class="dropbtn">Airlines</button>');
	let myDD = $('<div id="myDropdown" class="dropdown-content">');
	$.ajax(root_url + '/airlines',
	       {
		   type: 'GET',
		   xhrFields: {withCredentials: true},
		   dataType: 'json',
		   success: (response) => {
			   response.forEach(function(object) {myDD.append('<p class = "al" id =' + object.id +'>' + object.name + '</p>');});
		   },
		   error: () => {
		   		console.log('error');
		       alert('error');
		   }
	       });
	dropdown.append(myDD);
	body.append(dropdown);
}

function build_login_page()	{
	let body = $('body');
	body.empty();
	body.append('<h1 class = "homeText">Cash Flow Simulator Login</h1>');
	let li = $('<div id = "login"></div>');
		li.append('<input type = "text" id = "login_user" placeholder = "Username:"><br>');
		li.append('<input type = "text" id = "login_pass" placeholder = "Password:"><br>');
		li.append('<button id = "login_btn">Login</button>');
	body.append(li);
}


function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("p");
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}




$(document).ready(() => {

    $('body').on('click', '#login_btn', function()  {
	
	let user = $('#login_user').val();
	let pass = $('#login_pass').val();

	$.ajax(root_url + "/sessions",
	       {
		   type: 'POST',
		   xhrFields: {withCredentials: true},
		   dataType: 'json',
		   data: {
		   		"user": {
		       		"username": user,
		       		"password": pass
		   				}
			},	
		   success: (response) => {
			   build_sel_page();
		   },
		   error: () => {
		       alert('Wrong Username or Password, try again');
		   }
	       });
    });

$('body').on('click', '#logout', function()	{
	$.ajax(root_url + "/sessions",
	       {
		   type: 'DELETE',
		   xhrFields: {withCredentials: true},
		   success: (response) => {
			   build_login_page();
		   },
		   error: () => {
		       alert('Something is Wrong with Logout');
		   }
	       });
    });




$('body').on('click', '.al', function()	{
	sel_airline = this.innerText;
	sel_id = parseInt($(this).attr('id'));
	console.log(sel_airline);
	console.log(sel_id);
	build_homepage();
});


$('body').on('click', '#choose_new_al', function()	{
	sel_airline = '';
	sel_id = 0;
	build_sel_page();
});


$('body').on('click', '#hp', function()	{
	build_homepage();
});

$('body').on('click', '#home_button', function()	{
	build_homepage();
});

$('body').on('click', '#hp_flights', function()	{
	build_flight_interface();
});

$('body').on('click', '#hp_an', function()	{
	build_analytics_interface();
});

$('body').on('click', '.in_flight', function()	{
	flight_id = parseInt($(this).attr('id'));
	build_instance_interface();
});

$('body').on('click', '.back_to_flights', function()	{
	build_flight_interface();
});

$('body').on('click', '.createInstance', function()	{
	// Read date from input
	let in_date = $('#date_input').val();
	$.ajax(root_url + '/instances',
	       {
		   type: 'POST',
		   xhrFields: {withCredentials: true},
		   dataType: 'json',
		   data: {
		   		"instance": {
		       		"flight_id": flight_id,
		       		"date": in_date
		   				}
			},	
		   success: (response) => {
			  console.log('New Instance Posted');
		   },
		   error: () => {
		       alert('error');
		   }
	       });

	build_instance_interface();
});



});
