import { useEffect, useRef, useState } from 'react';

type InfiniteScrollDivProps<T> = {
  TOTAL_DATA: T[];
  children: (item: T, index: number) => React.ReactNode;
};

const ITEMS_PER_LOAD = 5;

function InfiniteScrollDiv<T>({
  TOTAL_DATA,
  children,
}: InfiniteScrollDivProps<T>) {
  const [visibleData, setVisibleData] = useState<T[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Array.isArray(TOTAL_DATA) || TOTAL_DATA.length === 0) {
      setVisibleData([]);
      setLoadedCount(0);
      return;
    }
    setVisibleData(TOTAL_DATA.slice(0, ITEMS_PER_LOAD));
    setLoadedCount(ITEMS_PER_LOAD);
  }, [TOTAL_DATA]);

  const loadMoreItems = () => {
    if (isFetching || loadedCount >= TOTAL_DATA.length) return;

    setIsFetching(true);
    const nextItems = TOTAL_DATA.slice(
      loadedCount,
      loadedCount + ITEMS_PER_LOAD
    );

    setTimeout(() => {
      setVisibleData((prev) => [...prev, ...nextItems]);
      setLoadedCount((prev) => prev + ITEMS_PER_LOAD);
      setIsFetching(false);
    }, 0); // Set a timeout to yield the event loop
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container &&
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
    ) {
      loadMoreItems();
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`max-h-56 ${TOTAL_DATA?.length > ITEMS_PER_LOAD ? 'overflow-y-scroll' : 'overflow-y-hidden'} border border-gray-300 rounded-md p-0 shadow-sm`}
    >
      {TOTAL_DATA?.length > 0 ? (
        visibleData.map((item, index) => (
          <div key={index}>{children(item, index)}</div>
        ))
      ) : (
        <div className="py-3 text-center text-gray-500">No data available.</div>
      )}
    </div>
  );
}

export default InfiniteScrollDiv;
