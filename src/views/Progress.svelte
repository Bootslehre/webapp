<script lang="ts">
  import Button from '../components/Button/Button.svelte';
  import IconButton from '../components/Button/IconButton.svelte';
  import Dialog from '../components/Dialog.svelte';
  import Info from '../components/icons/Info.svelte';
  import { aggregatorService } from '../stores/aggregation/aggregator.svelte';
  import { statsService } from '../stores/stats.svelte';
  import type { LicenseId } from '../utils/licenses';
  import ProgressTable from './ProgressTable.svelte';

  const { class: className = '' }: { class?: string } = $props();

  let open = $state(false);
  let doubleConfirm = $state(false);
  let questionaire = $derived(aggregatorService.questionaire);
  let questionaireStats = $derived(aggregatorService.questionaireStats);

  function openDialog() {
    open = true;
  }

  function closeDialog() {
    doubleConfirm = false;
    open = false;
  }

  function proceedTo2ndConfirmation() {
    doubleConfirm = true;
  }

  function resetProgress(id: LicenseId) {
    statsService.resetLicenseStats(id);
  }
</script>

{#if questionaireStats}
  <div class="flex gap-1 {className} items-center">
    <span
      class="text-sm font-semibold text-stone-500"
      data-testid="progress"
    >
      {questionaireStats.totalProgressPercentage}% Fortschritt
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

  {#if questionaire}
    {#if open}
      <Dialog
        class="w-md"
        title="Fortschritt"
        onClose={closeDialog}
      >
        <ProgressTable
          class="mx-auto mb-4"
          noProgress={questionaireStats.noProgress}
          progress0={questionaireStats.progress0}
          progress1={questionaireStats.progress1}
          progress2={questionaireStats.progress2}
          progress3={questionaireStats.progress3}
          progress4={questionaireStats.progress4}
          progress5={questionaireStats.progress5}
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
                Damit wird dein gesamter Lernfortschritt für <strong>{questionaire.displayName}</strong> zurückgesetzt. Dieser Schritt kann nicht rückgängig gemacht werden. Willst du
                fortfahren?
              </p>
              <Button
                size="sm"
                variant="textDestructive"
                onclick={() => resetProgress(questionaire.id)}>Lernfortschritt zurücksetzen</Button
              >
            </div>
          {:else}
            <div class="flex flex-col items-end gap-2">
              <Button
                size="sm"
                variant="textDestructive"
                onclick={proceedTo2ndConfirmation}>Zurücksetzen</Button
              >
            </div>
          {/if}
        </div>
      </Dialog>
    {/if}
  {/if}
{/if}
