export interface Asset {
  title: string;
  url: string;
  page: string;
  author?: string;
  category: 'featured' | 'mystical' | 'classical' | 'scientific' | 'modern';
  tags?: string[];
}

export const assets: Asset[] = [
  {
    title: "Information Singularity",
    url: "https://sketchfab.com/models/b17dc9b2e98441be9ef9e67ac33e6db8/embed?ui_ar=0&ui_help=0",
    page: "https://sketchfab.com/3d-models/information-singularity-b17dc9b2e98441be9ef9e67ac33e6db8",
    category: "scientific"
  },
  {
    title: "Core-collapse Supernova",
    url: "https://sketchfab.com/models/606b7fe570dd4ae38e59fe3acf81e8a0/embed?ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0",
    page: "https://sketchfab.com/models/606b7fe570dd4ae38e59fe3acf81e8a0",
    category: "scientific"
  },
  {
    title: "APOMIXIS",
    url: "https://sketchfab.com/models/ec07ac844bc747518759436172b6f773/embed",
    page: "https://sketchfab.com/3d-models/apomixis-eaten-character-concept-ec07ac844bc747518759436172b6f773",
    author: "Joshua Liren",
    category: "featured"
  },
  {
    title: "Sun and Moon Tarot",
    url: "https://sketchfab.com/models/d78ec3cd39034e8ca2276973a832f298/embed",
    page: "https://sketchfab.com/3d-models/sun-and-moon-tarot-d78ec3cd39034e8ca2276973a832f298",
    author: "Tarot Master",
    category: "mystical"
  },
  {
    title: "The Magus",
    url: "https://sketchfab.com/models/3f9079ad954c487291e61b5416a7603d/embed",
    page: "https://sketchfab.com/3d-models/quill-the-magus-3f9079ad954c487291e61b5416a7603d",
    author: "Quill Studios",
    category: "mystical"
  },
  {
    title: "Isleworth Mona Lisa",
    url: "https://sketchfab.com/models/da64e56526dd49acbda7cd8e07b7d7f3/embed",
    page: "https://sketchfab.com/3d-models/isleworth-mona-lisa-3d-da64e56526dd49acbda7cd8e07b7d7f3",
    author: "Art Restorer",
    category: "classical"
  },
  {
    title: "Armillary Sphere",
    url: "https://sketchfab.com/models/3dd4d50a0dab4d889700d5bf2ea2e9ba/embed",
    page: "https://sketchfab.com/3d-models/armillary-sphere-3dd4d50a0dab4d889700d5bf2ea2e9ba",
    author: "Astronomical Society",
    category: "scientific"
  },
  {
    title: "Monster Eels",
    url: "https://sketchfab.com/models/b53ae3d5f0cc4d509365a12792e6af89/embed",
    page: "https://sketchfab.com/3d-models/monster-eels-b53ae3d5f0cc4d509365a12792e6af89",
    author: "PAYA-PAYA",
    category: "modern"
  },
  {
    title: "Bouche à lèvres",
    url: "https://sketchfab.com/models/f0b55b70bdcd49608c99cdf0e5e9747c/embed",
    page: "https://sketchfab.com/3d-models/bouche-a-levres-f0b55b70bdcd49608c99cdf0e5e9747c",
    author: "Loïc Norgeot",
    category: "modern"
  },
  {
    title: "Terminusoid",
    url: "https://sketchfab.com/models/96c2814b8b2b43be8bccf54e5c28cb94/embed",
    page: "https://sketchfab.com/3d-models/terminusoid-96c2814b8b2b43be8bccf54e5c28cb94",
    author: "мort.аrt",
    category: "modern"
  },
  {
    title: "Dragon Koi",
    url: "https://sketchfab.com/models/b6c5d2efb986489a96318a31b3f1a348/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/dragon-koi-b6c5d2efb986489a96318a31b3f1a348",
    author: "Tycho Magnetic Anomaly",
    category: "modern"
  },
  {
    title: "A Windy Day",
    url: "https://sketchfab.com/models/fb78f4cc938144e6902dd5cff354d525/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/a-windy-day-fb78f4cc938144e6902dd5cff354d525",
    author: "Loïc Norgeot",
    category: "modern"
  },
  {
    title: "Emma in a Straw Hat 3D",
    url: "https://sketchfab.com/models/4bc5ec09f5d546afb36b149e5bb5873b/embed",
    page: "https://sketchfab.com/3d-models/emma-in-a-straw-hat-3d-4bc5ec09f5d546afb36b149e5bb5873b",
    author: "hinxlinx",
    category: "classical"
  },
  {
    title: "Feudal Japan: Oiran",
    url: "https://sketchfab.com/models/27be63b9f5014121a4f5021e6514c47d/embed",
    page: "https://sketchfab.com/3d-models/feudal-japan-oiran-27be63b9f5014121a4f5021e6514c47d",
    category: "classical"
  },
  {
    title: "Particle Wave",
    url: "https://sketchfab.com/models/072b42ac6b8d4c93a55f3c524e44b2f3/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/particle-wave-072b42ac6b8d4c93a55f3c524e44b2f3",
    category: "scientific"
  },
  {
    title: "Cloud Chamber",
    url: "https://sketchfab.com/models/913759bdac3b4084b46ddf3b40d12f82/embed",
    page: "https://sketchfab.com/3d-models/cloud-chamber-913759bdac3b4084b46ddf3b40d12f82",
    category: "scientific"
  },
  {
    title: "Desolation",
    url: "https://sketchfab.com/models/2f52a9284cc448d994de5ce00761b957/embed",
    page: "https://sketchfab.com/3d-models/desolation-2f52a9284cc448d994de5ce00761b957",
    author: "Frenetik Void",
    category: "mystical",
    tags: ["space", "abstract", "dark"]
  },
  {
    title: "Collapse",
    url: "https://sketchfab.com/models/011baf0739e54ad59389a0c64ac298e8/embed",
    page: "https://sketchfab.com/3d-models/collapse-011baf0739e54ad59389a0c64ac298e8",
    author: "GolemKlonVIII",
    category: "scientific",
    tags: ["abstract", "structure", "dark"]
  },
  {
    title: "A Star Forming Region",
    url: "https://sketchfab.com/models/5583099ba6e9444ebf7f2b4d92e31625/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/a-star-forming-region-5583099ba6e9444ebf7f2b4d92e31625",
    author: "Salvatore Orlando",
    category: "scientific",
    tags: ["space", "stars", "nebula"]
  },
  {
    title: "The young accreting star DG Tauri B",
    url: "https://sketchfab.com/models/4c3421a983c0439da40508b637e89725/embed?ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=1&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0",
    page: "https://sketchfab.com/3d-models/the-young-accreting-star-dg-tauri-b-4c3421a983c0439da40508b637e89725",
    category: "scientific",
    tags: ["space", "stars", "astronomy"]
  },
  {
    title: "Cosmic Clocks",
    url: "https://sketchfab.com/models/286cd0400fcd40fe9796065585b0ebf1/embed?ui_theme=dark",
    page: "https://sketchfab.com/3d-models/cosmic-clocks-286cd0400fcd40fe9796065585b0ebf1",
    category: "scientific",
    tags: ["space", "time", "abstract"]
  },
  {
    title: "Quasar: the cosmic lighthouse",
    url: "https://sketchfab.com/models/9c6d127d10894fdbb913705b1ca7c5ee/embed?ui_theme=dark",
    page: "https://sketchfab.com/3d-models/quasar-the-cosmic-lighthouse-9c6d127d10894fdbb913705b1ca7c5ee",
    author: "moroplogo",
    category: "scientific",
    tags: ["space", "quasar", "astronomy"]
  },
  {
    title: "Nebula space HDRi background photosphere",
    url: "https://sketchfab.com/models/38e96b59f24345d9a757030eadc92bac/embed?ui_theme=dark",
    page: "https://sketchfab.com/3d-models/nebula-space-hdri-background-photosphere-38e96b59f24345d9a757030eadc92bac",
    author: "Aliaksandr.melas",
    category: "scientific",
    tags: ["space", "nebula", "background"]
  },
  {
    title: "Cosmic Unsanitorium",
    url: "https://sketchfab.com/models/ef1439b1d5704130ae7bb79d92dabec4/embed",
    page: "https://sketchfab.com/3d-models/cosmic-unsanitorium-ef1439b1d5704130ae7bb79d92dabec4",
    author: "Natural Warp",
    category: "mystical",
    tags: ["space", "abstract", "dark"]
  },
  {
    title: "Banban Evil Mutant Garten of Banban 8",
    url: "https://sketchfab.com/models/f6f5213265964f3b8fa671f68538084b/embed",
    page: "https://sketchfab.com/3d-models/banban-evil-mutant-garten-of-banban-8-f6f5213265964f3b8fa671f68538084b",
    author: "Nelam0n",
    category: "modern",
    tags: ["character", "game", "horror"]
  },
  {
    title: "Toon Baphomet",
    url: "https://sketchfab.com/models/cca0fb19543c4d66ad79c7dc432cfa82/embed",
    page: "https://sketchfab.com/3d-models/toon-baphomet-cca0fb19543c4d66ad79c7dc432cfa82",
    author: "USERVIBE",
    category: "mystical",
    tags: ["character", "mythology", "cartoon"]
  },
  {
    title: "Tiny Frog",
    url: "https://sketchfab.com/models/c25c8980b93a460aa521ae62d3d94e0e/embed",
    page: "https://sketchfab.com/3d-models/tiny-frog-c25c8980b93a460aa521ae62d3d94e0e",
    author: "yanix",
    category: "modern",
    tags: ["character", "animal", "cute"]
  },
  {
    title: "Center Floor",
    url: "https://sketchfab.com/models/f1ad1b5d75874d7795a7df5c1a2c905e/embed",
    page: "https://sketchfab.com/3d-models/center-floor-f1ad1b5d75874d7795a7df5c1a2c905e",
    author: "cgart.com",
    category: "modern",
    tags: ["architecture", "interior", "design"]
  },
  {
    title: "Circa Infinity",
    url: "https://sketchfab.com/models/93ec20028510461e963f9990e2af0e5b/embed",
    page: "https://sketchfab.com/3d-models/circa-infinity-93ec20028510461e963f9990e2af0e5b",
    author: "aronegal",
    category: "mystical",
    tags: ["abstract", "infinity", "space"]
  },
  
]; 