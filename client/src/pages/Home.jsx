import Category from "../components/category";
import Hero from "../components/hero";
import EquipmentSlider from "../components/EquipmentSlider";
import BlogSection from "../components/blog";
import CustomerReviews from "../components/CustomerReviews";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>خانه | دواخانه حکیمی</title>
        <meta
          name="description"
          content="دواخانه حکیمی ارائه‌دهنده انواع داروها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان."
        />
        <meta property="og:title" content="دواخانه حکیمی" />
        <meta
          property="og:description"
          content="دواخانه حکیمی ارائه‌دهنده انواع داروها و محصولات بهداشتی با ارسال سریع به سراسر افغانستان."
        />
        <meta property="og:image" content="/assets/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Hero />
      <Category />
      <EquipmentSlider
        category={"مکمل غذایی"}
        title={"دستگاه‌های مراقبت شخصی و تجهیزات ورزشی"}
      />
      <EquipmentSlider
        category="محصولات بهداشتی"
        title="محصولات زیبایی و مراقبت پوست"
      />
      <BlogSection />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
