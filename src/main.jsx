import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./sidebar";
import Map from "./map";

// CSS imports
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setSearchText(search.get("s"));
  }, []);

  useEffect(() => {
    if (searchText) {
      window.history.replaceState({}, "", `?s=${searchText}`);
    } else {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchText]);
  return (
    <>
      <Sidebar
        searchText={searchText}
        setSearchText={setSearchText}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
      <Map />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
