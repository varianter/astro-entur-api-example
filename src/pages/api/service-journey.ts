import type { APIContext } from "astro";
import { getDepartureData, getServiceJourneyData } from "../../data";

export async function GET({ url }: APIContext) {
  const serviceJourneyId = url.searchParams.get("id");

  if (!serviceJourneyId) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const departures = await getServiceJourneyData(serviceJourneyId);
  const data = departures?.data?.serviceJourney?.estimatedCalls;

  if (!data?.length) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
