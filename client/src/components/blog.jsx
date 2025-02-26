import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "نکات مهم در انتخاب دارو",
    description: "در این مقاله به نکات مهم در انتخاب دارو پرداخته می‌شود...",
    link: "/blog/post/1",
    image: "https://t4.ftcdn.net/jpg/10/89/58/51/240_F_1089585114_IfFYthSJXOgZ6FxIPCULC8C18nyMfgph.jpg",
  },
  {
    id: 2,
    title: "بهترین مکمل‌های ورزشی",
    description: "با معرفی بهترین مکمل‌ها، شما می‌توانید به بهبود عملکرد ورزشی خود کمک کنید...",
    link: "/blog/post/2",
    image: "https://t4.ftcdn.net/jpg/04/67/37/13/240_F_467371378_qO6gLstENxkRaplVEoCUUk5xXMWP8sh7.jpg",
  },
  {
    id: 3,
    title: "فواید ویتامین C",
    description: "ویتامین C برای تقویت سیستم ایمنی بدن بسیار مهم است...",
    link: "/blog/post/3",
    image: "https://t4.ftcdn.net/jpg/01/16/75/53/240_F_116755366_yBPTI53Dpm8HAGd2XjdUIoGtqmh71KMq.jpg",
  },
];

const BlogSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
          آخرین مقالات وبلاگ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 mx-auto w-full h-48 md:h-56 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{post.description}</p>
              <Link
                to={post.link}
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