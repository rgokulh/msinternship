import { useState } from "react";
import districtService from "../services/Service";

function CreateDistrict(props) {
  const [districtCode, setDistrictCode] = useState("");
  const [districtName, setDistrictName] = useState("");
  const { state_id, stateCode, stateName } = props;

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

  const handleCreateDistrict = async () => {
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

    const districts = await districtService.getAllDistrictsForState(state_id);

    const districtCodeExists = districts.some(
      (district) => district.districtCode === districtCode
    );
    const districtNameExists = districts.some(
      (district) => district.districtName === districtName
    );

    if (districtCodeExists) {
      alert("DISTRICT CODE already exists!");
      return;
    } else if (districtNameExists) {
      alert("DISTRICT NAME already exists!");
      return;
    }

    const newDistrict = {
      state: { state_id, stateName, stateCode },
      districtCode: districtCode,
      districtName: districtName,
      stateName: stateName,
    };

    const createdDistrict = await districtService.createDistrict(newDistrict);
    console.log("District created: ", createdDistrict);

    window.location.reload(true);
  };

  const handleCloseCreateDistrict = async () => {
    window.location.reload(true);
  };

  return (
    <div>
      <br />
      <h3>Create District</h3>
      <label>
        District Code:
        <input
          type="text"
          value={districtCode}
          onChange={handleDistrictCodeChange}
          defaultValue="district code"
          autoFocus
        />
      </label>
      <label>
        District Name:
        <input
          type="text"
          value={districtName}
          onChange={handleDistrictNameChange}
        />
      </label>
      <label>
        State Name:
        <input type="text" value={stateName} disabled />
      </label>
      <button type="button" onClick={handleCreateDistrict}>
        Create
      </button>
      <button type="button" onClick={handleCloseCreateDistrict}>
        Cancel
      </button>
      <br />
      <br />
    </div>
  );
}

export default CreateDistrict;
