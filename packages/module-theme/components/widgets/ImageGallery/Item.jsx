import Image from 'next/image';
import { bool, func, string, number } from 'prop-types';
import React from 'react';

const defaultProps = {
  description: '',
  fullscreen: '',
  isFullscreen: false,
  originalAlt: '',
  originalHeight: number.isRequired,
  originalWidth: number.isRequired,
  originalTitle: '',
  sizes: '',
  srcSet: '',
  loading: 'eager',
};

const Item = React.memo((props) => {
  const {
    description,
    fullscreen, // fullscreen version of img
    handleImageLoaded,
    isFullscreen,
    onImageError,
    original,
    originalAlt,
    originalHeight,
    originalWidth,
    originalTitle,
    sizes,
    srcSet,
    loading,
  } = { ...defaultProps, ...props };
  const itemSrc = isFullscreen ? fullscreen || original : original;

  return (
    <React.Fragment>
      <Image
        style={{
          width: originalWidth || 'auto',
          height: originalHeight || 'auto',
        }}
        className="image-gallery-image border-black"
        src={itemSrc}
        alt={originalAlt}
        priority
        srcSet={srcSet}
        height={originalHeight}
        width={originalWidth}
        sizes={sizes}
        title={originalTitle}
        onLoad={(event) => handleImageLoaded(event, original)}
        onError={onImageError}
        loading={loading}
      />
      {description && (
        <span className="image-gallery-description">{description}</span>
      )}
    </React.Fragment>
  );
});

Item.displayName = 'Item';

Item.propTypes = {
  description: string,
  fullscreen: string, // fullscreen version of img
  handleImageLoaded: func.isRequired,
  isFullscreen: bool,
  onImageError: func.isRequired,
  original: string.isRequired,
  originalAlt: string,
  originalHeight: number.isRequired,
  originalWidth: number.isRequired,
  originalTitle: string,
  sizes: string,
  srcSet: string,
  loading: string,
};

export default Item;
