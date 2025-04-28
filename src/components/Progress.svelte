<script lang="ts">
  import { MAX_PROGESS } from '../stores/constants';
  import { statsService } from '../stores/stats.svelte';
  import { type EnrichedQuestionaire } from '../utils/questionaires';
  import Button from './Button/Button.svelte';
  import IconButton from './Button/IconButton.svelte';
  import Dialog from './Dialog.svelte';
  import Info from './icons/Info.svelte';
  import ProgressTable from './ProgressTable.svelte';

  let {
    class: className = '',
    questionaire,
  }: {
    class?: string;
    questionaire: EnrichedQuestionaire;
  } = $props();

  const stats = $derived(statsService.getQuestionaireStatsSnapshot(questionaire.id));
  const totalProgressPoints = $derived((questionaire.questions.length || 0) * MAX_PROGESS);
  const achievedProgressPoints = $derived(Object.keys(stats).reduce((sum, cur) => sum + (stats[cur].progress || 0), 0));

  let open = $state(false);
  let doubleConfirm = $state(false);

  function openDialog() {
    open = true;
  }

  function closeDialog() {
    doubleConfirm = false;
    open = false;
  }

  function resetProgress() {
    statsService.resetQuestionaireStats(questionaire.id);
  }
</script>

<div class="flex gap-1 {className} items-center">
  <span
    class="text-sm font-semibold text-stone-500"
    data-testid="progress"
  >
    {Math.round((achievedProgressPoints / totalProgressPoints) * 100)}% Fortschritt
  </span>

  <IconButton
    size="sm"
    variant="ghost"
    onclick={openDialog}
    class="text-stone-500"
    data-testid="open-progress-dialog"
  >
    <Info />
  </IconButton>
</div>

{#if open}
  <Dialog
    class="w-md"
    title="Fortschritt"
    onClose={closeDialog}
  >
    <ProgressTable
      {questionaire}
      class="mx-auto mb-4"
    />

    <div class="prose prose-sm">
      <p>Diese Fortschrittsanzeige zeigt, wie oft jede Frage richtig oder falsch beantwortet wurde.</p>
      <ul>
        <li>In der Spalte <strong>Fragen</strong> steht die Gesamtanzahl der Fragen.</li>
        <li>In der Spalte <strong>Fortschritt</strong> werden für jede Frage bis zu fünf Versuche dargestellt:</li>
        <ul>
          <li><span class="text-green-500">Grüne Punkte</span> bedeuten, dass die Frage richtig beantwortet wurde.</li>
          <li><span class="text-red-500">Rote Punkte</span> bedeuten, dass die Frage falsch beantwortet wurde.</li>
          <li><span class="text-slate-600">Graue Punkte</span> zeigen, dass für diese Frage noch keine Antwort registriert wurde.</li>
        </ul>
      </ul>
      <p>Je mehr grüne Punkte eine Frage hat, desto besser wird sie beherrscht. Viele rote Punkte deuten auf weiteren Übungsbedarf hin.</p>
      <p>Mit <strong>Zurücksetzen</strong> können alle bisherigen Fortschritte gelöscht werden.</p>
    </div>

    <div class="mt-4 pt-4">
      {#if doubleConfirm}
        <div class="flex flex-col items-end gap-2">
          <p class="text-sm font-normal">
            Damit wird dein gesamter Lernfortschritt für <strong>{questionaire.displayName}</strong> zurückgesetzt. Dieser Schritt kann nicht rückgängig gemacht werden. Willst du fortfahren?
          </p>
          <Button
            size="sm"
            variant="textDestructive"
            onclick={resetProgress}>Lernfortschritt zurücksetzen</Button
          >
        </div>
      {:else}
        <div class="flex flex-col items-end gap-2">
          <Button
            size="sm"
            variant="textDestructive"
            onclick={() => (doubleConfirm = true)}>Zurücksetzen</Button
          >
        </div>
      {/if}
    </div>
  </Dialog>
{/if}
