import React, { useState } from "react";
import districtService from "../services/Service";

function UpdateDistrict(props) {
  const { state_id, stateCode, stateName } = props;

  const [districtCode, setDistrictCode] = useState(
    props.districtToUpdate.districtCode
  );
  const [districtName, setDistrictName] = useState(
    props.districtToUpdate.districtName
  );

  const handleDistrictCodeChange = (event) => {
    setDistrictCode(event.target.value.toUpperCase());
  };

  const handleDistrictNameChange = (event) => {
    let name = event.target.value.toUpperCase();

    name = name.replace(/\s+/g, " ");
    if (name.length <= 100) {
      setDistrictName(name);
    } else {
      alert("DISTRICT NAME should be max 100 characters long!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (districtCode.trim() === "" || districtName.trim() === "") {
      alert("Fields cannot be left empty!");
      return;
    }

    const districtCodeRegex = /^[A-Za-z0-9]{5,}$/;
    if (!districtCodeRegex.test(districtCode)) {
      alert(
        "DISTRICT CODE should be letters and/or numbers only and at least 5 characters long!"
      );
      return;
    }

    const districtNameRegex = /^[A-Za-z ]{3,}$/;
    if (!districtNameRegex.test(districtName)) {
      alert(
        "DISTRICT NAME should be at least 3 letters long and should only contain letters or a single space!"
      );
      return;
    }

    const districts = await districtService.getAllDistricts();

    const districtCodeExists = districts.some(
      (district) =>
        district.districtCode === districtCode &&
        district.district_id !== props.districtToUpdate.district_id
    );
    const districtNameExists = districts.some(
      (district) =>
        district.districtName === districtName &&
        district.district_id !== props.districtToUpdate.district_id
    );

    if (districtCodeExists) {
      alert("DISTRICT CODE already exists!");
      return;
    } else if (districtNameExists) {
      alert("DISTRICT NAME already exists!");
      return;
    }

    const updatedDistrict = {
      district_id: props.districtToUpdate.district_id,
      state: { state_id, stateName, stateCode },
      districtCode: districtCode,
      districtName: districtName,
      stateName: stateName,
    };
    const response = await districtService.updateDistrict(updatedDistrict);
    props.setDistricts((prevDistricts) =>
      prevDistricts.map((district) =>
        district.district_id === response.district_id ? response : district
      )
    );
    props.handleCloseUpdateDistrict();
  };

  return (
    <div className="update">
      <br />
      <h3>Update District</h3>
      <form onSubmit={handleSubmit}>
        <label>
          District Code:
          <input
            type="text"
            id="districtCode"
            name="districtCode"
            value={districtCode}
            onChange={handleDistrictCodeChange}
            autoFocus
          />
        </label>
        <label>
          District Name:
          <input
            type="text"
            id="districtName"
            name="districtName"
            value={districtName}
            onChange={handleDistrictNameChange}
          />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={props.handleCloseUpdateDistrict}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateDistrict;
