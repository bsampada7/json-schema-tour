import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState<string>('/json-schema-tour/images/logo-blue.svg'); // Default to match the server-side render

  useEffect(() => {
    const src =
      theme === 'dark'
        ? '/json-schema-tour/images/logo-white.svg'
        : '/json-schema-tour/images/logo-blue.svg';
    setImageSrc(src);
  }, [theme]);

  return (
    <div>
      <Link href='/' className=''>
        <Image src={imageSrc} alt="logo" className='h-12 mr-2' width={202} height={57} />
      </Link>
    </div>
  );
};

export default Logo;