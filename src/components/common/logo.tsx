import Image from "next/image";

interface Props {
  variant: 'default' | 'compact';
}

const Logo = ({ variant = 'default' }: Props) => {
  return (
    <Image
      alt="logo"
      // TODO: replace image and styles for compact
      src={variant === 'default' ? '/logo/logo.svg': '/logo/logo.svg'}
      width={50}
      height={100}
      className="h-6 w-full"
    />
  )
};

export default Logo;
