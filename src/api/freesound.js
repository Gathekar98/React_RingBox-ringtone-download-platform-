const API_BASE_URL = "https://freesound.org/apiv2";

const API_KEY = import.meta.env.VITE_FREESOUND_API_KEY;

export async function searchSounds(
    query = "notification",
    page = 1,
    pageSize = 12
    ){
        if(!API_KEY){
            throw new Error("Freeseound API key is missing. Add VITE_FREESOUND_API_KEY to your .env file.");
        }

        const params = new URLSearchParams({
            query,
            page: page.toString(),
            page_size: pageSize.toString(),

            fields: [
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
                "url"
            ].join(","),
            filter: 'duration:[0.5 TO 30] license: "Creative Commons 0"',
            sort: "rating_desc",
        });

        const response = await fetch(
            `${API_BASE_URL}/search/?${params.toString()}`,
            {
                headers: {
                    Authorization: `Token ${API_KEY}`,
                },
            }
        );

        if(!response.ok){
            throw new Error(
                'Freesound requst failed: ${response.status}'
            );
        }
    return response.json();
}