"use client";

import { useRef, useState } from 'react';
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
  const [playing, setPlaying] = useState<Record<string, boolean>>({});

  const slides = [
    {
      id: "slide-1",
      src: "/videos/test-video.mp4",
      description: "Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet."
    },
    {
      id: "slide-2",
      src: "/videos/test-video.mp4",
      description: "Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet."
    },
    {
      id: "slide-3",
      src: "/videos/test-video.mp4",
      description: "Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet."
    },
    {
      id: "slide-4",
      src: "/videos/test-video.mp4",
      description: "Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet."
    },
  ];

  const handleVideoPlay = (id: string) => {
    setPlaying(prev => ({ ...prev, [id]: true }));
    swiperRef.current?.swiper.autoplay.stop();
  };

  const handleVideoPause = (id: string) => {
    setPlaying(prev => ({ ...prev, [id]: false }));
    swiperRef.current?.swiper.autoplay.start();
  };

  const handlePlayButtonClick = (videoRef: HTMLVideoElement, id: string) => {
    slides.forEach((slide) => {
      if (slide.id !== id) {
        const videoElement = document.getElementById(slide.id)?.querySelector("video") as HTMLVideoElement;
        if (videoElement) {
          videoElement.pause();
        }
        setPlaying(prev => ({ ...prev, [slide.id]: false }));
      }
    });

    videoRef.play();
    handleVideoPlay(id);
  };

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        initialSlide={1}
        direction="horizontal"
        height={627}
        breakpoints={{
          1024: {
            slidesPerView: 1.5,
            centeredSlides: true
          },
        }}
        autoplay={true}
        loop={true}
        onSlideChange={() => {
          const currentSlideIndex = swiperRef.current?.swiper.activeIndex;
          const currentSlideId = slides[currentSlideIndex!]?.id;

          slides.forEach((slide) => {
            if (slide.id !== currentSlideId) {
              const videoElement = document.getElementById(slide.id)?.querySelector("video") as HTMLVideoElement;
              if (videoElement) {
                videoElement.pause();
              }
              setPlaying(prev => ({ ...prev, [slide.id]: false }));
            }
          });
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} id={slide.id}>
            <div className="relative">
              <video
                src={slide.src}
                controls={false}
                className="w-full h-auto rounded-2xl"
                onPlay={() => handleVideoPlay(slide.id)}
                onPause={() => handleVideoPause(slide.id)}
              />
              {!playing[slide.id] && (
                <button
                  className="absolute text-white left-8 bottom-8 right-8"
                  onClick={(e) => {
                    const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                    handlePlayButtonClick(video, slide.id);
                  }}
                >
                  <div className="flex items-center gap-5">
                    <Image alt="play" src="/icons/play.svg" height={53} width={53} />
                    <p className="text-white text-left">{slide.description}</p>
                  </div>
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
