<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    type = 'button',
    disabled = false,
    variant = 'primary',
    size = 'md',
    onclick,
    iconLeft,
    iconRight,
    class: className = '',
  }: {
    label: string;
    type?: 'button' | 'submit' | 'reset' | null | undefined;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md';
    class?: string;
    onclick?: (e: MouseEvent) => void;
    iconLeft?: Snippet;
    iconRight?: Snippet;
  } = $props();

  const VARIANT_MAP = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    secondary: 'border border-blue-700 text-blue-700 bg-white/25 hover:bg-black/5 dark:bg-white/5 dark:hover:bg-white/10 dark:border-blue-500 dark:text-blue-500',
    tertiary: 'text-blue-700 hover:bg-stone-600/10 dark:hover:bg-stone-400/10',
  };

  const SIZE_MAP = {
    sm: 'gap-2 px-2 h-7 text-sm',
    md: 'gap-2 px-3 h-9 text-sm',
  };
</script>

<button
  class="flex cursor-pointer items-center rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 {VARIANT_MAP[variant]} {SIZE_MAP[
    size
  ]} {className}"
  {type}
  {disabled}
  {onclick}
>
  {@render iconLeft?.()}
  {label}
  {@render iconRight?.()}
</button>
