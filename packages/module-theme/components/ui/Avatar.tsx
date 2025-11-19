import MuiAvatar from '@mui/material/Avatar';
import NextImage from 'next/image';

export const NextAvatar = (props: NextProps) => {
  const { src, alt, avatarSize } = props;
  return (
    <MuiAvatar
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
      }}
      className={avatarSize}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'fill',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </MuiAvatar>
  );
};

interface NextProps {
  src: string;
  alt: string;
  avatarSize: 'small' | 'medium' | 'large';
  // imageSize:number;
}
