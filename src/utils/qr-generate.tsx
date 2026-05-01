import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

type GenerateQRCodeOptions = {
  size?: number;
  iconSrc?: string;
  iconSize?: number;
  excavate?: boolean;
  bgColor?: string;
  fgColor?: string;
  marginSize?: number;
};

const generateQRCode = (
  text: string,
  {
    size = 200,
    iconSrc,
    iconSize,
    excavate = true,
    bgColor = '#E6F4F1',
    fgColor = '#0F103F',
    marginSize = 2,
  }: GenerateQRCodeOptions = {}
) => {
  const resolvedIconSize = iconSize ?? Math.round(size * 0.22);

  return (
    <QRCodeSVG
      value={text}
      size={size}
      level="H"
      bgColor={bgColor}
      fgColor={fgColor}
      marginSize={marginSize}
      imageSettings={
        iconSrc
          ? {
              src: iconSrc,
              height: resolvedIconSize,
              width: resolvedIconSize,
              excavate,
            }
          : undefined
      }
    />
  );
};

export default generateQRCode;
