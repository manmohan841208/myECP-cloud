import Image from 'next/image';
import type { ReactElement } from 'react';

type Promotion = {
  IsDefault: boolean;
  PromotionDisplayOrder: number;
  PromotionImageId: number;
  PromotionLink: string;
  Expires: string;
};

export const generatePromotionImages = (
  promotions: Promotion[],
  baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '',
): ReactElement[] => {
  const imageUrl = baseUrl;

  return [...promotions]
    .sort((a, b) => a.PromotionDisplayOrder - b.PromotionDisplayOrder)
    .map((promo, index) => (
      <Image
        src={`${imageUrl}${promo.PromotionImageId}`}
        alt={`Banner ${index + 1}`}
        key={String(index + 1)}
        width={800}
        height={300}
        unoptimized
      />
    ));
};
