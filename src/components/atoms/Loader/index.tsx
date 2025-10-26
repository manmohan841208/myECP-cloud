// components/LoaderOverlay.tsx
import Image from 'next/image';
import loaderImg from '../../../assets/svg/Loader/loader.gif';

interface LoaderOverlayProps {
  imageSrc?: string;
  className?: string;
}

export function Loader({ imageSrc }: LoaderOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <Image
        src={imageSrc ? imageSrc : loaderImg}
        alt="Loading..."
        width={100}
        height={100}
        className="animate-pulse"
      />
    </div>
  );
}
