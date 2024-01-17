# Example API getting bus data from Entur

Get all departures for first stop place matching query:

- https://astro-entur-api-example.vercel.app/api/search-departures?query=samfundet

Get all estimated calls relevant for specific departure (service journey):

- https://astro-entur-api-example.vercel.app/api/service-journey?id=ATB:ServiceJourney:1_230306129460705_229

## More detailed requests

Fetch all departures for specific StopPlace (by id):

- https://astro-entur-api-example.vercel.app/api/departures?id=NSR:StopPlace:42660

Fetch all stop places matching a query:

- https://astro-entur-api-example.vercel.app/api/search-stopplace?query=samfundet
