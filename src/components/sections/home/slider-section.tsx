import { TestimonialSlider } from "./components";

const SliderSection = () => {
  return (
    <section className="pt-[112px] pb-[80px]">
      <div className="container mx-auto px-4 mb-[72px]">
        <h2 className="text-[43px]/[54px] font-bold mb-6">What our clients say</h2>
      </div>
      <TestimonialSlider />
    </section>
  )
}

export default SliderSection;
