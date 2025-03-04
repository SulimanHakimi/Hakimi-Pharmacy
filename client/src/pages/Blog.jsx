import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../requestMethods";
import Skeleton from "@mui/material/Skeleton";
import Footer from "../components/footer"

function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getRequest("blogs").then((res) => {
      setPosts(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          آخرین مقالات
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-screen">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg"
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={192}
                    className="mb-4 rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    className="mb-2"
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={24}
                    className="mb-4"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              ))
            : posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mb-4 w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <p className="text-xs text-gray-500 mb-4">
                    تاریخ انتشار: {post.date}
                  </p>

                  <Link
                    to={`/blog/post/${post._id}`}
                    className="text-green-600 hover:text-green-700 font-semibold transition duration-300"
                  >
                    ادامه مطلب →
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default BlogPage;
