import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "./constants";
import { platformCoordinates } from "./constants";
import { map } from "lodash";

const mapCenter = [77.57236262183821, 12.978029893890145];
const southWestCorner = [77.57109651389204, 12.97732048536717];
const northEastCorner = [77.57359576840287, 12.978696550289667];

mapboxgl.accessToken = MAPBOX_TOKEN;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapboxInstance = null;
  }

  componentDidMount() {
    const mapboxInstance = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v11",
      center: mapCenter,
      minZoom: 17,
    });
    mapboxInstance.fitBounds([southWestCorner, northEastCorner]);
    this.mapboxInstance = mapboxInstance;

    this.onMapLoad(() => {
      // mapboxInstance.on("zoom", () => {
      //   console.log(mapboxInstance.getZoom());
      // });
      mapboxInstance.addSource("platforms", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: map(platformCoordinates, (p) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: p.coordinates,
            },
            properties: {
              title: p.platform,
            },
          })),
        },
      });

      mapboxInstance.addLayer({
        id: "circle-layer",
        type: "circle",
        source: "platforms",
        paint: {
          "circle-radius": 12,
          "circle-color": "#4a89f3",
          "line-border-color": "white",
        },
      });

      mapboxInstance.addLayer({
        id: "symbol-layer",
        type: "symbol",
        source: "platforms",
        layout: {
          "text-field": ["get", "title"],
          "text-size": 11,
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
    });
  }

  onMapLoad = (fn) => {
    if (this.mapboxInstance._loaded) {
      fn();
    } else {
      this.mapboxInstance.on("load", fn);
    }
  };

  componentWillUnmount() {
    this.mapboxInstance.remove();
    this.mapboxInstance = null;
  }

  render() {
    return <div id="map" ref={(el) => (this.mapContainer = el)} />;
  }
}

export default Map;
