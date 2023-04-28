import React, { useState } from "react";
import locationService from "../services/Service";

function UpdateLocation(props) {
  const {
    state_id,
    stateCode,
    stateName,
    district_id,
    districtCode,
    districtName,
  } = props;

  const [locationCode, setLocationCode] = useState(
    props.locationToUpdate.locationCode
  );
  const [locationName, setLocationName] = useState(
    props.locationToUpdate.locationName
  );

  const handleLocationCodeChange = (event) => {
    setLocationCode(event.target.value.toUpperCase());
  };

  const handleLocationNameChange = (event) => {
    let name = event.target.value.toUpperCase();

    name = name.replace(/\s+/g, " ");
    if (name.length <= 100) {
      setLocationName(name);
    } else {
      alert("LOCATION NAME should be max 100 characters long!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (locationCode.trim() === "" || locationName.trim() === "") {
      alert("Fields cannot be left empty!");
      return;
    }

    const locationCodeRegex = /^[A-Za-z0-9]{5,}$/;
    if (!locationCodeRegex.test(locationCode)) {
      alert(
        "LOCATION CODE should be letters and/or numbers only and at least 5 characters long!"
      );
      return;
    }

    const locationNameRegex = /^[A-Za-z ]{3,}$/;
    if (!locationNameRegex.test(locationName)) {
      alert(
        "LOCATION NAME should be at least 3 letters long and should only contain letters or a single space!"
      );
      return;
    }

    const locations = await locationService.getAllLocations();

    const locationCodeExists = locations.some(
      (location) =>
        location.locationCode === locationCode &&
        location.location_id !== props.locationToUpdate.location_id
    );
    const locationNameExists = locations.some(
      (location) =>
        location.locationName === locationName &&
        location.location_id !== props.locationToUpdate.location_id
    );

    if (locationCodeExists) {
      alert("DISTRICT CODE already exists!");
      return;
    } else if (locationNameExists) {
      alert("DISTRICT NAME already exists!");
      return;
    }

    const updatedLocation = {
      location_id: props.locationToUpdate.location_id,
      district: {
        district_id,
        state: { state_id, stateName, stateCode },
        districtCode,
        districtName,
        stateName,
      },
      locationCode,
      locationName,
      districtName,
    };
    const response = await locationService.updateLocation(updatedLocation);
    props.setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.location_id === response.location_id ? response : location
      )
    );
    props.handleCloseUpdateLocation();
  };

  return (
    <div className="update">
      <br />
      <h3>Update Location</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Location Code:
          <input
            type="text"
            id="locationCode"
            name="locationCode"
            value={locationCode}
            onChange={handleLocationCodeChange}
            autoFocus
          />
        </label>
        <label>
          Location Name:
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={locationName}
            onChange={handleLocationNameChange}
          />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={props.handleCloseUpdateLocation}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateLocation;
