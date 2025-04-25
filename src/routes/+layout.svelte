<script lang="ts">
  import { base } from '$app/paths';
  import Footer from '../components/Footer.svelte';
  import Anchor from '../components/icons/Anchor.svelte';
  import Tonne from '../components/Tonne/Tonne.svelte';
  import './styles.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>Bootslehre</title>
  <meta
    name="description"
    content="Bootslehre hilft bei der Vorbereitung auf Bootsprüfungen in Deutschland. Interaktive Kurse und Ressourcen für den Bootsführerschein."
  />
  <meta
    name="keywords"
    content="Bootslehre, SBF, Bootsprüfung, Bootsführerschein, Online-Bootsschule, Nautik, Segeln, Prüfungsvorbereitung, Bootstraining, Deutschland"
  />
</svelte:head>

<main class="flex h-full min-h-full flex-col overflow-y-auto bg-gradient-to-b from-sky-50 to-blue-100">
  <header class="bg-white px-5 py-4 shadow-md">
    <div class="mx-auto">
      <a
        href="{base}/"
        class="flex max-w-xl items-center gap-3"
      >
        <div class="text-blue-600">
          <Anchor size="lg" />
        </div>
        <h2 class="text-lg font-medium text-blue-900">Bootslehre</h2>
      </a>
    </div>
  </header>

  <main class="mx-auto w-full max-w-xl">
    <div class="relative z-[1] px-4 pt-8 pb-4">
      {@render children()}
    </div>
  </main>

  <Footer />
  <Tonne />
</main>
