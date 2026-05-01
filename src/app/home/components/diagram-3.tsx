import Image from 'next/image';

const DiagramThree = () => {
  return (
    <div className="mt-7 rounded-2xl">
      <Image
        src="/graphic/image3.png"
        alt="Image"
        width={4421}
        height={1794}
        className="w-full h-auto object-cover rounded-2xl"
      />
    </div>
  );
};

export default DiagramThree;
