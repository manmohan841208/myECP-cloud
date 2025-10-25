import React from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { type StaticImageData } from 'next/image';

type Props = Omit<NextImageProps, 'src'> & {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  url?: string;
};

const Image: React.FC<Props> = ({ src, alt, className, ...rest }) => {
  return <NextImage src={src} alt={alt} className={className} {...rest} />;
};

export default Image;
