import { PLACEHOLDER_IMG } from '@utils/Constants';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

type ThumbnailProps = {
  thumbnail?: string;
  height?: number;
  loading?: 'eager' | 'lazy';
  width?: number;
  alt?: string | any;
  fill?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty' | undefined;
  onClick?: any;
  priority?: boolean;
};

export const Thumbnail: FC<ThumbnailProps> = ({
  thumbnail,
  priority = false,
  height,
  width,
  loading = 'lazy',
  fill = false,
  alt,
  placeholder = 'blur',
  className = '',
  onClick,
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
      onClick={onClick}
      className={className}
      src={src}
      fill={fill}
      loading={loading}
      width={width}
      height={height}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={PLACEHOLDER_IMG}
      alt={alt}
      onError={() => setSrc(PLACEHOLDER_IMG)}
    />
  );
};
export default Thumbnail;
