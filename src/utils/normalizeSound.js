export function normalizeSound(sound) {
  return {
    id: sound.id,

    title:
      sound.name ||
      "Untitled Sound",

    creator:
      sound.username ||
      "Unknown Creator",

    duration:
      Number(sound.duration) || 0,

    license:
      sound.license ||
      "Unknown",

    description:
      sound.description ||
      "",

    tags:
      sound.tags || [],

    downloads:
      sound.num_downloads || 0,

    rating:
      Number(sound.avg_rating) || 0,

    preview:
      sound.previews?.[
        "preview-hq-mp3"
      ] ||
      sound.previews?.[
        "preview-lq-mp3"
      ] ||
      null,

    waveform:
      sound.images?.waveform_m ||
      sound.images?.waveform_l ||
      null,

    freesoundUrl:
      sound.url || null,

    type:
      sound.type || null,

    sampleRate:
      sound.samplerate || null,

    channels:
      sound.channels || null,
  };
}