
var root_url = "http://comp426.cs.unc.edu:3001/";
var sel_airline = '';


function build_homepage() {
	let body = $('body');
	body.empty();
	let homeBody = $('<div id = "homeDiv">' + sel_airline + ' Cashflow Projection</div>');
	homeBody.append('<button id = "choose_new_al"> Choose a New Airline </button>');
	homeBody.append('<br>');
	homeBody.append('<button id = "hp_flights">' + sel_airline + ' Flight Information</button>');
	homeBody.append('<div class = "a_div"><br><button id = "hp_an">' + sel_airline + ' Analytics / Cash Flow Metrics</button></div>');
	body.append(homeBody);
}

function build_flight_interface(){
	let body = $('body');
	body.empty();
	body.append('<button id = "home_button"> Home </button>');
	let listDiv = $('<div id = "flightsDiv">Flights</div>');
	body.append(listDiv);
}

function build_analytics_interface()	{
	let body = $('body');
	body.empty();
	body.append('<button id = "home_button"> Home </button>');
	let listDiv = $('<div id = "analyticsDiv">Cash Flow Analytics</div>');
	body.append(listDiv);
}

function build_sel_page()	{
	let body = $('body');
	body.empty();
	body.append('<div class = "chooseDiv"> Please Select an Airline to View / Modify Financial Projections</div>');
	
	let dropdown = $('<div class="dropdown"></div>');
	dropdown.append('<button onclick="dropdown()" class="dropbtn">Airlines</button>');
	let myDD = $('<div id="myDropdown" class="dropdown-content">');
	myDD.append('<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">');


	$.ajax(root_url + 'airlines',
	       {
		   type: 'GET',
		   xhrFields: {withCredentials: true},
		   dataType: 'json',
		   success: (response) => {
		       if (response.status) {
			   console.log('holy fuck it worked');
		       }
		   },
		   error: () => {
		   		console.log('error');
		       alert('error');
		   }
	       });


	dropdown.append(myDD);
	body.append(dropdown);
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

$('body').on('click', '.al', function()	{
	sel_airline = this.innerText;
	console.log(sel_airline);
	build_homepage();
});


$('body').on('click', '#choose_new_al', function()	{
	sel_airline = '';
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




});

