export type IconSize = 'sm' | 'md' | 'lg';

export const ICON_SIZE_MAP: Record<IconSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export interface IconProps {
  size?: IconSize;
  class?: string;
}
