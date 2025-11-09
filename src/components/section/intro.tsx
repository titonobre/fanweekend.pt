import Image from "next/image";

import background from "~/assets/images/background.svg";
import logo from "~/assets/images/pdcfw.svg";

export function Intro() {
  return (
    <div
      className="absolute top-0 flex h-screen w-screen flex-col items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${background.src}')` }}
    >
      <div className="relative aspect-square w-52 sm:w-64 md:w-72">
        <Image src={logo.src} fill priority alt="" />
      </div>
      <div className="relative text-center w-52 sm:w-64 md:w-72 text-xl md:text-3xl text-white drop-shadow-lg">
        Coming June 2026
      </div>
    </div>
  );
}
