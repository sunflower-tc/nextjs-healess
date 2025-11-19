import Image from 'next/image';
import ReactImageGallery from 'react-image-gallery';
import Item from './Item';

export default class NextImageGallery extends ReactImageGallery {
  renderItem(item) {
    const { isFullscreen } = this.state;
    const { onImageError } = this.props;
    const handleImageError = onImageError || this.handleImageError;

    return (
      <Item
        description={item.description}
        fullscreen={item.fullscreen}
        handleImageLoaded={this.handleImageLoaded}
        isFullscreen={isFullscreen}
        onImageError={handleImageError}
        original={item.original}
        originalAlt={item.originalAlt}
        originalHeight={item.originalHeight}
        originalWidth={item.originalWidth}
        originalTitle={item.originalTitle}
        sizes={item.sizes}
        loading={item.loading}
        srcSet={item.srcSet}
      />
    );
  }

  renderThumbInner(item) {
    const { onThumbnailError } = this.props;
    const handleThumbnailError = onThumbnailError || this.handleImageError;

    return (
      <span className="image-gallery-thumbnail-inner ">
        <Image
          src={item.thumbnail}
          priority
          width={70}
          height={70}
          alt={item.thumbnailAlt}
          title={item.thumbnailTitle}
          loading={item.thumbnailLoading}
          onError={handleThumbnailError}
        />
        {item.thumbnailLabel && (
          <div className="image-gallery-thumbnail-label ">
            {item.thumbnailLabel}
          </div>
        )}
      </span>
    );
  }
}
