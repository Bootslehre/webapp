<script lang="ts">
  import type { Snippet } from 'svelte';
  import ErrorOutline from './icons/ErrorOutline.svelte';
  import Info from './icons/Info.svelte';

  let {
    children,
    class: className = '',
    variant,
  }: {
    children: Snippet;
    class?: string;
    variant: 'info' | 'error';
  } = $props();

  function getIconColor() {
    if (variant === 'info') {
      return 'text-blue-400';
    } else if (variant === 'error') {
      return 'text-red-400';
    }
  }
</script>

<div class="flex gap-4 rounded-md border-2 p-3 {variant === 'info' ? 'border-blue-200 bg-blue-100' : ''} {variant === 'error' ? 'border-red-200 bg-red-100' : ''} {className}">
  {#if variant === 'info'}
    <Info
      size="lg"
      class="shrink-0 {getIconColor()}"
    />
  {/if}
  {#if variant === 'error'}
    <ErrorOutline
      size="lg"
      class="shrink-0 {getIconColor()}"
    />
  {/if}
  <div class="text-sm text-pretty">
    {@render children()}
  </div>
</div>
