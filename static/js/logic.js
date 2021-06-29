



let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Earthquake LayerGroup Creation
let earthquakes = L.layerGroup();

// Tile Layer Creation
var tileLayerMap = L.tileLayer( "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
{
	attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
 	tileSize: 512,
 	maxZoom: 18, 
 	zoomOffset: -1,
 	id: "mapbox/light-v10",
 	accessToken: API_KEY } );

// Map Creation 
var myMap = L.map("mapid",
{ 
	center: [40.7, -94.5] , 
	zoom: 3
 });

tileLayerMap.addTo(myMap);

d3.json(URL).then(function(data) { 
// Use depth to stablish the color 
function chooseColor(depth) {
	switch(true) {
		case depth > 90:
		  return "red";
		case depth > 70:
		  return "lightred";
		case depth > 50:
		  return "orange";
		case depth > 30:
		  return "yellow";
		case depth > 10:
		  return "lightyellow";
		default:
		  return "lightblue";
	      }
	    };
	
	
// Use the magnitude to create the markersize 
function markerSize(magnitude) {
	 return magnitude * 4; 
	};

// Create geoJson and add the popups
 L.geoJSON(data, {pointToLayer: function (feature, latlng) { 
	 return L.circleMarker(latlng,
		{
		 radius: markerSize(feature.properties.mag),
		 fillColor: chooseColor(feature.geometry.coordinates), 
		 weight: 0.5, 
		 fillOpacity: 0.5, 
		 color: "blue", 
		 stroke: true, }); 
		}, onEachFeature: function(feature, layer) {
			 layer.bindPopup("<h1> Location: " + feature.properties.place + "</h1><hr><h3>Date: " + feature.properties.time + "</h3><hr><h3>Magnitude: " + feature.properties.mag + "</h3>");
			 }
		}).addTo(myMap);

earthquakes.addTo(myMap); });