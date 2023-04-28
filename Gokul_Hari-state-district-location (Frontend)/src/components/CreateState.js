import { useState } from "react";
import stateService from "../services/Service";

function CreateState() {
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");

  const handleStateCodeChange = (event) => {
    setStateCode(event.target.value.toUpperCase());
  };

  const handleStateNameChange = (event) => {
    let name = event.target.value.toUpperCase();

    name = name.replace(/\s+/g, " ");
    if (name.length <= 100) {
      setStateName(name);
    } else {
      alert("STATE NAME should be max 100 characters long!");
    }
  };

  const handleCreateState = async () => {
    if (stateCode.trim() === "" || stateName.trim() === "") {
      alert("Fields cannot be left empty!");
      return;
    }

    const stateCodeRegex = /^[A-Za-z0-9]{5,}$/;
    if (!stateCodeRegex.test(stateCode)) {
      alert(
        "STATE CODE should be letters and/or numbers only and at least 5 characters long!"
      );
      return;
    }

    const stateNameRegex = /^[A-Za-z ]{3,}$/;
    if (!stateNameRegex.test(stateName)) {
      alert(
        "STATE NAME should be at least 3 letters long and should only contain letters or a single space!"
      );
      return;
    }

    const states = await stateService.getAllStates();

    const stateCodeExists = states.some(
      (state) => state.stateCode === stateCode
    );
    const stateNameExists = states.some(
      (state) => state.stateName === stateName
    );

    if (stateCodeExists) {
      alert("STATE CODE already exists!");
      return;
    } else if (stateNameExists) {
      alert("STATE NAME already exists!");
      return;
    }

    const newState = {
      stateCode: stateCode,
      stateName: stateName,
    };

    const createdState = await stateService.createState(newState);
    console.log("State created: ", createdState);

    window.location.reload(true);
  };

  const handleCloseCreateState = async () => {
    window.location.reload(true);
  };

  return (
    <div>
      <br />
      <h3>Create State</h3>
      <label>
        State Code:
        <input
          type="text"
          value={stateCode}
          onChange={handleStateCodeChange}
          defaultValue="state code"
          autoFocus
        />
      </label>
      <label>
        State Name:
        <input type="text" value={stateName} onChange={handleStateNameChange} />
      </label>
      <button type="button" onClick={handleCreateState}>
        Create
      </button>
      <button type="button" onClick={handleCloseCreateState}>
        Cancel
      </button>
      <br />
      <br />
    </div>
  );
}

export default CreateState;
