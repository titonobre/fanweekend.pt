import Image, { type StaticImageData } from "next/image";
import NextLink from "next/link";

import { MapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { siteConfig } from "@/config/site";

import map from "~/assets/images/iberia-map.svg";

const mapAsset = map as StaticImageData;

export function Where() {
  return (
    <div className="thin-container flex flex-1 flex-col gap-10 text-center">
      <h2 className="text-3xl">Where on Earth is Paredes de Coura?</h2>
      <p>
        In case this is your first time or you find yourself lost, the event takes place in the town of Paredes de Coura, located in
        Northern Portugal in the district of Viana do Castelo, 100 km away from Porto in Portugal and 50 km from Vigo in Spain.
      </p>
      <div className="flex flex-1 flex-col gap-10 sm:flex-row">
        <div className="flex flex-1 flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <p className="font-bold">Address</p>
            <address className="not-italic">
              Centro Cultural
              <br />
              Av. Cónego Bernardo Chousal
              <br />
              Paredes de Coura
              <br />
              Portugal
            </address>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">GPS Coordinates</p>
            <p className="">41°54&apos;42.90&quot;N 8°33&apos;46.18&quot;W</p>
          </div>
          <div className="flex flex-col items-center">
            <Button asChild>
              <NextLink href={siteConfig.links.location} target="_blank" rel="noreferrer">
                <MapIcon className="mr-2 h-4 w-4" />
                View on Google Maps
              </NextLink>
            </Button>
          </div>
        </div>
        <div className="-mr-8 flex-1 pl-6 sm:pl-0">
          <div className="relative h-[38rem] w-full">
            <div className="absolute h-full w-full">
              <div className="relative aspect-[193/150] h-full">
                <Image className="dark:invert" src={mapAsset} fill alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
