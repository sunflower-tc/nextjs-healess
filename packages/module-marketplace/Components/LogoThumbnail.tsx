import { PLACEHOLDER_IMG } from '@utils/Constants';
import Image from 'next/image';
import { CSSProperties, FC, useEffect, useState } from 'react';

type ThumbnailProps = {
  thumbnail: string;
  height?: number;
  width?: number;
  alt: string;
  placeholder?: 'blur' | 'empty' | undefined;
  className?: string | undefined;
  style?: CSSProperties;
  fill?: boolean;
};

export const Thumbnail: FC<ThumbnailProps> = ({
  thumbnail,
  height,
  width,
  fill = false,
  alt,
  placeholder = 'blur',
  style,
  className,
}) => {
  const [src, setSrc] = useState<string>(PLACEHOLDER_IMG);

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
      height={height}
      width={width}
      priority={true}
      placeholder={placeholder}
      blurDataURL={PLACEHOLDER_IMG}
      alt={alt}
      fill={fill}
      onError={() => setSrc(PLACEHOLDER_IMG)}
      style={style}
      className={className}
    />
  );
};
