import axios from "axios";

const baseUrl = "http://localhost:8080/api/states";

const Service = {
  getAllStates: async () => {
    const response = await axios.get(`${baseUrl}/displayAll`, {});
    return response.data;
  },

  createState: async (state) => {
    const response = await axios.post(`${baseUrl}/create`, state);
    return response.data;
  },

  updateState: async (state) => {
    const response = await axios.put(`${baseUrl}/update`, state);
    return response.data;
  },

  deleteState: async (id) => {
    const response = await axios.delete(`${baseUrl}/delete/${id}`);
    return response.data;
  },

  getAllDistricts: async () => {
    const response = await axios.get(`${baseUrl}/districts/displayAll`);
    return response.data;
  },

  getAllDistrictsForState: async (id) => {
    const response = await axios.get(`${baseUrl}/districts/state/${id}`);
    return response.data;
  },

  createDistrict: async (district) => {
    const response = await axios.post(`${baseUrl}/districts/create`, district);
    return response.data;
  },

  updateDistrict: async (district) => {
    const response = await axios.put(`${baseUrl}/districts/update`, district);
    return response.data;
  },

  deleteDistrict: async (id) => {
    const response = await axios.delete(`${baseUrl}/districts/delete/${id}`);
    return response.data;
  },

  getAllLocations: async () => {
    const response = await axios.get(
      `${baseUrl}/districts/locations/displayAll`
    );
    return response.data;
  },

  getAllLocationsForDistrict: async (id) => {
    const response = await axios.get(
      `${baseUrl}/districts/locations/district/${id}`
    );
    return response.data;
  },

  createLocation: async (location) => {
    const response = await axios.post(
      `${baseUrl}/districts/locations/create`,
      location
    );
    return response.data;
  },

  updateLocation: async (location) => {
    const response = await axios.put(
      `${baseUrl}/districts/locations/update`,
      location
    );
    return response.data;
  },

  deleteLocation: async (id) => {
    const response = await axios.delete(
      `${baseUrl}/districts/locations/delete/${id}`
    );
    return response.data;
  },
};

export default Service;
