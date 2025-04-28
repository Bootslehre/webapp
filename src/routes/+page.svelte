<script lang="ts">
  import Button from '../components/Button/Button.svelte';
  import Paper from '../components/Paper.svelte';
</script>

<Paper class="bg-white p-6">
  <h1 class="mb-4 text-xl">Moin!</h1>

  <p class="prose prose-sm flex flex-col gap-4">
    <span>Willkommen bei <span class="font-semibold text-blue-600">Bootslehre.de</span> – deiner Online-Bootsschule für die Vorbereitung auf Bootsprüfungen in Deutschland.</span>
    <span>
      Hier findest du interaktive Kurse und hilfreiche Ressourcen, um deinen Bootsführerschein zu bestehen. Lass uns gemeinsam in See stechen und deine nautischen Fähigkeiten auf
      das nächste Level bringen!
    </span>
  </p>

  <Button
    class="mt-5 justify-self-end"
    href="/licenses">Wähl deinen Schein</Button
  >

  <Button
    class="mt-5 justify-self-end"
    href="/lists">Questionaires (ALT)</Button
  >
</Paper>
