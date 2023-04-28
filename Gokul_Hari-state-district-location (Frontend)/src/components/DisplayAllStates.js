import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import stateService from "../services/Service";
import CreateState from "./CreateState";
import UpdateState from "./UpdateState";
import DeleteState from "./DeleteState";

function DisplayAllStates() {
  const [states, setStates] = useState([]);
  const [showCreateState, setShowCreateState] = useState(false);
  const [showUpdateState, setShowUpdateState] = useState(false);
  const [showDeleteState, setShowDeleteState] = useState(false);
  const [stateToUpdate, setStateToUpdate] = useState({});
  const [stateToDelete, setStateToDelete] = useState({});
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("stateCode");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStates() {
      const states = await stateService.getAllStates();
      setStates(states);
    }
    fetchStates();
  }, []);

  const handleCloseCreateState = () => {
    setShowCreateState(false);
  };

  const handleCloseUpdateState = () => {
    setShowUpdateState(false);
  };

  const handleCloseDeleteState = () => {
    setShowDeleteState(false);
  };

  const handleUpdateClick = (state) => {
    setStateToUpdate(state);
    setShowUpdateState(true);
    setShowCreateState(false);
    setShowDeleteState(false);
  };

  const handleDeleteClick = (state) => {
    setStateToDelete(state);
    setShowDeleteState(true);
    setShowCreateState(false);
    setShowUpdateState(false);
  };

  const handleAddStateClick = () => {
    setShowCreateState(true);
    setShowUpdateState(false);
    setShowDeleteState(false);
  };

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  function handleDistrictClick(state, state_id, stateCode, stateName) {
    navigate("/districts", {
      state: { state, state_id, stateCode, stateName },
    });
  }

  return (
    <div>
      <h2>STATES</h2>
      <input
        type="text"
        placeholder="Search by state details"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
        style={{ marginLeft: "86.5%" }}
      />
      <br />
      <button onClick={handleAddStateClick}>+ Add State</button>
      {showCreateState && (
        <CreateState
          handleCloseCreateState={handleCloseCreateState}
          setStates={setStates}
        />
      )}
      <table align="center">
        <thead>
          <tr>
            <th onClick={() => handleSortClick("stateCode")}>
              STATE CODE{" "}
              {sortColumn === "stateCode" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSortClick("stateName")}>
              STATE NAME{" "}
              {sortColumn === "stateName" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {states
            .filter((state) => {
              const { stateCode, stateName } = state;
              const query = searchQuery.trim().toUpperCase();
              return (
                stateCode.toUpperCase().includes(query) ||
                stateName.toUpperCase().includes(query)
              );
            })
            .sort((a, b) => {
              if (sortColumn === "stateCode") {
                return sortDirection === "asc"
                  ? a.stateCode.localeCompare(b.stateCode)
                  : b.stateCode.localeCompare(a.stateCode);
              } else {
                return sortDirection === "asc"
                  ? a.stateName.localeCompare(b.stateName)
                  : b.stateName.localeCompare(a.stateName);
              }
            })
            .map((state) => (
              <tr key={state.state_id} align="center">
                <td>{state.stateCode}</td>
                <td>{state.stateName}</td>
                <td>
                  <button onClick={() => handleUpdateClick(state)}>Edit</button>
                  <button onClick={() => handleDeleteClick(state)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleDistrictClick(
                        `${state}`,
                        `${state.state_id}`,
                        `${state.stateCode}`,
                        `${state.stateName}`
                      );
                    }}
                  >
                    View Districts
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showUpdateState && (
        <UpdateState
          stateToUpdate={stateToUpdate}
          handleCloseUpdateState={handleCloseUpdateState}
          setStates={setStates}
        />
      )}
      {showDeleteState && (
        <DeleteState
          stateToDelete={stateToDelete}
          handleCloseDeleteState={handleCloseDeleteState}
          setStates={setStates}
          states={states}
        />
      )}
    </div>
  );
}

export default DisplayAllStates;
