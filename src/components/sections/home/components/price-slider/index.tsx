"use client";

import { useRef } from 'react';
import Image from 'next/image';

import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import "./style.css";

const PriceSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: "slide-3",
      src: "/images/tr-2.png",
      title: "Rheumatology",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#"
    },
    {
      id: "slide-1",
      src: "/images/tr-1.png",
      title: "Rheumatology",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#"
    },
    {
      id: "slide-2",
      src: "/images/tr-2.png",
      title: "Rheumatology",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#"
    },
    {
      id: "slide-4",
      src: "/images/tr-1.png",
      title: "Rheumatology",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#"
    },
  ];

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        initialSlide={1}
        direction="horizontal"
        breakpoints={{
          1024: {
            slidesPerView: 2,
            centeredSlides: true
          },
        }}
        autoplay={true}
        loop={true}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} id={slide.id}>
            <div className="relative">
              <Image
                alt={slide.title}
                src={slide.src}
                width={703}
                height={352}
                className="w-full h-auto max-h-[352px] max-w-[703px] aspect-video rounded-xl mb-4"
              />
              <p className="text-xl font-bold mb-3 max-w-[703px]">{slide.title}</p>
              <p className="text-base mb-3 max-w-[703px]">{slide.description}</p>
              <a href={slide.link} className="flex items-center gap-2 w-max text-primary-foreground font-semibold text-base hover:text-primary-foreground-hover">
                See more
                <Image
                  alt="arrow"
                  src="/icons/arrow-right.svg"
                  height={24}
                  width={24}
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PriceSlider;
