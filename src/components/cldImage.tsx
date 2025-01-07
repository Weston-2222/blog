'use client';
import 'client-only';
import { CldImage as CldImagexx } from 'next-cloudinary';

const CldImage = ({
  width,
  height,
  src,
  alt,
  sizes,
}: {
  width: string;
  height: string;
  src: string;
  alt: string;
  sizes?: string;
}) => {
  return (
    <CldImagexx
      width={Number(width)}
      height={Number(height)}
      src={src}
      sizes={sizes}
      alt={alt}
    />
  );
};

export default CldImage;
