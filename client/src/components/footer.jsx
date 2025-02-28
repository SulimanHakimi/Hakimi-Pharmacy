import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white pb-4 text-center">
      <div className="shop-location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1035.57158981438!2d69.23462518660016!3d34.50960084706597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16b0064b7fcf5%3A0xd87ca33b70f9e63c!2zTG9nYXIgUGhhcm1hY3kg2K_ZiNin2K7Yp9mG2Ycg2YTZiNqv2LE!5e0!3m2!1sen!2s!4v1740575159869!5m2!1sen!2s"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="contact-info mt-8 px-4">
        <h3 className="text-xl font-semibold">اطلاعات تماس</h3>
        <p className="mt-2">آدرس: کارته نو ایستگاه سابقه کابل افغانستان</p>
        <p className="mt-2">تلفن: 93784966018</p>

        <p className="mt-2">ایمیل: afgsuliman50@gmail.com</p>
        <p className="mt-2">
          روز های کاری: شنبه تا پنجشنبه، از ساعت 8 صبح تا 4 عصر (جمعه‌ها تعطیل
          است)
        </p>
      </div>

      <div className="additional-info mt-8">
        <p>برای هرگونه سوال یا پیشنهاد، لطفاً با ما تماس بگیرید.</p>
      </div>
    </footer>
  );
}

export default Footer;
