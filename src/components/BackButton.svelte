<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button/Button.svelte';
  import ChevronLeft from './icons/ChevronLeft.svelte';

  let {
    children,
    class: className = '',
    href,
  }: {
    children: Snippet;
    class?: string;
    href: string;
  } = $props();
</script>

{#snippet chevronIcon()}
  <ChevronLeft size="lg" />
{/snippet}

<Button
  {href}
  variant="text"
  size="sm"
  class="justify-self-start {className}"
  data-testid="back-button"
  iconLeft={chevronIcon}>{@render children()}</Button
>
