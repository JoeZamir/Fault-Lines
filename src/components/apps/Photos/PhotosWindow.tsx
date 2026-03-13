import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Crop, SlidersHorizontal, RotateCw } from "lucide-react";
import { GALLERY_IMAGES } from "@/utils/galleryData";

export default function PhotosWindow({ title }: { title: string }) {
  const initialIndex = useMemo(() => {
    const selected = GALLERY_IMAGES.findIndex((image) => image.name === title);
    return selected >= 0 ? selected : 0;
  }, [title]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const currentImage = GALLERY_IMAGES[activeIndex];

  const goPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  return (
    <div className="relative flex h-full flex-col bg-background text-foreground">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs">
        <p className="font-semibold uppercase tracking-wide text-muted-foreground">Photos</p>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{currentImage.name}</span>
          <button type="button" className="rounded p-1 hover:bg-secondary" title="Adjust"><SlidersHorizontal className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 hover:bg-secondary" title="Crop"><Crop className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 hover:bg-secondary" title="Rotate"><RotateCw className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-black/60 px-12 py-6">
        <button
          type="button"
          onClick={goPrevious}
          className="absolute left-4 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <img
          src={currentImage.src}
          alt={currentImage.name}
          className="h-full max-h-[86%] w-full max-w-[88%] rounded-lg border border-white/10 object-contain shadow-xl"
        />

        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
