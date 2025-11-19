import { PLACEHOLDER_IMG } from '@utils/Constants';
import Image from 'next/image';
import { CSSProperties, FC, useEffect, useState } from 'react';

type ThumbnailProps = {
  thumbnail: string;
  fill: boolean;
  alt: string;
  placeholder?: 'blur' | 'empty' | undefined;
  className?: string | undefined;
  style?: CSSProperties;
  sizes?: string | undefined;
};

export const BannerThumbnail: FC<ThumbnailProps> = ({
  thumbnail,
  fill,
  alt,
  placeholder = 'blur',
  className,
  style,
  sizes,
}) => {
  const [src, setSrc] = useState<string>(thumbnail || PLACEHOLDER_IMG);

  /**
   * Settings SRC after receiving it from the server
   */
  useEffect(() => {
    if (thumbnail) {
      setSrc(thumbnail);
    }
  }, [thumbnail]);

  return (
    <Image
      src={src}
      fill={fill}
      priority={true}
      placeholder={placeholder}
      blurDataURL={PLACEHOLDER_IMG}
      alt={alt}
      onError={() => setSrc(PLACEHOLDER_IMG)}
      className={className}
      style={style}
      sizes={sizes}
    />
  );
};
