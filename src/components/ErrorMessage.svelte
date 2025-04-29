<script lang="ts">
  import type { Snippet } from 'svelte';
  import InfoBox from './InfoBox.svelte';

  let {
    children,
    class: className = '',
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<InfoBox
  variant="error"
  class={className}
>
  {@render children()}
</InfoBox>
