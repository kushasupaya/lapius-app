"use client";

import { useRef } from "react";
import Image from "next/image";

import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./style.css";

const ClientsSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: "slide-1",
      image: "/images/clients/1.svg"
    },
    {
      id: "slide-2",
      image: "/images/clients/2.svg"
    },
    {
      id: "slide-3",
      image: "/images/clients/3.svg"
    },
    {
      id: "slide-4",
      image: "/images/clients/4.svg"
    },
    {
      id: "slide-5",
      image: "/images/clients/5.svg"
    },
    {
      id: "slide-6",
      image: "/images/clients/2.svg"
    },
  ];

  return (
    <div className="relative px-0 w-full">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        initialSlide={0}
        direction="horizontal"
        centeredSlides={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 83,
          },
          1366: {
            slidesPerView: 5,
            centeredSlides: true,
          },
        }}
        autoplay={true}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} id={slide.id}>
            <div className="flex justify-between w-full">
              <Image
                alt=""
                src={slide.image}
                height={48}
                width={204}
                className="h-12 w-auto mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientsSlider;
