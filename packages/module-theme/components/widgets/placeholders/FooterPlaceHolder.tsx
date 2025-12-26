export function FooterPlaceHolder() {
  const placeholders = Array(4).fill(0);

  return (
    <div className="w-full p-4 bg-neutral-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[...Array(4)].map((__, i) => (
            <div
              key={`line-${i}`}
              className="w-16 h-5 max-w-xs bg-gray-300 rounded-md animate-pulse"
              style={{ marginBottom: i < 3 ? '0.375rem' : 0 }}
            />
          ))}
          {placeholders.map((_, idx) => (
            <div key={`col-${idx}`} className="space-y-3 ">
              {[...Array(4)].map((__, i) => (
                <div
                  key={`line-${idx}-${i}`}
                  className="w-16 h-5 bg-gray-300 rounded-md animate-pulse"
                  style={{ marginBottom: i < 3 ? '0.375rem' : 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 mt-10 sm:flex-row">
        <div className="w-48 h-5 bg-gray-300 rounded-md animate-pulse" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={`icon-${i}`}
              className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
