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

<div class="w-full rounded-lg border border-slate-200 shadow-lg {className}">
  {@render children()}
</div>
