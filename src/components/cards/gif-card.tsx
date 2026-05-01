import Image from 'next/image';

type GifCardProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function GifCard({ src, alt = 'GIF', className = '', width, height }: GifCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[12.1241px] ${className}`}
      style={{ width, height }}
    >
      <Image src={src} alt={alt} fill unoptimized className="object-cover" />
    </div>
  );
}
