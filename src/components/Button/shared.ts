import type { Snippet } from 'svelte';

export type ButtonVariant =
  | 'filled'
  | 'filledDestructive'
  | 'outlined'
  | 'outlinedDestructive'
  | 'text'
  | 'textDestructive'
  | 'white'
  | 'whiteDestructive';

export type ButtonSize = 'sm' | 'md';

export interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset' | null | undefined;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: string;
  onclick?: (e: MouseEvent) => void;
  iconLeft?: Snippet;
  iconRight?: Snippet;
  children: Snippet;
  href?: string;
}

export type IconButtonProps = Omit<ButtonProps, 'iconLeft' | 'iconRight'> & { children: Snippet }

export const VARIANT_STYLES_MAP: Record<ButtonVariant, string> = {
  filled: 'bg-blue-700 text-white hover:bg-blue-800',
  filledDestructive: 'bg-red-700 text-white hover:b g-red-800',
  outlined: 'border border-blue-700 text-blue-700 bg-white/25 hover:bg-blue-800/50',
  outlinedDestructive: 'border border-red-700 text-red-700 bg-white/25 hover:bg-blue-800/50',
  text: 'text-blue-700 hover:bg-blue-600/10',
  textDestructive: 'text-red-700 hover:bg-red-600/10',
  white: 'bg-white text-blue-700 hover:bg-gray-200',
  whiteDestructive: 'bg-white text-red-700 hover:bg-gray-200',
};