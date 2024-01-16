import type { APIContext } from "astro";
import { getDepartureData } from "../../data";

export async function GET({ url }: APIContext) {
  const stopPlaceId = url.searchParams.get("id");

  if (!stopPlaceId) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const departures = await getDepartureData(stopPlaceId);
  return new Response(JSON.stringify(departures), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
