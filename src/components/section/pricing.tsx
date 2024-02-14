"use client";

import { useState } from "react";

import NextLink from "next/link";

import { CheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/components/utils";

type Item = {
  name: string;
  description: string;
};

type Plan = {
  name: string;
  price: number;
  badge?: string;
  featured?: boolean;
  items: Item[];
};

const basicPlan: Plan = {
  name: "Basic",
  price: 150,
  items: [
    { name: "Accommodation", description: "Accommodation in boarding houses (B&B) for three (3) nights." },
    { name: "Activities", description: "Access to activities, workshops, presentations and special offers." },
    { name: "Meals", description: "Breakfast, lunch, afternoon snacks and dinner." },
    { name: "Lounge", description: "Access to the AFOL lounge with a wide variety of drinks and snacks." },
    { name: "Swag", description: "Goodie Bag, participant wristband that will give you access to the activities." },
  ],
};

const fullPlan: Plan = {
  name: "Full Experience",
  price: 180,
  featured: true,
  badge: "Popular",
  items: [...basicPlan.items, { name: "AFOLs Dinner", description: "A special AFOLs dinner on Saturday." }],
};

const pricingPlans = [basicPlan, fullPlan];

export function Pricing() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-2">
      <h2 className="text-3xl">Pricing</h2>

      <div className="flex w-full flex-1 snap-x flex-row gap-2 overflow-x-auto p-8 sm:justify-center">
        {pricingPlans.map((plan, i) => (
          <div key={i} className="flex snap-center">
            <Card className="relative flex w-64 flex-col sm:w-72">
              {plan.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{plan.badge}</Badge>}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  € <span className="text-3xl font-bold text-slate-950 dark:text-slate-50">{plan.price}</span>/person
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <dl>
                  {plan.items.map((item, j) => (
                    <div key={j} className="mb-3">
                      <dt className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4" />
                        {item.name}
                      </dt>
                      {showDetails && <dd className="ml-6 text-slate-500 dark:text-slate-400">{item.description}</dd>}
                    </div>
                  ))}
                </dl>
              </CardContent>
              <CardFooter>
                <Button variant={plan.featured ? "default" : "outline"} className={cn("w-full", {})}>
                  <NextLink href="/register">Register</NextLink>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={showDetails} onCheckedChange={(checked) => setShowDetails(!!checked)} />
        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Show Details
        </label>
      </div>
    </div>
  );
}
