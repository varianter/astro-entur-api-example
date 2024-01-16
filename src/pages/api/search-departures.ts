import type { APIContext } from "astro";
import { getDepartureData } from "../../data";

export async function GET({ url }: APIContext) {
  const searchQuery = url.searchParams.get("query");
  if (!searchQuery) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const resultStopPlace = await fetch(
    `https://api.entur.io/geocoder/v1/search?text=${searchQuery}&layers=venue&size=1`
  );

  const dataStopPlace = await resultStopPlace.json();
  const stopPlace = dataStopPlace.features?.[0];

  if (!stopPlace) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const stopPlaceId = stopPlace.properties.id;
  const departures = await getDepartureData(stopPlaceId);

  return new Response(JSON.stringify(departures), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
