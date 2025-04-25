<script lang="ts">
  import { base } from '$app/paths';
  import Button from '../components/Button/Button.svelte';
  import Paper from '../components/Paper.svelte';
</script>

<Paper class="bg-white p-6">
  <h1 class="mb-4 text-xl">Moin!</h1>

  <p class="prose prose-sm flex flex-col gap-4">
    <span>Willkommen bei Bootslehre.de – deiner Online-Bootsschule für die Vorbereitung auf Bootsprüfungen in Deutschland.</span>
    <span
      >Hier findest du interaktive Kurse und hilfreiche Ressourcen, um deinen Bootsführerschein zu bestehen. Egal ob Anfänger oder Fortgeschrittener, wir begleiten dich auf deinem
      Weg zum erfolgreichen Abschluss.</span
    >
    <span>Lass uns gemeinsam in See stechen und deine nautischen Fähigkeiten auf das nächste Level bringen!</span>
  </p>

  <Button
    class="mt-5 justify-self-end"
    href="{base}/lists">Wähl deinen Schein</Button
  >
</Paper>
