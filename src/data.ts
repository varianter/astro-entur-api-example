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
                id
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
export async function getServiceJourneyData(serviceJourneyId: string) {
  const resultEstimatedCalls = await fetch(
    `https://api.entur.io/journey-planner/v3/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ET-Client-Name": "astro-demo",
      },
      body: JSON.stringify({
        query: `
        query($id: String!) {
          serviceJourney(id: $id) {
            estimatedCalls {
              expectedDepartureTime
              destinationDisplay {
                frontText
              }
              quay {
                id
                name
                publicCode              
              }
            }
          }
        }
        `,
        variables: { id: serviceJourneyId },
      }),
    }
  );

  return resultEstimatedCalls.json();
}
