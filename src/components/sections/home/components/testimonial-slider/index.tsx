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
import { IconQuoteFilled } from "@tabler/icons-react";

const TestimonialSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: "slide-3",
      title: "Lapius saved me $1,200 on a recent hospital bill.",
      description:
        "They spotted errors in my procedure codes that I never would have caught on my own. Now I feel a lot more confident reviewing any medical bill.",
      author: "Amanda R., San Francisco, CA",
    },
    {
      id: "slide-2",
      title:
        "I had no idea there were huge price differences between hospitals in my area.",
      description:
        "The Price Tool let me compare quotes from multiple providers, and I chose the one that fit my budget best. Game changer!",
      author: "Mark W., Los Angeles, CA",
    },
    {
      id: "slide-1",
      title:
        "The AI-Search Engine is like having a personal healthcare concierge.",
      description:
        "I simply typed in that I needed a knee replacement, and it broke down all the costs, from the surgery itself to the hospital stay. That level of detail made me feel so much more in control.",
      author: "Paula G., Sacramento",
    },
    {
      id: "slide-0",
      title:
        "As a busy mom, Lapius took the stress out of unexpected medical costs.",
      description:
        "Between my kids’ check-ups and my own treatments, I needed an easy way to see if I was being overcharged. Now, I use Lapius for every bill.",
      author: "Rebecca H., San Diego, CA",
    },
  ];

  return (
    <div className="relative px-48">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        initialSlide={1}
        direction="horizontal"
        breakpoints={{
          1024: {
            slidesPerView: 2,
            centeredSlides: true,
          },
        }}
        autoplay={true}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} id={slide.id}>
            <div className="relative bg-[#F2F8F3] px-[71px] py-10 2xl:py-[30px] 2xl:max-w-[720px] max-w-[600px] h-[400px] rounded-2xl ">
              <IconQuoteFilled
                size={32}
                className="fill-primary-dashboard mb-4"
              />
              <h3 className="mb-6 text-2xl font-bold">{slide.title}</h3>
              <p className="mb-6 text-base text-muted-foreground line-clamp-3">
                {slide.description}
              </p>
              <p className="text-base font-bold text-muted-foreground">
                {slide.author}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
