export interface Asset {
  title: string;
  url: string;
  page: string;
  author?: string;
  category: 'featured' | 'mystical' | 'classical' | 'scientific' | 'modern';
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
    url: "https://sketchfab.com/models/913759bdac3b4084b46ddf3b40d12f82/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/cloud-chamber-913759bdac3b4084b46ddf3b40d12f82",
    category: "scientific"
  }
]; 