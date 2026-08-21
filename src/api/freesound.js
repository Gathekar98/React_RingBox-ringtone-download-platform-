const API_BASE_URL =
  "https://freesound.org/apiv2";

const API_KEY =
  import.meta.env.VITE_FREESOUND_API_KEY;

export async function searchSounds(
  query = "notification",
  page = 1,
  pageSize = 20
) {
  if (!API_KEY) {
    throw new Error(
      "Freesound API key is missing. Check your .env file."
    );
  }

  const fields = [
    "id",
    "name",
    "username",
    "license",
    "duration",
    "previews",
    "images",
    "tags",
    "num_downloads",
    "avg_rating",
    "url",
  ].join(",");

  const params =
    new URLSearchParams();

  params.set(
    "query",
    query.trim()
  );

  params.set(
    "page",
    String(page)
  );

  params.set(
    "page_size",
    String(pageSize)
  );

  params.set(
    "fields",
    fields
  );

  /*
   * For now we only restrict duration.
   *
   * We are NOT restricting searches to CC0
   * while developing because that can make
   * some useful searches unnecessarily small.
   */
  params.set(
    "filter",
    "duration:[0.5 TO 30]"
  );

  params.set(
    "sort",
    "rating_desc"
  );

  const requestUrl =
    `${API_BASE_URL}/search/?${params.toString()}`;

  console.log(
    "Searching Freesound:",
    query
  );

  console.log(
    "Freesound request:",
    requestUrl
  );

  const response =
    await fetch(
      requestUrl,
      {
        headers: {
          Authorization:
            `Token ${API_KEY}`,
        },
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "Freesound API error:",
      response.status,
      errorText
    );

    throw new Error(
      `Freesound request failed: ${response.status}`
    );
  }

  const data =
    await response.json();

  console.log(
    "Freesound results:",
    data
  );

  return data;
}

export async function getSoundById(soundId) {
  if (!API_KEY) {
    throw new Error(
      "Freesound API key is missing. Check your .env file."
    );
  }

  const fields = [
    "id",
    "name",
    "username",
    "license",
    "duration",
    "previews",
    "images",
    "tags",
    "num_downloads",
    "avg_rating",
    "url",
    "description",
    "type",
    "samplerate",
    "channels",
  ].join(",");

  const params = new URLSearchParams({
    fields,
  });

  const response = await fetch(
    `${API_BASE_URL}/sounds/${soundId}/?${params.toString()}`,
    {
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Freesound sound request failed:",
      response.status,
      errorText
    );

    throw new Error(
      `Unable to load sound: ${response.status}`
    );
  }

  return response.json();
}