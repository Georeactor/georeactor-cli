# georeactor-cli

Georeactor is an experimental interface for creating interactive maps.

This is the command-line version

## Installing

You must have NodeJS and npm installed. Usually installing Node installs npm, too.

```bash
npm install georeactor-cli -g
```

Now you're ready to create Georeactor maps from the command line, just by pointing it at files!

## Usage

```bash
georeactor borders.geojson
> converting GeoJSON to TopoJSON
> saving Leaflet + OSM version
> generating map...
```

### Options

Very useful options to make different kinds of maps!

```bash
georeactor borders.json -f GeoJSON -m google -d gmaps -l
```

* -f: format of source file (GeoJSON, TopoJSON, KML, and SHP supported)
* -m: map type (Google and Leaflet supported, defaults to Leaflet)
* -d: div id (defaults to "map")
* -l: adds a label file (centroids of polygons and multipolygons)

## License

MIT license
