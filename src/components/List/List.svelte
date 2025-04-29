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

<ul class="w-full space-y-3 {className}">
  {@render children()}
</ul>
