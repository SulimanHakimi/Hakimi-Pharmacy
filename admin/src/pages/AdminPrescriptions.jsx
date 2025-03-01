import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/prescription"
        );
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/prescription/${id}`);
      setPrescriptions(
        prescriptions.filter((prescription) => prescription._id !== id)
      );
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/prescription/${id}/status`,
        { status }
      );
      setPrescriptions(
        prescriptions.map((prescription) =>
          prescription._id === id ? response.data : prescription
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Prescriptions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id} className="border-b">
                <td className="p-3">{prescription._id}</td>
                <td className="p-3">{prescription.user || "N/A"}</td>
                <td className="p-3">
                  <img
                    src={prescription.file}
                    alt="Prescription"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="p-3">
                  {new Date(prescription.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={prescription.status}
                    onChange={(e) =>
                      handleStatusUpdate(prescription._id, e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="در انتظار بررسی">در انتظار بررسی</option>
                    <option value="تایید شده">تایید شده</option>
                    <option value="رد شده">رد شده</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(prescription._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPrescriptions;
