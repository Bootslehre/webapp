<script lang="ts">
  import { page } from '$app/state';
  import BackButton from '../../../components/BackButton.svelte';
  import Pin from '../../../components/icons/Pin.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Progress from '../../../components/Progress.svelte';
  import Rating from '../../../components/Rating.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../stores/constants';
  import { statsService } from '../../../stores/stats.svelte';
  import { getQuestionaireBySlug } from '../../../utils/questionaires';

  const questionaire = $derived(getQuestionaireBySlug(page.params.questionaireSlug));
  const pinnedQuestions = $derived(questionaire && statsService.getPinnedQuestionIds(questionaire.id).length);

  const stats = $derived((questionaire && statsService.getQuestionaireStatsSnapshot(questionaire.id)) || {});
  const incorrectlyAnsweredQuestions = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 0).length);
</script>

{#if questionaire}
  <div class="mb-2 flex w-full items-center justify-between">
    <BackButton href="/lists">Zurück</BackButton>
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
        href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=relevance"
      >
        Alle {questionaire?.questions?.length} Fragen üben
      </a>

      <!-- todo extract this tile layout component into a reusable component and replace other usages -->
      {#if pinnedQuestions}
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=pinned"
        >
          {pinnedQuestions} markierte Fragen üben
          <Pin />
        </a>
      {/if}

      {#if incorrectlyAnsweredQuestions}
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=incorrect"
        >
          {incorrectlyAnsweredQuestions} falsch beantwortete Fragen üben
          <Rating progress={0} />
        </a>
      {/if}
    </div>
  </Paper>
{/if}
