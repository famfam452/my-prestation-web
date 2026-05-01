import Image from 'next/image';

type ImageSlideProps = {
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const ImageSlide = ({
  src,
  alt = '',
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  sizes,
}: ImageSlideProps) => {
  return (
    <div
      className={`relative ${className ?? ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image src={src ?? ''} alt={alt} fill className="object-cover" sizes={sizes} />
    </div>
  );
};

export default ImageSlide;
