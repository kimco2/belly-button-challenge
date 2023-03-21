const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

let values = (data["sample_values"]);
console.log(values)



let labels = out_ids
let hovertext = otu_labels
let title = 

let trace1 = {
    x: values,
    y: labels,
    type: 'bar',
    orientation: 'h'
    
  };
  
  let data = [trace1];
  
  let layout = {
    title: title
  };
  
  Plotly.newPlot("plot", data, layout);
  





// Create an array for the data
// let values = Object.values(samples.sample_values);
// console.log(values);

// let values = data.map(function (row){
//     return row.sample_values
// });
// console.log(values)