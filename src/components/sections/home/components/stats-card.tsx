import Image from "next/image";

interface Props {
  icon: string;
  stats: string;
  title?: string;
  description: string;
}

const AboutCard = ({ icon, stats, title, description }: Props) => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl w-64 h-80">
      <div className="flex justify-center items-center h-20 w-20 rounded-full bg-primary mb-14">
        <Image
          src={icon}
          alt="icon"
          width={41}
          height={41}
          className="h-10 w-10"
        />
      </div>
      <h3 className="text-[64px] text-black font-semibold mb-1.5">{stats}</h3>
      <p className="text-foreground font-medium mb-1">{title}</p>
      <p className="text-subtitle-normal">{description}</p>
    </div>
  );
};

export default AboutCard;
