import Category from "../components/category";
import Hero from "../components/hero";
import EquipmentSlider from "../components/EquipmentSlider";
import BlogSection from "../components/blog";
import CustomerReviews from "../components/customerReviews";
import { Helmet } from "react-helmet";
import Footer from "../components/footer"

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
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
      <EquipmentSlider category={"مسکن"} title={"مسکن های درد"} />
      <EquipmentSlider
        category="آنتی‌بیوتیک"
        title="محصولات پرفروش این هفته"
      />
      <BlogSection />
      <CustomerReviews />
      <Footer/>
    </div>
  );
};

export default HomePage;
