export function InfoTextPlaceHolder({
  extraClasses,
}: {
  extraClasses?: string;
}) {
  return (
    <div className="grid gap-2.5 w-full">
      <div
        className={`flex h-5 animate-pulse bg-gray-300 w-full rounded-md items-center max-w-xl ${extraClasses}`}
      />
      <div
        className={`flex h-3 animate-pulse bg-gray-300 w-full rounded-md items-center max-w-3xl ${extraClasses}`}
      />
      <div
        className={`flex h-3 animate-pulse bg-gray-300 w-full rounded-md items-center max-w-3xl ${extraClasses}`}
      />
    </div>
  );
}
