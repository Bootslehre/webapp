<script lang="ts">
  import Buoy from '../components/Buoy/Buoy.svelte';
  import Footer from '../views/Footer.svelte';
  import Header from '../views/Header.svelte';
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
  <Header />

  <main class="mx-auto w-full max-w-xl">
    <div class="relative z-[1] px-4 pt-8 pb-4">
      {@render children()}
    </div>
  </main>

  <Footer />

  <Buoy />
</main>
