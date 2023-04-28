import React, { useState } from "react";
import stateService from "../services/Service";

function UpdateState(props) {
  const [stateCode, setStateCode] = useState(props.stateToUpdate.stateCode);
  const [stateName, setStateName] = useState(props.stateToUpdate.stateName);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      (state) =>
        state.stateCode === stateCode &&
        state.state_id !== props.stateToUpdate.state_id
    );
    const stateNameExists = states.some(
      (state) =>
        state.stateName === stateName &&
        state.state_id !== props.stateToUpdate.state_id
    );

    if (stateCodeExists) {
      alert("STATE CODE already exists!");
      return;
    } else if (stateNameExists) {
      alert("STATE NAME already exists!");
      return;
    }

    const updatedState = {
      state_id: props.stateToUpdate.state_id,
      stateCode: stateCode,
      stateName: stateName,
    };
    const response = await stateService.updateState(updatedState);
    props.setStates((prevStates) =>
      prevStates.map((state) =>
        state.state_id === response.state_id ? response : state
      )
    );
    props.handleCloseUpdateState();
  };

  return (
    <div className="update">
      <br />
      <h3>Update State</h3>
      <form onSubmit={handleSubmit}>
        <label>
          State Code:
          <input
            type="text"
            id="stateCode"
            name="stateCode"
            value={stateCode}
            onChange={handleStateCodeChange}
            autoFocus
          />
        </label>
        <label>
          State Name:
          <input
            type="text"
            id="stateName"
            name="stateName"
            value={stateName}
            onChange={handleStateNameChange}
          />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={props.handleCloseUpdateState}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateState;
