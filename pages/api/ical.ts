import type { NextApiRequest, NextApiResponse } from "next";

import ical from "ical-generator";

const cal = ical({
  prodId: "//fanweekend.pt//ical//EN",
  events: [
    {
      id: "pdcfw-2022",
      start: "2022-06-10T10:00:00Z",
      end: "2022-06-12T17:00:00Z",
      summary: "Paredes de Coura Fan Weekend",
      description:
        "The Paredes de Coura Fan Weekend is back!\n\nWe will once again turn the cosy little village of Paredes de Coura into the centre stage of the AFOL community. Hosted by the Comunidade 0937 we hope to gather LEGO® fans from all around the world and make this an unforgettable experience with passionate AFOLs, fantastic models and creations and insightful workshops!",
      url: "https://fanweekend.pt",
    },
  ],
});

export default async function generateIcal(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    cal.serve(res);
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal server error");
  }
}
