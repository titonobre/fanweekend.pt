import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { ContactIcon, HotelIcon, MailIcon, MapIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/utils";

import { type Accommodation } from "@/lib/data/accommodations";

type AccommodationCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    accommodation: Accommodation;
  };

export function AccommodationCard({ className, accommodation, ...props }: AccommodationCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Accommodation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <HotelIcon aria-label="Name" />
            {accommodation.url ? (
              <a href={accommodation.url} className="text-nowrap underline underline-offset-4" target="_blank" rel="noreferrer">
                {accommodation.name}
              </a>
            ) : (
              accommodation.name
            )}
          </div>
          <div className="flex flex-row gap-2">
            <MapIcon aria-label="Locality" /> {accommodation.locality}
          </div>
          {accommodation.contact && (
            <div className="flex flex-row gap-2">
              <ContactIcon aria-label="Contact" /> {accommodation.contact}
            </div>
          )}
          {!!accommodation.phones?.length && (
            <div className="flex flex-row gap-2">
              <PhoneIcon aria-label="Phone" />
              <div>
                {accommodation.phones.map((phone, i) => [
                  i > 0 && ", ",
                  <a key={phone} href={`tel:${phone}`} className="text-nowrap underline underline-offset-4">
                    {phone}
                  </a>,
                ])}
              </div>
            </div>
          )}
          {accommodation.email && (
            <div className="flex flex-row gap-2">
              <MailIcon aria-label="Contact" />{" "}
              <a href={`mailto:${accommodation.email}`} className="text-nowrap underline underline-offset-4">
                {accommodation.email}
              </a>
            </div>
          )}
        </div>
      </CardContent>
      {accommodation.directionsLink && (
        <CardFooter className="flex justify-end">
          <Button asChild>
            <NextLink href={accommodation.directionsLink} target="_blank" rel="noreferrer">
              <MapIcon className="mr-2 h-4 w-4" />
              View on Google Maps
            </NextLink>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export function AccommodationCardSkeleton() {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="leading-none tracking-tight">
          <Skeleton className="h-6 w-48 max-w-full" />
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-24 max-w-full" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-36 max-w-full" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-14 max-w-full" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-28 max-w-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 pt-0">
        <Skeleton className="h-10 w-44" />
      </div>
    </div>
  );
}
