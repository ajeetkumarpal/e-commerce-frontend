import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { assets } from "../assets/frontend_assets/assets";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

import { Navigation, Pagination, Scrollbar, Mousewheel } from "swiper/modules";

const Hero = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={false}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      mousewheel={{
        forceToAxis: true,
        thresholdDelta: 50,
      }}
      loop={true}
      className="w-full h-full "
    >
      <SwiperSlide>
        <img
          src={assets.slider1}
          alt="slide1"
          className="w-full h-125 object-cover  "
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={assets.slider2}
          alt="slide2"
          className="w-full h-125 object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={assets.slider3}
          alt="slide3"
          className="w-full h-125 object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={assets.slider4}
          alt="slide3"
          className="w-full h-125 object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={assets.slider5}
          alt="slide3"
          className="w-full h-125 object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
