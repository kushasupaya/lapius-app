import { TestimonialSlider } from "./components";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const SliderSection = () => {
  return (
    <section className="pt-9 md:pt-[112px] pb-8 md:pb-[80px] 2xl:px-36">
      <div className="container mx-auto px-4 mb-6 md:mb-[62px] 2xl:px-36">
        <h2
          className={`text-2xl md:text-[34px]/[42px] font-bold mb-6 ${plusJakartaSans.className}`}
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
