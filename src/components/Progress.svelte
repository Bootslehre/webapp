<script lang="ts">
  import { MAX_PROGESS } from '../stores/constants';
  import { statsService } from '../stores/stats.svelte';
  import type { Questionaire } from '../types';
  import IconButton from './Button/IconButton.svelte';
  import Info from './icons/Info.svelte';

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

  function openPopover() {
    open = false;
  }

  function closePopover() {
    open = false;
  }
</script>

<div class="flex gap-1 {className} items-center">
  <span class="text-sm font-semibold text-stone-500">
    {Math.round((achievedProgressPoints / totalProgressPoints) * 100)}% Fortschritt
  </span>

  <IconButton
    size="sm"
    variant="ghost"
    onclick={openPopover}
    class="text-stone-500"
  >
    <Info />
  </IconButton>
</div>

{#if open}
  <div>
    <div>Test</div>
    <IconButton onclick={closePopover}>
      <Info /></IconButton
    >
  </div>
{/if}
