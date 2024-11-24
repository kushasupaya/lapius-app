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

const VideoSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: "slide-1",
      content: <Image alt="" src="/images/about.png" height={400} width={600} className="h-auto w-full" />
    },
    {
      id: "slide-2",
      content: <Image alt="" src="/images/about.png" height={400} width={600} className="h-auto w-full" />
    },
    {
      id: "slide-3",
      content: <Image alt="" src="/images/about.png" height={400} width={600} className="h-auto w-full" />
    },
    {
      id: "slide-4",
      content: <Image alt="" src="/images/about.png" height={400} width={600} className="h-auto w-full" />
    },
  ];

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1.5}
        centeredSlides={true}
        spaceBetween={24}
        initialSlide={1}
        direction="horizontal"
        height={627}
        autoplay
        loop
      >
        {
          slides.map(slide => (
            <SwiperSlide key={slide.id} id={slide.id}>
              {slide.content}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default VideoSlider;
