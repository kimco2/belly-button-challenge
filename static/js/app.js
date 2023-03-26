const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//----------------------------------------------------------
function buildBubbleChart(sampleID){
  d3.json(url).then((data) => {
    let sampleData = data.samples;
    let dataForID = sampleData.filter(object => object.id == sampleID);
    let firstElement = dataForID[0];  /// What does this line do?
    
    let bubbleTrace1 = {
          x: firstElement['otu_ids'] ,
          y: firstElement['sample_values'],
          mode: 'markers',
          marker: {
            color: firstElement['otu_ids'],
            size: firstElement['sample_values'],
            // add color scale here to match coloros
            // colorscale: "colorscale"
            colorscale: "Portland"
          }
       }; 
      let bubbleData = [bubbleTrace1]

    let layout = {
        xaxis: {title: 'OTU ID'}
    };
      
      Plotly.newPlot('bubble', bubbleData, layout);     

})};



//----------------------------------------------------------
function buildBarChart(sampleId) {
  d3.json(url).then((data) => {
    let sampleData = data.samples;
    let dataForID = sampleData.filter(object => object.id == sampleId);
    let firstElement = dataForID[0];

    let values = firstElement['sample_values'].slice(0,10).reverse();
    let labels = firstElement['otu_ids'].slice(0,10).reverse();
    labels = labels.map(otu_ids => `OTU ${otu_ids}`);
    let hovertext = firstElement['otu_labels'].slice(0,10).reverse();  // I don't think this is working correctly
    console.log(labels);
    // values = values.map(otuID => `OTU ${otuID}`);
  

    let barChart = [{
          x: values,
          y: labels,
          type: "bar",
          orientation: 'h',
          text: hovertext
      }]; 

      let layout = {
        hovermode: "closest"
       };

      Plotly.newPlot("bar", barChart, layout);      
        })};

    
//----------------------------------------------------------
  function init(){
    let selector = d3.select("#selDataset");
    d3.json(url).then((data) => {
      let sampleNames = data.names
      for (let i = 0; i < sampleNames.length; i++)
      {      selector
                 .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
       };
       buildBarChart("940");
       buildBubbleChart("940");
       buildMetaData("940");
      })} 


///----------------------------------
function optionChanged(newSample){
  buildBarChart(newSample);
  buildBubbleChart(newSample);
  buildMetaData(newSample);
};

//----------------------------------------------------------
  function buildMetaData(sampleID) {
    let panel = d3.select("#sample-metadata");  
    // let panelSpace = panel.append("h6")
    // panelSpace.attr("class", "metadata")
    d3.json(url).then((data) => {
          // Getting the 'samples' data from the json file
      let metaData = data.metadata;
      let dataMeta = metaData.filter(object=>object.id=sampleID);
      let firstElement = dataMeta[0];
      panel.html('');
      console.log(firstElement)
      for (key in firstElement){
        panel.append("h6").text(`${key}: ${firstElement[key]}`);
      };
      // str = JSON.stringify(firstElement, null, 4);
      // let str_update = str.replace(/["{}]/g, '');
      // let further_update = str_update.split(",").join('<br/>')
      // let str_update = str_update.split(/,/);
      // console.log(further_update);
        // panelSpace.text(further_update)
    })};

    


//----------------------------------------------------------
    // function optionChanged(ns){
    //   buildBarChart("940")
    //   // buildMetadata(nse)
    // };







init();
