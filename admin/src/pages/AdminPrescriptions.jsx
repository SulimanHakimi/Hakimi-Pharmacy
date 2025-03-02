import React, { useState, useEffect } from "react";
import { deleteRequest, getRequest, postRequest, putRequest } from "../RequestMethods";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [recommendationData, setRecommendationData] = useState({
    medicine: "",
    dosage: "",
    doctor: "",
    user: "",
  });

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await getRequest("prescription");
        setPrescriptions(response);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`prescription/${id}`);
      setPrescriptions(
        prescriptions.filter((prescription) => prescription._id !== id)
      );
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await putRequest(`prescription/${id}/status`, {
        status,
      });
      setPrescriptions(
        prescriptions.map((prescription) =>
          prescription._id === id ? response : prescription
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddRecommendation = (prescription) => {
    setSelectedPrescription(prescription);
    setRecommendationData({
      ...recommendationData,
      user: prescription.user || "",
    });
    setShowRecommendationModal(true);
  };

  const handleRecommendationSubmit = async () => {
    try {
      const response = await postRequest("recommendations/create", recommendationData);
      setShowRecommendationModal(false);
    } catch (error) {
      console.error("Error creating recommendation:", error);
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
                    className="text-red-600 hover:text-red-800 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddRecommendation(prescription)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Add Recommendation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Recommendation</h2>
            <input
              type="text"
              placeholder="Medicine"
              value={recommendationData.medicine}
              onChange={(e) =>
                setRecommendationData({
                  ...recommendationData,
                  medicine: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={recommendationData.dosage}
              onChange={(e) =>
                setRecommendationData({
                  ...recommendationData,
                  dosage: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="text"
              placeholder="Doctor"
              value={recommendationData.doctor}
              onChange={(e) =>
                setRecommendationData({
                  ...recommendationData,
                  doctor: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowRecommendationModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRecommendationSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptions;