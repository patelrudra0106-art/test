import React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'line' | 'circle' | 'rect' | 'card' | 'metric' | 'update-row';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  className,
  ...rest
}) => {
  if (variant === 'card') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'scheme-card-surface p-6 h-64 flex flex-col justify-between',
          className
        )}
        {...rest}
      >
        <div>
          <div className="w-12 h-12 rounded-glass-sm skeleton-shimmer mb-5" />
          <div className="h-5 w-3/4 rounded skeleton-shimmer mb-3" />
          <div className="h-4 w-full rounded skeleton-shimmer mb-2" />
          <div className="h-4 w-2/3 rounded skeleton-shimmer" />
        </div>
        <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between">
          <div className="h-4 w-24 rounded skeleton-shimmer" />
          <div className="w-8 h-8 rounded-full skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === 'metric') {
    return (
      <div
        aria-hidden="true"
        className={cn('flex items-center gap-4', className)}
        {...rest}
      >
        <div className="w-12 h-12 rounded-glass-sm skeleton-shimmer shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-6 w-20 rounded skeleton-shimmer" />
          <div className="h-4 w-32 rounded skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === 'update-row') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'p-5 rounded-glass-sm border border-warm-border bg-warm-ivory/80 space-y-2.5',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="h-5 w-28 rounded-pill skeleton-shimmer" />
          <div className="h-4 w-24 rounded skeleton-shimmer" />
        </div>
        <div className="h-5 w-3/4 rounded skeleton-shimmer" />
        <div className="h-4 w-full rounded skeleton-shimmer" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'skeleton-shimmer',
        variant === 'circle' && 'rounded-full',
        variant === 'line' && 'h-4 rounded',
        variant === 'rect' && 'rounded-glass-sm',
        className
      )}
      {...rest}
    />
  );
};

export default Skeleton;
