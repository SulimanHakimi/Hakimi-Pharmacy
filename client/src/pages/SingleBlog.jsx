import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../requestMethods";
import { Helmet } from "react-helmet";

function SingleBlogPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getRequest(`blogs/${id}`)
      .then((res) => setPost(res))
      .catch((err) => console.error("Error fetching blog post:", err));
  }, [id]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <Helmet>
        <title>
          {post.title ? `${post.title} | دواخانه حکیمی` : "دوا خانه آنلاین"}
        </title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content="دواخانه, دواخانه آنلاین, خرید دوا آنلاین, اطلاعات دوایی, بلاگ دوایی" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:locale" content="fa_AF" />
        <meta property="og:site_name" content="دواخانه حکیمی" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <Link
          to="/blog"
          className="text-green-600 hover:text-green-700 font-semibold transition duration-300"
        >
          ← بازگشت به بلاگ
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold mt-6 mb-4 text-gray-800">
          {post.title}
        </h1>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
        />

        <p className="text-sm text-gray-500 mb-6">تاریخ انتشار: {post.date}</p>

        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.description }}
        ></div>
      </div>
    </section>
  );
}

export default SingleBlogPage;
