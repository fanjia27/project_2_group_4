function buildGaugeChart(app) {

  // @TODO: Complete the following function that builds the metadata panel

  var appSelection = d3.select("#selDataApp").value

  // Create url (this matches the url string in Flask app routes like: @app.route('/api/data'))
  let url = `http://localhost:5000/api/data/apps_summary/${appSelection}`

// Configure the type of HTTP request you are attempting to make
  let options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
  // mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    } 
  };

  fetch(url, options) // pass the url and options object to the fetch() function
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(`This is data: `, data);
      // Do something with the response data here!
    });

    
  // Use `d3.json` to fetch the metadata for a sample ("/api/data/apps_summary/<app>")
  var appSummaryUrl = `/api/data/apps_summary/${app}`;
  var appSummary = d3.json(appSummaryUrl).then(data=> {
    console.log(data);

    // Use d3 to select the panel with id of `#sample-metadata`
    var cpu_gauge = d3.select("#cpu_gauge");

    // Use `.html("") to clear any existing metadata
    $("#cpu_gauge").html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    //http://127.0.0.1:5000/
    // BONUS: Build the Gauge Chart (codes for gauge chart is given from bonus.js?!)

    buildGauge(data.avg_cpu);
  });


};


function init() {
  // Grab a reference to the dropdown select element
  var appSelection = d3.select("#selDataApp").value

  // Create url (this matches the url string in Flask app routes like: @app.route('/api/data'))
  let url = `http://localhost:5000/api/data/apps_summary/${appSelection}`

// Configure the type of HTTP request you are attempting to make
  let options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
  // mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    } 
  };

  fetch(url, options) // pass the url and options object to the fetch() function
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(`This is data: `, data);
      // Do something with the response data here!
    });

    buildGaugeChart(appName);

  

  
};

// Initialize the dashboard
init();
