// Define the URL for data retrieval
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to update the charts when a new option is selected
function optionChanged() {
  const selectedValue = d3.select("#selDataset").property("value");
  console.log("Selected value:", selectedValue);

  // When selDataset is changed, grab the data
  d3.json(url).then(function(data) {
    console.log(data);
    getData(data, selectedValue);
  });
}

// Attach an event listener to the dropdown
d3.select("#selDataset").on("change", optionChanged);

// Function to process data and create charts
function getData(data, selectedValue) {
  // Empty arrays to store values, ids, and labels
  const allSampleValues = [];
  const allOtuIds = [];
  const allOtuLabels = [];

  // Find the sample based on the selected value
  const sample = data.samples.find(sample => sample.id === selectedValue);

  if (sample) {
    // Extract data
    allSampleValues.push(...sample.sample_values);
    allOtuIds.push(...sample.otu_ids);
    allOtuLabels.push(...sample.otu_labels);

    // Sort and select the top 10 OTUs
    const top10SampleValues = allSampleValues.slice(0, 10);
    const top10OtuIds = allOtuIds.slice(0, 10).map(id => `OTU ${id}`);
    const top10OtuLabels = allOtuLabels.slice(0, 10);

    // Reverse to put it in descending order
    top10SampleValues.reverse();
    top10OtuIds.reverse();
    top10OtuLabels.reverse();

    // Create the bar chart
    const barTrace = {
      x: top10SampleValues,
      y: top10OtuIds,
      text: top10OtuLabels,
      type: 'bar',
      orientation: 'h',
    };

    const barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: 'Sample Values' },
      yaxis: { title:
