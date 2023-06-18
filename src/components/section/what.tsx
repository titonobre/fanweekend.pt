import { BedIcon, BeerIcon, CakeSliceIcon, CuboidIcon, ShoppingBagIcon, UtensilsIcon } from "lucide-react";

export function What() {
  return (
    <div className="thin-container flex flex-1 flex-col items-center gap-10 overflow-hidden text-center">
      <h2 className="text-3xl">What to Expect?</h2>
      <div className="mx-auto w-full max-w-full space-y-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 p-4">
            <BedIcon />
            <h3 className="text-xl">Accommodation</h3>
            <p>Accommodation in boarding houses (B&B) for three (3) nights.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <CuboidIcon />
            <h3 className="text-xl">Activities</h3>
            <p>Access to activities, workshops, presentations and special offers.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <UtensilsIcon />
            <h3 className="text-xl">Meals</h3>
            <p>Breakfast, lunch, afternoon snacks and dinner.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <CakeSliceIcon />
            <h3 className="text-xl">Lounge</h3>
            <p>Access to the AFOL lounge with a wide variety of drinks and snacks.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <ShoppingBagIcon />
            <h3 className="text-xl">Swag</h3>
            <p>A Bag... With goodies! </p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <BeerIcon />
            <h3 className="text-xl">AFOLs Dinner</h3>
            <p>A special AFOLs dinner/buffet/barbecue on Saturday in the village.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
