import type { NextApiRequest, NextApiResponse } from "next";

import ical from "ical-generator";

const cal = ical({
  prodId: "//fanweekend.pt//ical//EN",
  events: [
    {
      id: "pdcfw-2022",
      start: "2022-06-09T09:00:00Z",
      end: "2022-06-12T17:00:00Z",
      summary: "Paredes de Coura Fan Weekend",
      description:
        "We're back! The Paredes de Coura Fan Weekend!\n\nWe will once again turn the cosy little village of Paredes de Coura in the centre stage of the AFOL community. Hosted by the Comunidade 0937 we hope to gather LEGO® fans from all around the world and make this an unforgettable experience with passionate AFOLs, fantastic models and creations and insightful workshops!",
      url: "https://fanweekend.pt",
    },
  ],
});

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    cal.serve(res);
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal server error");
  }
}
