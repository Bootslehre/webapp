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

{#if questionaireStats && questionaire}
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

  {#if open}
    <Dialog
      class="w-lg"
      title="Fortschritt {questionaireStats.totalProgressPercentage}%"
      onClose={closeDialog}
    >
      <div class="text-sm">Die Fortschrittsanzeige zeigt an, wie viele Fragen von <strong class="font-semibold">{questionaire.displayName}</strong> du wie gut gelernt hast.</div>

      <ProgressTable
        class="mt-6 mb-10 w-full"
        noProgress={questionaireStats.noProgress}
        progress0={questionaireStats.progress0}
        progress1={questionaireStats.progress1}
        progress2={questionaireStats.progress2}
        progress3={questionaireStats.progress3}
        progress4={questionaireStats.progress4}
        progress5={questionaireStats.progress5}
      />

      {#if doubleConfirm}
        <p class="mb-2 text-sm">
          Damit wird dein gesamter Lernfortschritt für <strong class="font-semibold">{questionaire.displayName}</strong> zurückgesetzt. Dieser Schritt kann nicht rückgängig gemacht
          werden. Willst du fortfahren?
        </p>
        <Button
          class="justify-self-end"
          size="sm"
          variant="textDestructive"
          onclick={() => resetProgress(questionaire.id)}>Lernfortschritt zurücksetzen</Button
        >
      {:else}
        <p class="mb-2 text-sm">
          Klicke <strong class="font-semibold">Zurücksetzen</strong> um deinen Fortschritt für <strong class="font-semibold">{questionaire.displayName}</strong> zu löschen.
        </p>
        <Button
          class="justify-self-end"
          size="sm"
          variant="textDestructive"
          onclick={proceedTo2ndConfirmation}>Zurücksetzen</Button
        >
      {/if}
    </Dialog>
  {/if}
{/if}
