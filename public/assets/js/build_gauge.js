/**
 * build cpu
 * */
function buildCPU(average) {
  // Enter frequency between 0 and 180
  var level = parseFloat(average);
  //var level = 75;

  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Performance",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    /* title: "xxx",*/
    height: 300,
    width: 300,
    autosize:true,
    margin: {
      l: 20,
      r: 20,
      b: 40,
      t: 40,
      pad: 4
    },
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var GAUGE = document.getElementById("cpu_gauge");
  Plotly.newPlot(GAUGE, data, layout);
};


/**
 * build memory
 * */
function buildMemory(average) {
  // Enter frequency between 0 and 180
  var level = parseFloat(average);
  //var level = 75;

  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Performance",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    /* title: "xxx",*/
    height: 300,
    width: 300,
    autosize:true,
    margin: {
      l: 20,
      r: 20,
      b: 40,
      t: 40,
      pad: 4
    },
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var GAUGE = document.getElementById("memory_gauge");
  Plotly.newPlot(GAUGE, data, layout);
};



/**
 * build network
 * */
function buildNetwork(average) {
  // Enter frequency between 0 and 180
  var level = parseFloat(average);
  //var level = 75;

  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Performance",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    /* title: "xxx",*/
    height: 300,
    width: 300,
    autosize:true,
    margin: {
      l: 20,
      r: 20,
      b: 40,
      t: 40,
      pad: 4
    },
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var GAUGE = document.getElementById("network_gauge");
  Plotly.newPlot(GAUGE, data, layout);
};



/**
 * build disk
 * */
function buildDisk(average) {
  // Enter the frequency between 0 and 180
  var level = parseFloat(average);
  //var level = 75;

  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Performance",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    /* title: "xxx",*/
    height: 300,
    width: 300,
    autosize:true,
    margin: {
      l: 20,
      r: 20,
      b: 40,
      t: 40,
      pad: 4
    },
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var GAUGE = document.getElementById("disk_gauge");
  Plotly.newPlot(GAUGE, data, layout);
};