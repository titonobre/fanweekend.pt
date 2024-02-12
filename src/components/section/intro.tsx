import Image, { type StaticImageData } from "next/image";

import background from "../../../assets/images/background.webp";
import logo from "../../../assets/images/pdcfw.svg";

const logoAsset = logo as StaticImageData;

export function Intro() {
  return (
    <div
      className="absolute top-0 flex h-screen w-screen flex-col items-center justify-end bg-cover bg-fixed bg-center bg-no-repeat pb-40 sm:pb-32"
      style={{ backgroundImage: `url('${background.src}')` }}
    >
      <div className="relative aspect-square w-52 sm:w-64 md:w-72">
        <Image src={logoAsset} fill priority alt="" />
      </div>
    </div>
  );
}
