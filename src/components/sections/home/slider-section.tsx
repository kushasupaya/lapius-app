import { TestimonialSlider } from "./components";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const SliderSection = () => {
  return (
    <section className="pt-[112px] pb-[80px]">
      <div className="container mx-auto px-4 mb-[72px]">
        <h2
          className={`text-[43px]/[54px] font-bold mb-6 ${plusJakartaSans.className}`}
        >
          What our clients say
        </h2>
      </div>
      <TestimonialSlider />
    </section>
  );
};

export default SliderSection;
