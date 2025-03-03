import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token || ""}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
};

// Function to handle 403 error and logout user
const handle403Error = (error) => {
  if (error.response && error.response.status === 403) {
    console.warn("Unauthorized access (403). Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  throw error;
};
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, getHeaders());
    return response.data;
  } catch (error) {
    handle403Error(error);
  }
};

export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      data,
      getHeaders()
    );
    return response.data;
  } catch (error) {
    handle403Error(error);
  }
};

export const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${endpoint}`,
      data,
      getHeaders()
    );
    return response.data;
  } catch (error) {
    handle403Error(error);
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${endpoint}`,
      getHeaders()
    );
    return response.data;
  } catch (error) {
    handle403Error(error);
  }
};
