import React, { useEffect } from "react";
import {
  filter,
  includes,
  map,
  size,
  sortBy,
  toLower,
  toNumber,
  uniqBy,
} from "lodash";
import { MajesticData } from "./constants";
import { onlyAlphabetic, onlyAlphanumeric, onlyNumeric } from "./utils";
import Select from "react-select";

const Sidebar = ({
  searchText,
  setSearchText,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const platforms = sortBy(
    uniqBy(map(MajesticData, "platform-number")),
    (p) => toNumber(onlyNumeric(p)),
    onlyAlphabetic
  );
  const sanitizedSearchText = toLower(onlyAlphanumeric(searchText));
  const searchFilteredData = sanitizedSearchText
    ? filter(MajesticData, (p) => includes(p.searchText, sanitizedSearchText))
    : MajesticData;
  const platformFilteredData =
    size(selectedPlatforms) > 0
      ? filter(searchFilteredData, (p) =>
          includes(selectedPlatforms, p["platform-number"])
        )
      : searchFilteredData;
  return (
    <div id="sidebar">
      <div
        id="sidebar-header"
        className="px-4 py-4 border-0 border-b border-solid border-black"
      >
        <h1 className="font-bold text-xl">Majestic Platform Guide</h1>
        <Select
          options={map(platforms, (p) => ({ value: p, label: p }))}
          value={map(selectedPlatforms, (p) => ({ value: p, label: p }))}
          onChange={(e) => {
            setSelectedPlatforms(map(e, "value"));
          }}
          isMulti
          placeholder="Filter by platform..."
          closeMenuOnSelect={false}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              border: "1px solid rgb(229, 231, 235)",
              backgroundColor: "white",
              boxShadow: "none",
              borderRadius: "0.5rem",
              paddingLeft: "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              marginTop: "1rem",
            }),
          }}
        />
        <input
          type="text"
          value={searchText || ""}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full border border-gray-20 rounded-lg px-4 py-2 mt-4"
          placeholder="Search..."
        />
      </div>
      <div className="h-5 flex-1 overflow-y-auto">
        {map(platformFilteredData, (platform, i) => {
          const {
            "route-number": routeNumber,
            "start-station": startStation,
            "to-station": endStation,
            "platform-number": platformNumber,
          } = platform;
          return (
            <div
              key={routeNumber}
              className="mx-4 py-4 border-0 border-b border-solid border-gray-200"
            >
              <div className="flex justify-between">
                <span className="font-bold text-black">{routeNumber}</span>
                <span className="text-gray-500 text-sm leading-relaxed">
                  {platformNumber}
                </span>
              </div>
              <br />
              <span className="text-gray-500 text-sm leading-relaxed">
                {startStation}
                <br />
                {endStation}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
