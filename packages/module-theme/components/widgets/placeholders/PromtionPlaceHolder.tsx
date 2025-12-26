import Containers from '../../ui/Container';

export function PromtionPlaceHolder() {
  return (
    <Containers className="w-full">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[290px] md:h-[600px] w-full rounded-sm animate-pulse bg-neutral-400" />

        <div className="grid md:gap-4">
          <div className="h-[290px] w-full rounded-sm animate-pulse bg-neutral-400" />
          <div className="h-[290px] w-full rounded-sm animate-pulse bg-neutral-400" />
        </div>
      </div>
    </Containers>
  );
}
