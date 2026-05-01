'use client';

import { HTMLAttributes } from 'react';

type ButtonGreyProps = {
  label: string;
  props?: HTMLAttributes<HTMLButtonElement>;
  onClick?: () => void;
};
export default function ButtonGrey({ label, props, onClick }: ButtonGreyProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className="flex items-center justify-center py-[5.58px] bg-gray-900 rounded-[14.54px] bg-linear-30 drop-shadow-xs"
    >
      {label}
    </button>
  );
}
