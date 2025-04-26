<script lang="ts">
  import { MAX_PROGESS } from '../stores/constants';
  import { statsService } from '../stores/stats.svelte';
  import type { Questionaire } from '../types';
  import { QUESTIONAIRE_NAME_MAP } from '../utils/questionaires';
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
    questionaire: Questionaire;
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
      class="mx-auto"
    />

    <div class="mt-4 pt-4">
      {#if doubleConfirm}
        <div class="flex flex-col items-end gap-2">
          <p class="text-sm font-normal">
            Damit wird dein gesamter Lernfortschritt für <strong>{QUESTIONAIRE_NAME_MAP[questionaire.id]}</strong> zurückgesetzt. Dieser Schritt kann nicht rückgängig gemacht werden.
            Willst du fortfahren?
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
