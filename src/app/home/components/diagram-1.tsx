import Image from 'next/image';

const DiagramOne = () => {
  return (
    <div className="mt-7 rounded-2xl">
      <Image
        src="/graphic/image.png"
        alt="Image"
        width={2855}
        height={967}
        className="w-full h-auto object-cover rounded-2xl"
      />
    </div>
  );
};

export default DiagramOne;
