import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
};

export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error("GET Request Error:", error);
    throw error;
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
    console.error("POST Request Error:", error);
    throw error;
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
    console.error("PUT Request Error:", error);
    throw error;
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
    console.error("DELETE Request Error:", error);
    throw error;
  }
};
