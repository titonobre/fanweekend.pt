import ical from "ical-generator";

const calendar = ical({
  prodId: "//fanweekend.pt//ical//EN",
  events: [
    {
      id: "pdcfw-2024",
      start: "2024-06-07T10:00:00Z",
      end: "2024-06-09T17:00:00Z",
      summary: "Paredes de Coura Fan Weekend 2024",
      description:
        "The Paredes de Coura Fan Weekend is back!\n\nWe will once again turn the cosy little village of Paredes de Coura into the centre stage of the AFOL community. Hosted by the Comunidade 0937 we hope to gather LEGO® fans from all around the world and make this an unforgettable experience with passionate AFOLs, fantastic models and creations and insightful workshops!",
      url: "https://fanweekend.pt",
    },
  ],
});

export async function GET() {
  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calendar.ics"',
    },
  });
}
