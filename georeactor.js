#! /usr/bin/env node

const fs = require('fs');

const program = require('commander');

const toTopoJSON = require('to-topojson').convertFile;
const knownToTopoJSON = require('to-topojson').convertFileWithFormat;

var mapConfig = {
  div: "map",
  data: []
};

program
  .version('0.6.0')
  .arguments('<sourceFile>')
  .option('-l --label', 'include label', /(.*)/, false)
  .option('-f --format <format>', 'format of source file', /^(GeoJSON|TopoJSON|SHP|KML)$/i, '')
  .option('-m --map <mapType>', '(Google or Leaflet)', /^(google|leaflet)$/i, 'leaflet')
  .option('-d --div <divID>', 'id of map container', /(.*)/, 'map')
  .parse(process.argv);

if (!program.args.length) {
  console.error('Did not include a file name! Run georeactor --help');
} else {
  var sourceFile = program.args[0];

  function next (err) {
    if (err) {
      console.error('The conversion process had an error:');
      console.log(JSON.stringify(err));
      return;
    }

    mapConfig.map = program.map;
    mapConfig.div = program.div;
    mapConfig.data.push('mapdata.topojson');
    saveMapWithConfig(mapConfig);
  }

  if (program.format) {
    knownToTopoJSON(sourceFile, program.format, 'mapdata.topojson', next, console.log, program.label);
  } else {
    toTopoJSON(sourceFile, 'mapdata.topojson', next, console.log, program.label);
  }
}

function saveMapWithConfig(mapConfig) {
  console.log(mapConfig);
  if (mapConfig.map === 'google') {
    console.log('saving Google Maps API version');
  } else if (mapConfig.map === 'leaflet') {
    console.log('saving Leaflet + OSM version');
  } else {
    console.log('Must use "google" or "leaflet" - other map viewers not yet supported');
  }
}
