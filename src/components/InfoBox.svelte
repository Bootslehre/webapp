<script lang="ts">
  import type { Snippet } from 'svelte';
  import Info from './icons/Info.svelte';

  let {
    children,
    class: className = '',
    variant,
  }: {
    children: Snippet;
    class?: string;
    variant: 'info';
  } = $props();

  function getIconColor() {
    if (variant === 'info') {
      return 'text-blue-400';
    }
  }
</script>

<div class="flex gap-4 rounded-md border-2 border-blue-200 bg-blue-100 p-3 {className}">
  <Info
    size="lg"
    class="shrink-0 {getIconColor()}"
  />
  <div class="text-sm text-pretty">
    {@render children()}
  </div>
</div>
