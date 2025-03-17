import Image from "next/image";
import Link from "next/link";

const UserProfile = () => {
  // Replace with actual image and name data here
  const image = "/images/pattern.svg";
  const name = "John Doe";

  return (
    <div className="flex items-center gap-2">
      <Image alt="profile" src={image} width={43} height={43} className="bg-primary h-[43px] w-[43px] rounded-full" />
      <div>
        <p className="text-sm text-tertiary font-medium w-full max-w-32 whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
        <Link href="/" className="text-tertiary text-sm">Logout</Link>
      </div>
    </div>
  )
}

export default UserProfile;
