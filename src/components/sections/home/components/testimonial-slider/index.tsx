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
import { IconQuoteFilled } from '@tabler/icons-react';

const TestimonialSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: "slide-3",
      title: "Lapius AI saved me valuable time with transparent healthcare options",
      description: "The platform’s price transparency and AI-driven recommendations made it easy to find affordable treatment options without the hassle. Highly recommended!",
      author: "Sarah M., Patient"
    },
    {
      id: "slide-2",
      title: "Lapius AI saved me valuable time with transparent healthcare options",
      description: "The platform’s price transparency and AI-driven recommendations made it easy to find affordable treatment options without the hassle. Highly recommended!",
      author: "Sarah M., Patient"
    },
    {
      id: "slide-1",
      title: "Lapius AI saved me valuable time with transparent healthcare options",
      description: "The platform’s price transparency and AI-driven recommendations made it easy to find affordable treatment options without the hassle. Highly recommended!",
      author: "Sarah M., Patient"
    },
    {
      id: "slide-0",
      title: "Lapius AI saved me valuable time with transparent healthcare options",
      description: "The platform’s price transparency and AI-driven recommendations made it easy to find affordable treatment options without the hassle. Highly recommended!",
      author: "Sarah M., Patient"
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
            <div className="relative bg-[#F2F8F3] px-[71px] py-[56px] rounded-2xl">
              <IconQuoteFilled size={32} className="fill-primary-dashboard mb-4" />
              <h3 className="mb-6 text-2xl font-bold">{slide.title}</h3>
              <p className="mb-16 text-lg text-muted-foreground">{slide.description}</p>
              <p className="mb-16 text-lg font-bold text-muted-foreground">{slide.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
