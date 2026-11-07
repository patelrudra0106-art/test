import React from 'react';

export interface SkeletonProps {
  className?: string;
  label?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const roundedMap: Record<NonNullable<SkeletonProps['rounded']>, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  label = 'Loading content...',
  rounded = 'xl',
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={`animate-pulse motion-reduce:animate-none bg-warm-border/55 ${roundedMap[rounded]} ${className}`}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Skeleton;