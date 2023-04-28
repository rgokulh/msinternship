import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import districtService from "../services/Service";
import CreateDistrict from "./CreateDistrict";
import UpdateDistrict from "./UpdateDistrict";
import DeleteDistrict from "./DeleteDistrict";

function DisplayAllDistricts() {
  const [districts, setDistricts] = useState([]);
  const [showCreateDistrict, setShowCreateDistrict] = useState(false);
  const [showUpdateDistrict, setShowUpdateDistrict] = useState(false);
  const [showDeleteDistrict, setShowDeleteDistrict] = useState(false);
  const [districtToUpdate, setDistrictToUpdate] = useState({});
  const [districtToDelete, setDistrictToDelete] = useState({});
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("districtCode");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;
  const state_id = location.state?.state_id;
  const stateCode = location.state?.stateCode;
  const stateName = location.state?.stateName;

  useEffect(() => {
    async function fetchDistricts() {
      const districts = await districtService.getAllDistrictsForState(state_id);
      setDistricts(districts);
    }
    if (state_id) {
      fetchDistricts();
    }
  }, [state_id]);

  const handleCloseCreateDistrict = () => {
    setShowCreateDistrict(false);
  };

  const handleCloseUpdateDistrict = () => {
    setShowUpdateDistrict(false);
  };

  const handleCloseDeleteDistrict = () => {
    setShowDeleteDistrict(false);
  };

  const handleUpdateClick = (district) => {
    setDistrictToUpdate(district);
    setShowUpdateDistrict(true);
    setShowCreateDistrict(false);
    setShowDeleteDistrict(false);
  };

  const handleDeleteClick = (district) => {
    setDistrictToDelete(district);
    setShowDeleteDistrict(true);
    setShowCreateDistrict(false);
    setShowUpdateDistrict(false);
  };

  const handleAddDistrictClick = () => {
    setShowCreateDistrict(true);
    setShowUpdateDistrict(false);
    setShowDeleteDistrict(false);
  };

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  function handleLocationClick(
    district,
    district_id,
    districtCode,
    districtName,
    state,
    state_id,
    stateCode,
    stateName
  ) {
    navigate("/locations", {
      state: {
        district,
        district_id,
        districtCode,
        districtName,
        state,
        state_id,
        stateCode,
        stateName,
      },
    });
  }

  return (
    <div>
      <h2>DISTRICTS</h2>
      <input
        type="text"
        placeholder="Search by district details"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
        style={{ marginLeft: "86.5%" }}
      />
      <br />
      <h3>State Code : {stateCode}</h3>
      <h3>State Name : {stateName}</h3>
      <br />
      <button onClick={handleAddDistrictClick}>+ Add District</button>
      {showCreateDistrict && (
        <CreateDistrict
          handleCloseCreateDistrict={handleCloseCreateDistrict}
          setDistricts={setDistricts}
          state={state}
          state_id={state_id}
          stateCode={stateCode}
          stateName={stateName}
        />
      )}
      <table align="center">
        <thead>
          <tr>
            <th onClick={() => handleSortClick("districtCode")}>
              DISTRICT CODE{" "}
              {sortColumn === "districtCode" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSortClick("districtName")}>
              DISTRICT NAME{" "}
              {sortColumn === "districtName" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {districts
            .filter((district) => {
              const { districtCode, districtName } = district;
              const query = searchQuery.trim().toUpperCase();
              return (
                districtCode.toUpperCase().includes(query) ||
                districtName.toUpperCase().includes(query)
              );
            })
            .sort((a, b) => {
              if (sortColumn === "districtCode") {
                return sortDirection === "asc"
                  ? a.districtCode.localeCompare(b.districtCode)
                  : b.districtCode.localeCompare(a.districtCode);
              } else {
                return sortDirection === "asc"
                  ? a.districtName.localeCompare(b.districtName)
                  : b.districtName.localeCompare(a.districtName);
              }
            })
            .map((district) => (
              <tr key={district.district_id} align="center">
                <td>{district.districtCode}</td>
                <td>{district.districtName}</td>
                <td>
                  <button onClick={() => handleUpdateClick(district)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(district)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleLocationClick(
                        `${district}`,
                        `${district.district_id}`,
                        `${district.districtCode}`,
                        `${district.districtName}`,
                        `${state}`,
                        `${state.state_id}`,
                        `${state.stateCode}`,
                        `${state.stateName}`
                      );
                    }}
                  >
                    View Locations
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showUpdateDistrict && (
        <UpdateDistrict
          districtToUpdate={districtToUpdate}
          handleCloseUpdateDistrict={handleCloseUpdateDistrict}
          setDistricts={setDistricts}
          state={state}
          state_id={state_id}
          stateCode={stateCode}
          stateName={stateName}
        />
      )}
      {showDeleteDistrict && (
        <DeleteDistrict
          districtToDelete={districtToDelete}
          handleCloseDeleteDistrict={handleCloseDeleteDistrict}
          setDistricts={setDistricts}
          districts={districts}
        />
      )}
    </div>
  );
}

export default DisplayAllDistricts;
