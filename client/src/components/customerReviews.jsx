import React from "react";

const reviews = [
  {
    id: 1,
    name: "جواد حکیمی",
    rating: 5,
    comment: "خدمات عالی و دوا به موقع رسید. تجربه خوبی داشتم.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0wDTeaZ1R69B6GEcDrWstGbO_csI8aRagA&s"
  },
  {
    id: 2,
    name: "همت الله وزیری",
    rating: 4,
    comment: "بسیار راضی هستم از خرید این دوا. کیفیت خوب بود.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHd-2aiWPYdBQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719954325991?e=2147483647&v=beta&t=5x5SRdaKn9UL0htlGhrTrJTRDtZ7F1HLIeFkFT0nLS4"
  },
  {
    id: 3,
    name: "الهام ورور",
    rating: 3,
    comment: "خدمات به موقع نبود و بعضی از دواها موجود نبود.",
    image: "https://cdn-icons-png.freepik.com/256/6997/6997676.png?semt=ais_hybrid"
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
