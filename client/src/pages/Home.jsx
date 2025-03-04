import Category from "../components/category";
import Hero from "../components/hero";
import EquipmentSlider from "../components/EquipmentSlider";
import BlogSection from "../components/blog";
import CustomerReviews from "../components/customerReviews";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>خانه | دواخانه حکیمی</title>
        <meta
          name="description"
          content="دواخانه حکیمی ارائه‌دهنده انواع دواها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان. خرید آنلاین دواهای با کیفیت از دواخانه حکیمی."
        />
        <meta
          name="keywords"
          content="دواخانه حکیمی, دواخانه آنلاین, خرید دوا, محصولات بهداشتی, ارسال سریع, دوا افغانستان"
        />

        <meta property="og:title" content="دواخانه حکیمی" />
        <meta
          property="og:description"
          content="دواخانه حکیمی ارائه‌دهنده انواع دواها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان. خرید آنلاین دواهای با کیفیت از دواخانه حکیمی."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <meta property="og:image" content="../$assets/logo.png" />
        <meta name="twitter:title" content="دواخانه حکیمی" />
        <meta
          name="twitter:description"
          content="دواخانه حکیمی ارائه‌دهنده انواع دواها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان. خرید آنلاین دواهای با کیفیت از دواخانه حکیمی."
        />
        <meta name="twitter:image" content="../$assets/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="fa" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "دواخانه حکیمی",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "232"
              },
              "url": "${window.location.href}",
              "description": "دواخانه حکیمی ارائه‌دهنده انواع داروها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان. خرید آنلاین دواهای با کیفیت.",
            }
          `}
        </script>
      </Helmet>

      <Hero />
      <Category />
      <EquipmentSlider category={"ضد افسردگی"} title={"دوا های ضد افسردگی"} />
      <EquipmentSlider category="آنتی‌بیوتیک" title="پرفروش ترین محصولات این هفته" />
      <BlogSection />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default HomePage;
