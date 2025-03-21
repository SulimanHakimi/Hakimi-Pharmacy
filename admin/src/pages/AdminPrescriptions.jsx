import React, { useState, useEffect } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../RequestMethods";

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
        const updatedPrescriptions = response.map((prescription) => ({
          ...prescription,
          hasRecommendation: prescription.status === "بررسی شد" ? true : false,
        }));
        setPrescriptions(updatedPrescriptions);
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
      const response = await postRequest(
        "recommendations/create",
        recommendationData
      );

      const updatedPrescriptions = prescriptions.map((prescription) =>
        prescription._id === selectedPrescription._id
          ? { ...prescription, hasRecommendation: true }
          : prescription
      );
      setPrescriptions(updatedPrescriptions);

      await handleStatusUpdate(selectedPrescription._id, "بررسی شد");

      setShowRecommendationModal(false);
    } catch (error) {
      console.error("Error creating recommendation:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت نسخه</h1>

      {/* Table for larger screens */}
      <div className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-right">ایدی</th>
              <th className="p-3 text-right">مریض</th>
              <th className="p-3 text-right">فایل</th>
              <th className="p-3 text-right">تاریخ</th>
              <th className="p-3 text-left">حالت</th>
              <th className="p-3 text-left">اقدامات</th>
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
                    <option value="بررسی شد">بررسی شد</option>
                    <option value="رد شد">رد شد</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(prescription._id)}
                    className="text-red-600 hover:text-red-800 mr-2"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => handleAddRecommendation(prescription)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={prescription.hasRecommendation}
                  >
                    {prescription.hasRecommendation
                      ? "توصیه ارسال شد"
                      : "افزودن توصیه برای این نسخه"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ایدی:</span> {prescription._id}
              </p>
              <p>
                <span className="font-semibold">مریض:</span>{" "}
                {prescription.user || "N/A"}
              </p>
              <p>
                <span className="font-semibold">تاریخ:</span>{" "}
                {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">حالت:</span>{" "}
                <select
                  value={prescription.status}
                  onChange={(e) =>
                    handleStatusUpdate(prescription._id, e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded-lg"
                  disabled={!prescription.hasRecommendation}
                >
                  <option value="در انتظار بررسی">در انتظار بررسی</option>
                  <option value="بررسی شد">بررسی شد</option>
                  <option value="رد شد">رد شد</option>
                </select>
              </p>
              <img
                src={prescription.file}
                alt="Prescription"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(prescription._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  حذف
                </button>

                <button
                  onClick={() => handleAddRecommendation(prescription)}
                  className="text-blue-600 hover:text-blue-800"
                  disabled={prescription.hasRecommendation}
                >
                  {prescription.hasRecommendation
                    ? "توصیه ارسال شد"
                    : "افزودن توصیه برای این نسخه"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">افزودن توصیه</h2>
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
                لغو
              </button>
              <button
                onClick={handleRecommendationSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptions;
