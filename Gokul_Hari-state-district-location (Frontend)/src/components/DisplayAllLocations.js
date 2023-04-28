import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import locationService from "../services/Service";
import CreateLocation from "./CreateLocation";
import UpdateLocation from "./UpdateLocation";
import DeleteLocation from "./DeleteLocation";

function DisplayAllLocations() {
  const [locations, setLocations] = useState([]);
  const [showCreateLocation, setShowCreateLocation] = useState(false);
  const [showUpdateLocation, setShowUpdateLocation] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [locationToUpdate, setLocationToUpdate] = useState({});
  const [locationToDelete, setLocationToDelete] = useState({});
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("locationCode");
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const district = location.state;
  const district_id = location.state?.district_id;
  const districtCode = location.state?.districtCode;
  const districtName = location.state?.districtName;
  const state = location.state?.state;
  const state_id = location.state?.state_id;
  const stateCode = location.state?.stateCode;
  const stateName = location.state?.stateName;

  useEffect(() => {
    async function fetchLocations() {
      const locations = await locationService.getAllLocationsForDistrict(
        district_id
      );
      setLocations(locations);
    }
    if (district_id) {
      fetchLocations();
    }
  }, [district_id]);

  const handleCloseCreateLocation = () => {
    setShowCreateLocation(false);
  };

  const handleCloseUpdateLocation = () => {
    setShowUpdateLocation(false);
  };

  const handleCloseDeleteLocation = () => {
    setShowDeleteLocation(false);
  };

  const handleUpdateClick = (location) => {
    setLocationToUpdate(location);
    setShowUpdateLocation(true);
    setShowCreateLocation(false);
    setShowDeleteLocation(false);
  };

  const handleDeleteClick = (location) => {
    setLocationToDelete(location);
    setShowDeleteLocation(true);
    setShowCreateLocation(false);
    setShowUpdateLocation(false);
  };

  const handleAddLocationClick = () => {
    setShowCreateLocation(true);
    setShowUpdateLocation(false);
    setShowDeleteLocation(false);
  };

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <h2>LOCATIONS</h2>
      <input
        type="text"
        placeholder="Search by location details"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
        style={{ marginLeft: "86.5%" }}
      />
      <br />
      <h3>State Code : {stateCode}</h3>
      <h3>State Name : {stateName}</h3>
      <h3>District Code : {districtCode}</h3>
      <h3>District Name : {districtName}</h3>
      <br />
      <button onClick={handleAddLocationClick}>+ Add Location</button>
      {showCreateLocation && (
        <CreateLocation
          handleCloseCreateLocation={handleCloseCreateLocation}
          setLocations={setLocations}
          state={state}
          state_id={state_id}
          stateCode={stateCode}
          stateName={stateName}
          district={district}
          district_id={district_id}
          districtCode={districtCode}
          districtName={districtName}
        />
      )}
      <table align="center">
        <thead>
          <tr>
            <th onClick={() => handleSortClick("locationCode")}>
              LOCATION CODE{" "}
              {sortColumn === "locationCode" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSortClick("locationName")}>
              LOCATION NAME{" "}
              {sortColumn === "locationName" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {locations
            .filter((location) => {
              const { locationCode, locationName } = location;
              const query = searchQuery.trim().toUpperCase();
              return (
                locationCode.toUpperCase().includes(query) ||
                locationName.toUpperCase().includes(query)
              );
            })
            .sort((a, b) => {
              if (sortColumn === "locationCode") {
                return sortDirection === "asc"
                  ? a.locationCode.localeCompare(b.locationCode)
                  : b.locationCode.localeCompare(a.locationCode);
              } else {
                return sortDirection === "asc"
                  ? a.locationName.localeCompare(b.locationName)
                  : b.locationName.localeCompare(a.locationName);
              }
            })
            .map((location) => (
              <tr key={location.location_id} align="center">
                <td>{location.locationCode}</td>
                <td>{location.locationName}</td>
                <td>
                  <button onClick={() => handleUpdateClick(location)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(location)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showUpdateLocation && (
        <UpdateLocation
          locationToUpdate={locationToUpdate}
          handleCloseUpdateLocation={handleCloseUpdateLocation}
          setLocations={setLocations}
          state={state}
          state_id={state_id}
          stateCode={stateCode}
          stateName={stateName}
          district={district}
          district_id={district_id}
          districtCode={districtCode}
          districtName={districtName}
        />
      )}
      {showDeleteLocation && (
        <DeleteLocation
          locationToDelete={locationToDelete}
          handleCloseDeleteLocation={handleCloseDeleteLocation}
          setLocations={setLocations}
          locations={locations}
        />
      )}
    </div>
  );
}

export default DisplayAllLocations;
