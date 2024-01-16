export async function getDepartureData(stopPlaceId: string) {
  const resultDepartures = await fetch(
    `https://api.entur.io/journey-planner/v3/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ET-Client-Name": "astro-demo",
      },
      body: JSON.stringify({
        query: `
        query ($id: String!) {
          stopPlace(id: $id) {
            name
            id
            estimatedCalls {
              expectedDepartureTime
              destinationDisplay {
                frontText
              }
              serviceJourney {
                line {
                  publicCode
                  transportMode
                }
              }
            }
          }
        }`,
        variables: { id: stopPlaceId },
      }),
    }
  );

  return resultDepartures.json();
}
