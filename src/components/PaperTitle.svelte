<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className = '',
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<div class="text-lg leading-none font-semibold {className}">
  {@render children()}
</div>
