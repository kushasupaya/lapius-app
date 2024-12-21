"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./style.css";

const FaqSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePaginationClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const slides = [
    {
      id: "slide-1",
      content: (
        <Image
          alt=""
          src="/images/faq.png"
          height={400}
          width={600}
          className="h-full lg:h-[525px] w-auto"
        />
      ),
    },
    {
      id: "slide-2",
      content: (
        <Image
          alt=""
          src="/images/faq.png"
          height={400}
          width={600}
          className="h-full lg:h-[525px] w-auto"
        />
      ),
    },
    {
      id: "slide-3",
      content: (
        <Image
          alt=""
          src="/images/faq.png"
          height={400}
          width={600}
          className="h-full lg:h-[525px] w-auto"
        />
      ),
    },
    {
      id: "slide-4",
      content: (
        <Image
          alt=""
          src="/images/faq.png"
          height={400}
          width={600}
          className="h-full lg:h-[525px] w-auto"
        />
      ),
    },
  ];

  return (
    <div className="relative max-w-[470px]">
      <Image
        alt="medical bill mistakes"
        src="/images/faq.png"
        height={400}
        width={600}
        style={{ objectFit: "contain" }}
        className="h-full lg:h-[525px] w-auto"
      />
      {/* <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        direction="horizontal"
        centeredSlides={true}
        onSlideChange={handleSlideChange}
        autoplay
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} id={slide.id}>
            {slide.content}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="horizontal-pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={`custom-bullet ${
              activeIndex === index && "horizontal-bullet-active"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default FaqSlider;
