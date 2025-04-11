<script lang="ts">
  import Anchor from '../components/icons/Anchor.svelte';
  import './styles.css';
</script>

<svelte:head>
  <title>Sail</title>
  <meta
    name="Sail"
    content="Sail"
  />
</svelte:head>

<main class="flex flex-col h-full overflow-y-auto bg-gradient-to-b from-sky-50 to-blue-100">
  <div class="px-5 py-4 bg-white shadow-md">
    <div class="mx-auto max-w-xl flex items-center gap-3">
      <div class="text-blue-600">
        <Anchor size="lg" />
      </div>
      <h2 class="text-lg font-medium text-blue-900">Maritime License</h2>
    </div>
  </div>

  <slot />
</main>

<style>
</style>
