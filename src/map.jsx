import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import { platformCoordinates } from "./constants";
import { map } from "lodash";

const mapCenter = [77.57236262183821, 12.978029893890145];
const southWestCorner = [77.57109651389204, 12.97732048536717];
const northEastCorner = [77.57359576840287, 12.978696550289667];

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapInstance = null;
  }

  componentDidMount() {
    const mapInstance = new maplibregl.Map({
      container: this.mapContainer,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: mapCenter,
      minZoom: 17,
    });
    mapInstance.fitBounds([southWestCorner, northEastCorner]);
    this.mapInstance = mapInstance;

    this.onMapLoad(() => {
      mapInstance.addSource("platforms", {
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

      mapInstance.addLayer({
        id: "platform-circles",
        type: "circle",
        source: "platforms",
        paint: {
          "circle-radius": 14,
          "circle-color": "#4a89f3",
          "circle-stroke-color": "white",
          "circle-stroke-width": 2,
        },
      });

      mapInstance.addLayer({
        id: "text-layer",
        type: "symbol",
        source: "platforms",
        layout: {
          "text-field": ["get", "title"],
          "text-font": ["Noto Sans Regular"],
          "text-offset": [0, 0],
          "text-size": 14,
          "text-allow-overlap": true,
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
    });
  }

  onMapLoad = (fn) => {
    if (this.mapInstance._loaded) {
      fn();
    } else {
      this.mapInstance.on("load", fn);
    }
  };

  componentWillUnmount() {
    this.mapInstance.remove();
    this.mapInstance = null;
  }

  render() {
    return <div id="map" ref={(el) => (this.mapContainer = el)} />;
  }
}

export default Map;
