<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChangeEventHandler } from 'svelte/elements';

  let {
    children,
    class: className = '',
    checked,
    onchange,
  }: {
    children: Snippet;
    class?: string;
    checked: boolean;
    onchange: ChangeEventHandler<HTMLInputElement>;
  } = $props();
</script>

<label class="mb-2 block {className}">
  <input
    type="checkbox"
    {checked}
    {onchange}
  />
  {@render children()}
</label>
