import { TestimonialSlider } from "./components";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const SliderSection = () => {
  return (
    <section className="pt-12 md:pt-[112px] pb-8 md:pb-[80px]">
      <div className="container mx-auto px-4 mb-8 md:mb-[72px]">
        <h2
          className={`text-3xl md:text-[43px]/[54px] font-bold mb-6 ${plusJakartaSans.className}`}
        >
          What our clients say
        </h2>
      </div>
      <div className="px-4 md:px-0">
        <TestimonialSlider />
      </div>
    </section>
  );
};

export default SliderSection;
