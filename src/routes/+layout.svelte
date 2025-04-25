<script lang="ts">
  import { base } from '$app/paths';
  import Anchor from '../components/icons/Anchor.svelte';
  import './styles.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>Sail</title>

  <meta
    name="Sail"
    content="Sail"
  />
</svelte:head>

<main class="flex h-full flex-col overflow-y-auto bg-gradient-to-b from-sky-50 to-blue-100">
  <div class="bg-white px-5 py-4 shadow-md">
    <div class="mx-auto">
      <a
        href="{base}/"
        class="flex max-w-xl items-center gap-3"
      >
        <div class="text-blue-600">
          <Anchor size="lg" />
        </div>
        <h2 class="text-lg font-medium text-blue-900">SBF Trainer</h2>
      </a>
    </div>
  </div>

  <div class="mx-auto w-full max-w-xl">
    <div class="px-4 pt-8 pb-4">
      {@render children()}
    </div>
  </div>
</main>

<style>
</style>
