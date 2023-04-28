import { useState } from "react";
import locationService from "../services/Service";

function CreateLocation(props) {
  const [locationCode, setLocationCode] = useState("");
  const [locationName, setLocationName] = useState("");
  const {
    state_id,
    stateCode,
    stateName,
    district_id,
    districtCode,
    districtName,
  } = props;

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

  const handleCreateLocation = async () => {
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

    const locations = await locationService.getAllLocationsForDistrict(
      district_id
    );

    const locationCodeExists = locations.some(
      (location) => location.locationCode === locationCode
    );
    const locationNameExists = locations.some(
      (location) => location.locationName === locationName
    );

    if (locationCodeExists) {
      alert("DISTRICT CODE already exists!");
      return;
    } else if (locationNameExists) {
      alert("DISTRICT NAME already exists!");
      return;
    }

    const newLocation = {
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

    const createdLocation = await locationService.createLocation(newLocation);
    console.log("Location created: ", createdLocation);

    window.location.reload(true);
  };

  const handleCloseCreateLocation = async () => {
    window.location.reload(true);
  };

  return (
    <div>
      <br />
      <h3>Create Location</h3>
      <label>
        Location Code:
        <input
          type="text"
          value={locationCode}
          onChange={handleLocationCodeChange}
          defaultValue="location code"
          autoFocus
        />
      </label>
      <label>
        Location Name:
        <input
          type="text"
          value={locationName}
          onChange={handleLocationNameChange}
        />
      </label>
      <label>
        District Name:
        <input type="text" value={districtName} disabled />
      </label>
      <button type="button" onClick={handleCreateLocation}>
        Create
      </button>
      <button type="button" onClick={handleCloseCreateLocation}>
        Cancel
      </button>
      <br />
      <br />
    </div>
  );
}

export default CreateLocation;
