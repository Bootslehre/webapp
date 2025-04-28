<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChevronDown from './icons/ChevronDown.svelte';

  let {
    children,
    class: className = '',
  }: {
    children: Snippet;
    class?: string;
  } = $props();

  let open = $state(false);

  function crickey(e: Event) {
    setTimeout(() => {
      const el = e.target as HTMLElement;
      const detailsEl = el.closest('details');

      if (detailsEl) {
        open = detailsEl.open;
      }
    });
  }
</script>

<summary
  class="flex cursor-pointer {className} items-center gap-1"
  onclick={crickey}
>
  <div>
    {@render children()}
  </div>
  <ChevronDown
    size="lg"
    class="shrink-0 transition-transform {open ? 'rotate-180' : ''}"
  />
</summary>
