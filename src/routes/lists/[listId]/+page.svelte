<script lang="ts">
  import { page } from '$app/state';
  import Button from '../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../components/icons/ChevronLeft.svelte';
  import Pin from '../../../components/icons/Pin.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Progress from '../../../components/Progress.svelte';
  import Rating from '../../../components/Rating.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../stores/constants';
  import { statsService } from '../../../stores/stats.svelte';
  import { getQuestionaire } from '../../../utils/questionaires';

  const questionaire = $derived(getQuestionaire(page.params.listId));
  const pinnedQuestions = $derived(questionaire && statsService.getPinnedQuestionIds(questionaire.id).length);

  const stats = $derived((questionaire && statsService.getQuestionaireStatsSnapshot(questionaire.id)) || {});
  const incorrectlyAnsweredQuestions = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 0).length);
</script>

{#snippet chevronIcon()}
  <ChevronLeft size="lg" />
{/snippet}

{#if questionaire}
  <div class="mb-2 flex w-full items-center justify-between">
    <Button
      href="/lists"
      data-testid="back-button"
      variant="text"
      size="sm"
      iconLeft={chevronIcon}>Zurück</Button
    >

    <Progress {questionaire} />
  </div>

  <Paper class="flex flex-col items-start gap-4 bg-white p-6">
    <h1 class="text-lg font-semibold">
      {questionaire.displayName}
    </h1>

    <p class="text-justify">
      {questionaire.description}
    </p>

    <div class="w-full space-y-4">
      <a
        class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50"
        href="/lists/{questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=relevance"
      >
        Alle {questionaire?.questions?.length} Fragen lernen
      </a>

      <!-- todo extract this tile layout component into a reusable component and replace other usages -->
      {#if pinnedQuestions}
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          href="/lists/{questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=pinned"
        >
          {pinnedQuestions} markierte Fragen lernen
          <Pin />
        </a>
      {/if}

      {#if incorrectlyAnsweredQuestions}
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          href="/lists/{questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=incorrect"
        >
          {incorrectlyAnsweredQuestions} falsch beantwortete Fragen lernen
          <Rating progress={0} />
        </a>
      {/if}
    </div>
  </Paper>
{/if}
