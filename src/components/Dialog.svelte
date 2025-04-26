<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconButton from './Button/IconButton.svelte';
  import Close from './icons/Close.svelte';

  let {
    title,
    onClose,
    children,
    class: className = '',
  }: {
    title: string;
    onClose: () => void;
    children: Snippet;
    class?: string;
  } = $props();

  function stopPropagation(event: Event) {
    event.stopPropagation();
  }

  function dismissOnEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window onkeydown={dismissOnEscKey} />

<dialog
  class="fixed inset-0 isolate z-10 flex h-full w-full items-center justify-center bg-gray-950/50"
  onclick={onClose}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="relative rounded-lg bg-white px-4 pt-2 pb-4 shadow-2xl {className}"
    onclick={stopPropagation}
  >
    <div class="mb-8 flex w-full items-center justify-between gap-8">
      <div class="text-lg font-semibold">{title}</div>

      <IconButton
        onclick={onClose}
        variant="ghost"
        class="mr-[-6px] text-stone-500"
        data-testid="close-dialog"
      >
        <Close size="lg" />
      </IconButton>
    </div>

    <div>
      {@render children()}
    </div>
  </div>
</dialog>
