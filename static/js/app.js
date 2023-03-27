const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// ----------------------------------------
// Build the bubble chart
// ----------------------------------------
function buildBubbleChart(sampleID){
  // Reading the JSON url
  d3.json(url).then((data) => {
    // Getting the 'samples' data from the json file
    let sampleData = data.samples;
    // Filtering the data to just one ID
    let dataForID = sampleData.filter(object => object.id == sampleID);
    let firstElement = dataForID[0];
    
    // Assign values for the bubble plot
    let bubbleTrace1 = {
          x: firstElement['otu_ids'] ,
          y: firstElement['sample_values'],
          text: firstElement['otu_labels'],
          mode: 'markers',
          marker: {
            color: firstElement['otu_ids'],
            size: firstElement['sample_values'],
            colorscale: "Portland"
          }
       }; 
      
      // Create data array
      let bubbleData = [bubbleTrace1]
    
      // Apply x axis title to the layout
      let layout = {
        xaxis: {title: 'OTU ID'}
      };

      // Invoke the plotting function and render the plot to the div id "bubble"
      Plotly.newPlot('bubble', bubbleData, layout);     

})};


// ----------------------------------------
// Build the bar chart
// ----------------------------------------
function buildBarChart(sampleId) {
  // Reading the JSON url
  d3.json(url).then((data) => {
    // Getting the 'samples' data from the json file
    let sampleData = data.samples;
    // Filtering the data to just one ID
    let dataForID = sampleData.filter(object => object.id == sampleId);
    let firstElement = dataForID[0];

    // Defining the data to use in the bar chart
    let values = firstElement['sample_values'].slice(0,10).reverse();
    let labels = firstElement['otu_ids'].slice(0,10).reverse();
    labels = labels.map(otu_ids => `OTU ${otu_ids}`);
    let hovertext = firstElement['otu_labels'].slice(0,10).reverse();  
   
    // Assign values to the bar chart
    let barChart = [{
          x: values,
          y: labels,
          type: "bar",
          orientation: 'h',
          text: hovertext
      }]; 

      // Apply hovermode to the layout
      let layout = {
        hovermode: "closest"
       };
      
      // Invoke the plotting function and render the chart to the div id "bar"
      Plotly.newPlot("bar", barChart, layout);      
        })};

// ----------------------------------------
// Build the meta data panel
// ----------------------------------------
function buildMetaData(sampleID) {
    // Selecting the panel body via the id 'sample metadata'
  let panel = d3.select("#sample-metadata");
  // Reading the JSON url
  d3.json(url).then((data) => {
    // Getting the 'metadata' data from the json file
    let metaData = data.metadata;
    // Filtering the data to just one ID
    let dataMeta = metaData.filter(object=>object.id==sampleID);
    let firstElement = dataMeta[0];
    // Clearing any data out of the panel
    panel.html('');
    // Appending the value pairs to the panel
    for (key in firstElement){
      panel.append("h6").text(`${key}: ${firstElement[key]}`);
    };
  })};

    
// ----------------------------------------
// Function for when webpage is initialised
// This includes the drop down selector and setting the inital charts to show data from id '940'.
// ----------------------------------------
  function init(){
    // Selecting the drop down component
    let selector = d3.select("#selDataset");
    // Reading the JSON url
    d3.json(url).then((data) => {
      // Getting the 'names' from the json file
      let sampleNames = data.names
      // Adding all the names to the drop down component and assigning their name as the value
      for (let i = 0; i < sampleNames.length; i++)
          {selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
       };

      //  Show initital charts using the data from id 940
       buildBarChart("940");
       buildBubbleChart("940");
       buildMetaData("940");
      })}; 


// ----------------------------------------
// Function that updates the charts and metadata when a different ID is selected
// ----------------------------------------
function optionChanged(newSample){
  buildBarChart(newSample);
  buildBubbleChart(newSample);
  buildMetaData(newSample);
};

init();
