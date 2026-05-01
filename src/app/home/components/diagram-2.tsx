import Image from 'next/image';

const DiagramTwo = () => {
  return (
    <div className="mt-7 rounded-2xl">
      <Image
        src="/graphic/image2.png"
        alt="Image"
        width={2750}
        height={1536}
        className="w-full h-auto object-cover rounded-2xl"
      />
    </div>
  );
};

export default DiagramTwo;
