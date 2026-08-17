export function normalizeSound(sound){
    return{
        id: sound.id,
        title: sound.name,
        creator: sound.username,
        duration: sound.duration,
        license: sound.license,
        tags: sound.tags || [],
        downloads: sound.num_downloads || 0,
        rating: sound.avg_rating || 0,
        preview: sound.previews?.["preview-hq-mp3"] || sound.previews?.["preview-lq-mp3"] || null,
        waveform: sound.images?.waveform_m || sound.images?.waveform_l || null,
        freesoundUrl: sound.url,
    };
}