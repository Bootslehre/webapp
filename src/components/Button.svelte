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
    href,
  }: {
    label: string;
    type?: 'button' | 'submit' | 'reset' | null | undefined;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'primaryDestructive' | 'secondaryDestructive' | 'tertiaryDestructive';
    size?: 'sm' | 'md';
    class?: string;
    onclick?: (e: MouseEvent) => void;
    iconLeft?: Snippet;
    iconRight?: Snippet;
    href?: string;
  } = $props();

  const VARIANT_MAP = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    primaryDestructive: 'bg-red-700 text-white hover:bg-red-800',
    secondary: 'border border-blue-700 text-blue-700 bg-white/25 hover:bg-blue-800/50',
    secondaryDestructive: 'border border-red-700 text-red-700 bg-white/25 hover:bg-blue-800/50',
    tertiary: 'text-blue-700 hover:bg-stone-600/10',
    tertiaryDestructive: 'text-red-700 hover:bg-stone-600/10',
  };

  const SIZE_MAP = {
    sm: 'gap-2 px-2 h-7 text-sm',
    md: 'gap-2 px-3 h-9 text-sm',
  };
</script>

{#if href}
  <a
    {href}
    class="flex cursor-pointer items-center rounded-md text-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 {VARIANT_MAP[variant]} {SIZE_MAP[
      size
    ]} {className}"
    {onclick}
  >
    {@render iconLeft?.()}
    {label}
    {@render iconRight?.()}
  </a>
{:else}
  <button
    class="flex cursor-pointer items-center rounded-md text-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 {VARIANT_MAP[variant]} {SIZE_MAP[
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
{/if}
