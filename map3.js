// initialize the map
var mymap3 = L.map('mapdiv3').setView([36.47431, -96.65782], 4)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap3)
var gjsonUrl = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'

//////////////////////////////////////////////////////////////////////////////
jQuery.getJSON(gjsonUrl, function(data) {

  var styleFunction = function(feature) {
    var medAge = feature.properties.MED_AGE // get the current state's Median Age attribute
    var colorString = "#ABDDA4" // let the initial color be a darker green
    if (medAge < 38) {
      colorString = "#2B83BA"
    } // if the state's median age is less than the average, color it a lighter green
    return {
      color: colorString, // use the color variable above for the value
      weight: 1,
      fillOpacity: 0.2,
      weight:5
    }
  }

  var geojsonObject = {
    style: styleFunction,
    onEachFeature: onEachFeatureFunction
  }
  L.geoJSON(data, geojsonObject).addTo(mymap3)
})

var onEachFeatureFunction = function(feature, layer) {
  // contents of the function
  var name = feature.properties.STATE_NAME
  var age = feature.properties.MED_AGE
  layer.bindPopup('Median age of ' + name + ': ' + age + '<br>National average: 38')
  statesLayerObject.addLayer(layer)
}
///////////////////////////////////////////////////////////////////////////////
//Controls to toggle basemaps
// adding first basemap to a variable
var grayBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(mymap3)
// adding second basemap to a variable
var streetsBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(mymap3)
//create an object that acts as a list of basemaps
var basemapsObject = {
  'Streets': streetsBasemapObject,
  'Gray canvas': grayBasemapObject
}
//Controls to show and hide GeoJSON layers
//First we need to create an empty “placeholder”
var statesLayerObject = L.layerGroup().addTo(mymap3)
//Finally, create a “list”
var layersObject = {
  'Median age by state': statesLayerObject
}
L.control.layers(basemapsObject, layersObject).addTo(mymap3)
