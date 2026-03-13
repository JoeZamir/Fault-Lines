export interface GalleryImage {
  name: string;
  src: string;
  thumb: string;
}

function makeImage(label: string, startColor: string, endColor: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='780'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${startColor}'/><stop offset='1' stop-color='${endColor}'/></linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='52' font-family='sans-serif'>${label}</text>
  </svg>`;
  const uri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return uri;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    name: "Aurora-Lake.png",
    src: makeImage("Aurora Lake", "#0f172a", "#14b8a6"),
    thumb: makeImage("Aurora", "#0b1020", "#0f766e"),
  },
  {
    name: "Penguin-Mountains.png",
    src: makeImage("Penguin Mountains", "#111827", "#3b82f6"),
    thumb: makeImage("Mountains", "#111827", "#1d4ed8"),
  },
  {
    name: "Icefjord-Sunrise.png",
    src: makeImage("Icefjord Sunrise", "#7c3aed", "#06b6d4"),
    thumb: makeImage("Sunrise", "#6d28d9", "#0891b2"),
  },
  {
    name: "City-Lights.png",
    src: makeImage("City Lights", "#581c87", "#2563eb"),
    thumb: makeImage("City", "#4c1d95", "#1d4ed8"),
  },
];
