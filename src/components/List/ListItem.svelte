<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ListItemVariant } from './types';

  let {
    children,
    class: className = '',
    href,
    variant = 'info',
    onclick,
  }: {
    children: Snippet;
    class?: string;
    href?: string;
    variant?: ListItemVariant;
    onclick?: (e: MouseEvent) => void;
  } = $props();

  function getVariantStyles() {
    switch (variant) {
      case 'success':
        return 'border-green-400 bg-green-300 text-green-950';
      case 'error':
        return 'border-red-400 bg-red-300 text-red-950';
      default:
        return 'border-slate-200 hover:border-blue-200 hover:bg-blue-50';
    }
  }

  const baseClasses = 'w-full cursor-pointer rounded-md border p-4 text-left text-sm font-medium text-pretty transition-colors';
</script>

<li>
  {#if href}
    <a
      class="{baseClasses} {getVariantStyles()} {className}"
      {onclick}
      {href}
    >
      {@render children()}
    </a>
  {:else}
    <button
      class="{baseClasses} {getVariantStyles()} {className}"
      {onclick}
    >
      {@render children()}
    </button>
  {/if}
</li>
