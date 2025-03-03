import React, { useState, useEffect } from "react";
import { deleteRequest, getRequest, postRequest, putRequest } from "../RequestMethods";

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    author: "",
    date: "",
  });
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getRequest("blogs");
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPostId) {
        await putRequest(`blogs/${editPostId}`, formData);
        setEditPostId(null);
      } else {
        await postRequest("blogs", formData);
      }
      const response = await getRequest("blogs");
      setPosts(response);
      setFormData({
        name: "",
        title: "",
        description: "",
        image: "",
        author: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditPostId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`blogs/${id}`);
      const response = await getRequest("blogs");
      setPosts(response);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت وبلاگ</h1>

      {/* Form for creating/editing posts */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              عنوان
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              تصویر
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              نویسنده
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              تاریخ
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editPostId ? "بروزرسانی پست" : "ایجاد پست"}
        </button>
      </form>

      {/* Table for larger screens */}
      <div className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">عنوان</th>
              <th className="p-3 ">نویسنده</th>
              <th className="p-3 ">تاریخ</th>
              <th className="p-3 ">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.author}</td>
                <td className="p-3">{post.date}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="space-y-2">
              <p>
                <span className="font-semibold">عنوان:</span> {post.title}
              </p>
              <p>
                <span className="font-semibold">نویسنده:</span> {post.author}
              </p>
              <p>
                <span className="font-semibold">تاریخ:</span> {post.date}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;