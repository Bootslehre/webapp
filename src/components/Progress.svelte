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
    class="w-lg"
    title="Fortschritt"
    onClose={closeDialog}
  >
    <div class="text-sm">Die Fortschrittsanzeige zeigt an, wie viele Fragen von <strong class="font-semibold">{questionaire.displayName}</strong> du wie gut gelernt hast.</div>

    <ProgressTable
      {questionaire}
      class="mt-6 mb-10 w-full"
    />

    {#if doubleConfirm}
      <p class="mb-2 text-sm">
        Damit wird dein gesamter Lernfortschritt für <strong class="font-semibold">{questionaire.displayName}</strong> zurückgesetzt. Dieser Schritt kann nicht rückgängig gemacht werden.
        Willst du fortfahren?
      </p>
      <Button
        class="justify-self-end"
        size="sm"
        variant="textDestructive"
        onclick={resetProgress}>Lernfortschritt zurücksetzen</Button
      >
    {:else}
      <p class="mb-2 text-sm">
        Klicke <strong class="font-semibold">Zurücksetzen</strong> um deinen Fortschritt für <strong class="font-semibold">{questionaire.displayName}</strong> zu löschen.
      </p>
      <Button
        class="justify-self-end"
        size="sm"
        variant="textDestructive"
        onclick={() => (doubleConfirm = true)}>Zurücksetzen</Button
      >
    {/if}
  </Dialog>
{/if}
