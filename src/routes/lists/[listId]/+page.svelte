<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Button from '../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../components/icons/ChevronLeft.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Progress from '../../../components/Progress.svelte';
  import { statsService } from '../../../stores/stats.svelte';
  import { goToNextQuestion } from '../../../utils/nextQuestion';
  import { QUESTIONAIRES } from '../../../utils/questionaires';

  const questionaire = $derived(QUESTIONAIRES.find((q) => q.id === page.params.listId));
  const pinnedQuestions = $derived(questionaire && statsService.getPinnedQuestionIds(questionaire.id).length);
</script>

{#snippet chevronIcon()}
  <ChevronLeft size="lg" />
{/snippet}

{#if questionaire}
  <div class="mb-2 flex w-full items-center justify-between">
    <Button
      href="{base}/lists"
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
      <button
        class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50"
        onclick={() => goToNextQuestion('relevance', questionaire.id)}
      >
        Alle {questionaire?.questions?.length} Fragen lernen
      </button>

      <!-- todo extract this tile layout component into a reusable component and replace other usages -->
      <button
        class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() => goToNextQuestion('pinned', questionaire.id)}
        disabled={!pinnedQuestions}
      >
        {pinnedQuestions} markierte Fragen lernen
      </button>
    </div>
  </Paper>
{/if}
