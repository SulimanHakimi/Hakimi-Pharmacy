import React from "react";

function About() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* About Us Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-center mb-6 text-green-600">
            درباره ما
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            ما یک داروخانه آنلاین با هدف تأمین داروهای با کیفیت و خدمات بهداشتی به مردم عزیز افغانستان هستیم. داروخانه ما با ارائه مشاوره‌های دارویی و محصولات درمانی با کیفیت، در خدمت شما می‌باشد.
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-center text-green-600 mb-6">
            تیم ما
          </h3>
          <div className="flex justify-center space-x-12">
            {/* Pharmacist 1 */}
            <div className="text-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQEp4qksSwNcXw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731496707875?e=1741824000&v=beta&t=abF7hMg1PPIxwNPvM_BB82xZqaTgbwDl3hCOqUpdAko"
                alt="Pharmacist 1"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">دکتر سلیمان حکیمی</h4>
              <p className="text-gray-600">داروساز</p>
            </div>

            {/* Pharmacist 2 */}
            <div className="text-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybieAMwatN-hnYywISJGuaDv7dYxqEeiGag&s"
                alt="Pharmacist 2"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">دکتر فاطمه جلالی</h4>
              <p className="text-gray-600">داروساز</p>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section>
          <h3 className="text-3xl font-semibold text-center text-green-600 mb-6">
            اطلاعات بیشتر
          </h3>
          <p className="text-lg text-gray-700 text-center mb-4">
            داروخانه ما با هدف ایجاد دسترسی راحت و سریع به داروهای مورد نیاز شما، خدماتی شامل مشاوره دارویی و ارسال سریع دارو را ارائه می‌دهد. تمامی داروهای ما از برندهای معتبر و با کیفیت بالا انتخاب شده‌اند.
          </p>
          <p className="text-lg text-gray-700 text-center">
            اگر سوالی دارید یا نیاز به مشاوره دارید، می‌توانید از طریق صفحه تماس با ما با ما در ارتباط باشید.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
