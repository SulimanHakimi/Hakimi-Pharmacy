import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../requestMethods";
import Skeleton from "@mui/material/Skeleton"; 

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest("blogs")
      .then((res) => {
        setPosts(res);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setLoading(false); 
      });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
          آخرین مقالات بلاگ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? 
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={192}
                    className="mb-4 rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={24}
                    className="mb-2"
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={72}
                    className="mb-4"
                  />
                  <Skeleton
                    variant="text"
                    width="30%"
                    height={24}
                    className="mb-2"
                  />
                </div>
              ))
            : 
              posts.slice(0, 3).map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mb-4 mx-auto w-full h-48 md:h-56 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                  <Link
                    to={`/blog/post/${post._id}`}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;