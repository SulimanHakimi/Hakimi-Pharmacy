import React from "react";

const reviews = [
  {
    id: 1,
    name: "محمد احمدی",
    rating: 5,
    comment: "خدمات عالی و دوا به موقع رسید. تجربه خوبی داشتم.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1_YfpgNDlbAfaC8LwRlZoCPcDKu3ZHLUqxw&s"
  },
  {
    id: 2,
    name: "عمران",
    rating: 4,
    comment: "بسیار راضی هستم از خرید این دوا. کیفیت خوب بود.",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 3,
    name: "نصیر کاظمی",
    rating: 3,
    comment: "خدمات به موقع نبود و بعضی از دواها موجود نبود.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRppODj3vyIELXidXsB0-R5izXS0W5GLQv__Q&s"
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">نظرات مشتریان</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img
                src={review.image}
                alt={review.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < review.rating ? "yellow" : "gray"}
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
