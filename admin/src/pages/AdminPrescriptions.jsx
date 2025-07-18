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
  const [fullscreenFile, setFullscreenFile] = useState(null);

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
      await postRequest(
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

  const handleCloseFullscreen = () => setFullscreenFile(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-brand">مدیریت نسخه</h1>

      <div className="hidden lg:block bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-brand bg-opacity-10 text-brand">
              <th className="p-4">مریض</th>
              <th className="p-4">فایل</th>
              <th className="p-4">تاریخ</th>
              <th className="p-4">حالت</th>
              <th className="p-4">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id} className="border-b hover:bg-brand/5 transition">
                <td className="p-4">{prescription.user || "N/A"}</td>
                <td className="p-4">
                  <img
                    src={prescription.file}
                    alt="Prescription"
                    className="w-24 h-24 object-cover rounded-xl border border-brand shadow cursor-pointer"
                    onClick={() => setFullscreenFile(prescription.file)}
                    title="برای مشاهده بزرگ کلیک کنید"
                  />
                </td>
                <td className="p-4">{new Date(prescription.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <select
                    value={prescription.status}
                    onChange={(e) => handleStatusUpdate(prescription._id, e.target.value)}
                    className="p-2 border border-brand rounded-lg focus:ring-2 focus:ring-brand bg-white"
                  >
                    <option value="در انتظار بررسی">در انتظار بررسی</option>
                    <option value="بررسی شد">بررسی شد</option>
                    <option value="رد شد">رد شد</option>
                  </select>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(prescription._id)}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition font-bold"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => handleAddRecommendation(prescription)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${prescription.hasRecommendation ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
                    disabled={prescription.hasRecommendation}
                  >
                    {prescription.hasRecommendation ? "توصیه ارسال شد" : "افزودن توصیه"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription._id}
            className="bg-white p-4 rounded-2xl shadow-lg border-t-4 border-brand"
          >
            <div className="space-y-2">
              <p><span className="font-semibold text-brand">ایدی:</span> <span className="font-mono text-xs">{prescription._id}</span></p>
              <p><span className="font-semibold text-brand">مریض:</span> {prescription.user || "N/A"}</p>
              <p><span className="font-semibold text-brand">تاریخ:</span> {new Date(prescription.createdAt).toLocaleDateString()}</p>
              <img
                src={prescription.file}
                alt="Prescription"
                className="w-24 h-24 object-cover rounded-xl border border-brand shadow cursor-pointer"
                onClick={() => setFullscreenFile(prescription.file)}
                title="برای مشاهده بزرگ کلیک کنید"
              />
              <div className="flex flex-col gap-2 mt-2">
                <select
                  value={prescription.status}
                  onChange={(e) => handleStatusUpdate(prescription._id, e.target.value)}
                  className="p-2 border border-brand rounded-lg focus:ring-2 focus:ring-brand bg-white"
                >
                  <option value="در انتظار بررسی">در انتظار بررسی</option>
                  <option value="بررسی شد">بررسی شد</option>
                  <option value="رد شد">رد شد</option>
                </select>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDelete(prescription._id)}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition font-bold"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => handleAddRecommendation(prescription)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${prescription.hasRecommendation ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
                    disabled={prescription.hasRecommendation}
                  >
                    {prescription.hasRecommendation ? "توصیه ارسال شد" : "افزودن توصیه"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fullscreenFile && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={handleCloseFullscreen}
        >
          <img
            src={fullscreenFile}
            alt="Prescription Fullscreen"
            className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-brand"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-6 left-6 text-white text-4xl font-bold bg-black bg-opacity-40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition"
            aria-label="بستن"
          >
            ×
          </button>
        </div>
      )}

      {showRecommendationModal && (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-brand relative">
            <button
              onClick={() => setShowRecommendationModal(false)}
              className="absolute left-4 top-4 text-gray-400 hover:text-brand text-2xl font-bold"
              aria-label="بستن"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-brand">افزودن توصیه</h2>
            <input
              type="text"
              placeholder="نام دوا"
              value={recommendationData.medicine}
              onChange={(e) => setRecommendationData({ ...recommendationData, medicine: e.target.value })}
              className="w-full p-3 border border-brand rounded-lg mb-4 "
            />
            <input
              type="text"
              placeholder="دوز مصرفی"
              value={recommendationData.dosage}
              onChange={(e) => setRecommendationData({ ...recommendationData, dosage: e.target.value })}
              className="w-full p-3 border border-brand rounded-lg mb-4 "
            />
            <input
              type="text"
              placeholder="نام داکتر"
              value={recommendationData.doctor}
              onChange={(e) => setRecommendationData({ ...recommendationData, doctor: e.target.value })}
              className="w-full p-3 border border-brand rounded-lg mb-6 "
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRecommendationModal(false)}
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold"
              >
                لغو
              </button>
              <button
                onClick={handleRecommendationSubmit}
                className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 font-bold"
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
