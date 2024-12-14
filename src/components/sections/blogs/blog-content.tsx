import Image from "next/image";

const BlogContent = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <h1 className="text-center max-w-[500px] text-3xl font-semibold">
        5 Common Medical Billing Errors That Can Cost You Thousands—and How to
        Avoid Them
      </h1>
      <div className="max-w-[750px] mt-4">
        <Image
          height={500}
          width={680}
          alt="Billing Errors"
          src="/images/blogs/blogoneheading.png"
        />
      </div>
      {
        //blog markdown content goes here
      }
    </div>
  );
};
export default BlogContent;
