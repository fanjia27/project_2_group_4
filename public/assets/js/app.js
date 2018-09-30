// build gauage chart (call another js of gauge builder)
function buildGaugeChart(appSelection) {

  //parse app selection value to api route to get data
  let appSummaryUrl = `/api/data/apps_summary/${appSelection}`
  console.log(appSummaryUrl)

  //read the data from json/api
  d3.json(appSummaryUrl).then(data=> {
    console.log("Average Info:");
    console.log(data);
    console.log(data[0].avg_cpu);
    console.log(data[0].avg_memory);
    console.log(data[0].avg_network);
    console.log(data[0].avg_disk);


    var averageCPU = (data[0].avg_cpu) * 100;
    var averageMemory = (data[0].avg_memory) * 100;
    var averageNetwork = (data[0].avg_network) * 100;
    var averageDisk = (data[0].avg_disk) * 100;

    //clear content
    $("#cpu_gauge").html("");

    //build gauge
    buildCPU(averageCPU);
    buildMemory(averageMemory);
    buildNetwork(averageNetwork);
    buildDisk(averageDisk);
  });

};

// build pie chart
function buildPie(appSelection){

  let appSummaryUrl = `/api/data/apps_summary/${appSelection}`
  console.log(appSummaryUrl)

  //read the data from json/api
  d3.json(appSummaryUrl).then(data=> {
    console.log("Performance data:");
    console.log(data);
    console.log(data[0].nbr_of_average_performing);
    console.log(data[0].nbr_of_under_performing);
    console.log(data[0].nbr_of_exceed_performing);
    console.log(data[0].total_server)

    var avg_performing = data[0].nbr_of_average_performing;
    var under_performing = data[0].nbr_of_under_performing;
    var exceed_performing = data[0].nbr_of_exceed_performing;
    var total_server = data[0].total_server;

    
    //converting null to zero
    if (avg_performing) {
      avg_performing === avg_performing
    }
    else {avg_performing = 0};

    if (under_performing) {
      under_performing === under_performing
    }
    else {under_performing = 0};

    if (exceed_performing) {
      exceed_performing === exceed_performing
    }
    else {exceed_performing = 0};

    

    //money, currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    
    //formatter.format(1000) // "$1,000.00"

    //calculate cost of saving by under performing server    
    var cost_under = formatter.format(under_performing * 500);
    var cost_exceed = formatter.format(exceed_performing * 500);
    var cost_average = formatter.format(avg_performing * 500);

    //calculate total cost of server
    var total_cost = formatter.format(total_server * 500);

    //calculate cost saving of under performing server
    var half_under_perform = Math.round(under_performing * 0.5333);
    console.log("elimiated servers: ",half_under_perform)
    var cost_saving = formatter.format(half_under_perform * (under_performing * 500));
    console.log("cost saving: ",cost_saving)
    var annual_cost_saving = formatter.format(12 * (half_under_perform * (under_performing * 500)));
    console.log("annual cost saving: ",annual_cost_saving)
  
  var data = [{
    values: [avg_performing, under_performing,exceed_performing],
    labels: ['Avg. Performing', 'Under Performing', 'Exceed Performing'],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500,
    margin: {
      l: 30,
      r: 50,
      b: 20,
      t: 20,
    },
  };
  
  //app summary:
  //var server_count = document.getElementById("server_count");
  //$("#server_count").html(`Total Server: ${total_server}`);
  $("#app-total-server").html(`Total server: ${total_server}`);
  $("#app-total-cost").html(`Total server cost: ${total_cost} /month`);
  $("#app-under").html(`Total under performing server (<35%): ${under_performing} at total cost of ${cost_under} /month`);
  $("#app-exceed").html(`Total exceed performing server (>95%): ${exceed_performing} at total cost of ${cost_exceed} /month`);
  $("#app-average").html(`Total average performing server (between 35-95%): ${avg_performing} at total cost of ${cost_average} /month`);

 
//conclusion and analysis narrative:
if (under_performing > 0 ) {
$("#narrative-conclusion").html(`
${appSelection} currently uses ${total_server} servers, 
of which ${under_performing} operate at an inefficient level.  
${half_under_perform} of these servers can eliminated by combining the inefficient servers and bringing their capacity to 75%.  
This will save the Company ${cost_saving} per month, or ${annual_cost_saving} per year.
`
);
}
else {
  $("#narrative-conclusion").html(`
  Given ${appSelection}'s servers are running at average capacity, between 35% and 95%, no cost saving apply.
  `)
};

  $("#pie_chart").html("");
  var PIE = document.getElementById("pie_chart");
  Plotly.newPlot(PIE, data, layout);
  });
};


//build bar chart
function buildBarChart(appSelection) {

  d3.json('/api/data_summary').then((apps) =>{
    // console.log(apps);
    var name = [];
    var cost = [];
    for (var index = 0; index < apps.length; index++) {
        var app = apps[index];
        name.push(app.app_name);
        cost.push(app.total_server_cost)};
  /*
  d3.event.preventDefault();
  var v = document.getElementById("selDataApp");
  var select_value = v.options[v.selectedIndex].value;
  */
  
  var select_color = name.map(function(element ) { 

      if (element == appSelection) {
          return "Red";
      } else {
          return "LightBlue";
      }
  });

  console.log(select_color);

  var serverdata = [
      {
          x: name,
          y: cost,
          marker:{
              color: select_color
          },
          type: 'bar'
      }
  ];

  // Apply the group bar mode to the layout
  var layout = {
      width: 1100,
      height: 750,
      autosize:true,
      margin: {
        l: 60,
        r: 20,
        b: 120,
        t: 10,
        pad: 4
      },
      xaxis: {tickfont: {
          size: 12,
          color: 'rgb(107, 107, 107)'
      }},
      yaxis: {tickfont: {
          size: 12,
          color: 'rgb(107, 107, 107)'
      }}
  };
  
  $("#bar_chart").html("");
  var BAR = document.getElementById("bar_chart");
  Plotly.newPlot(BAR, serverdata, layout)
})
};




function init() {

  // Grab a reference to the dropdown select element
  var appSelection = d3.select("#selDataApp").property("value")
  console.log(appSelection)

  //build gauge chart
  buildGaugeChart(appSelection);
  buildPie(appSelection);
  buildBarChart(appSelection);
  
};


function optionChanged () {

  // Grab a reference to the dropdown select element
  var appSelection = d3.select("#selDataApp").property("value")

  //
  buildGaugeChart(appSelection);
  buildPie(appSelection);
  buildBarChart(appSelection);
};

// Initialize the dashboard
init();
