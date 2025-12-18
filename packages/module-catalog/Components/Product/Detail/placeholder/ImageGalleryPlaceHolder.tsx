export function ImageGalleryPlaceHolder() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* Main image placeholder */}
      <div className="w-full aspect-[4/3] rounded-lg animate-pulse bg-neutral-300" />

      {/* Thumbnails - responsive flex row that wraps */}
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="w-[70px] sm:w-[80px] md:w-[100px] aspect-square rounded-lg animate-pulse bg-neutral-300"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGalleryPlaceHolder;
