import type { APIContext } from "astro";

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
    `https://api.entur.io/geocoder/v1/search?text=${searchQuery}&layers=venue`
  );
  const dataStopPlace = await resultStopPlace.json();

  if (!dataStopPlace || !dataStopPlace.features?.length) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify(
      dataStopPlace.features.map((item: any) => ({
        id: item.properties.id,
        name: item.properties.name,
        county: item.properties.county,
        locality: item.properties.locality,
        coordinates: item.geometry.coordinates,
      }))
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
