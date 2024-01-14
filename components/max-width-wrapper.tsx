import { cn } from '@/lib/utils';
import React from 'react';

interface MaxWidthWrapperProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 lg:px-20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
