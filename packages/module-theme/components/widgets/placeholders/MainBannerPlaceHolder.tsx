import React from 'react';

export function MainBannerPlaceHolder() {
  return (
    <div
      className="
        w-full
        max-h-[460px]
        min-h-[300px]
        h-[60dvh]
        bg-gray-300
        animate-pulse
        rounded-md
        shadow-md
        overflow-hidden
        relative
        sm:min-h-[350px]
        md:min-h-[400px]
      "
      aria-label="Loading main banner"
      role="status"
    >
      {/* Overlay subtle gradient for better look */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200 opacity-70" />
    </div>
  );
}
