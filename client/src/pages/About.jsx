import { Helmet } from "react-helmet";
import Footer from "../components/footer";

function About() {
  return (
    <>
      <Helmet>
        <title>درباره ما | دواخانه حکیمی</title>
        <meta
          name="description"
          content="دواخانه حکیمی ارائه‌دهنده انواع دواها و خدمات صحی با هدف تأمین دسترسی آسان به دواهای با کیفیت و مشاوره دوایی برای مردم افغانستان."
        />
        <meta
          name="keywords"
          content="دواخانه حکیمی, درباره ما, دواخانه آنلاین, مشاوره دوایی, خدمات صحی, دوا, ارسال سریع دوا, دواهای با کیفیت"
        />

        <meta property="og:title" content="درباره ما | دواخانه حکیمی" />
        <meta
          property="og:description"
          content="دواخانه حکیمی ارائه‌دهنده انواع دواها و خدمات صحی با هدف تأمین دسترسی آسان به دواهای با کیفیت و مشاوره دوایی برای مردم افغانستان."
        />
        <meta property="og:image" content="../$assets/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="fa" />
      </Helmet>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center mb-6 text-green-600">
              درباره ما
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              ما یک دواخانه آنلاین با هدف تأمین دوا های با کیفیت و خدمات صحی به
              مردم عزیز افغانستان هستیم. دواخانه ما با ارائه مشاوره‌های دوایی و
              محصولات درمانی با کیفیت، در خدمت شما می‌باشد.
            </p>
          </section>

          <section className="mb-16">
            <h3 className="text-3xl font-semibold text-center text-green-600 mb-6">
              تیم ما
            </h3>
            <div className="flex justify-center space-x-12">
              <div className="text-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQEp4qksSwNcXw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731496707875?e=1741824000&v=beta&t=abF7hMg1PPIxwNPvM_BB82xZqaTgbwDl3hCOqUpdAko"
                  alt="Pharmacist 1"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-800">
                  داکتر سلیمان حکیمی
                </h4>
                <p className="text-gray-600"> دواساز و توسعه دهنده ویبسایت</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-semibold text-center text-green-600 mb-6">
              اطلاعات بیشتر
            </h3>
            <p className="text-lg text-gray-700 text-center mb-4">
              دواخانه ما با هدف ایجاد دسترسی راحت و سریع به دواهای مورد نیاز
              شما، خدماتی شامل مشاوره دوایی و ارسال سریع دوا را ارائه می‌دهد.
              تمامی دواهای ما از برندهای معتبر و با کیفیت بالا انتخاب شده‌اند.
            </p>
            <p className="text-lg text-gray-700 text-center">
              اگر سوالی دارید یا نیاز به مشاوره دارید، می‌توانید از طریق صفحه
              تماس با ما با ما در ارتباط باشید.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
