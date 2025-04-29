<script lang="ts">
  import { page } from '$app/state';
  import Progress from '../../../../bsComponents/Progress.svelte';
  import QuestionCard from '../../../../bsComponents/QuestionCard.svelte';
  import SummaryPaper from '../../../../bsComponents/SummaryPaper.svelte';
  import BackButton from '../../../../components/BackButton.svelte';
  import { aggregatorService } from '../../../../stores/aggregation/aggregator.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../../stores/constants';
  import { questionaireService } from '../../../../stores/questionaire.svelte';
  import { statsService } from '../../../../stores/stats.svelte';
  import { applyStrategy, type NextQuestionStrategies } from '../../../../utils/applyStrategy';

  const strategy = $derived((page.url.searchParams.get(STRATEGY_QUERY_PARAM) || 'relevance') as NextQuestionStrategies);
  const licenseVariant = $derived(aggregatorService.licenseVariant);
  const questions = $derived(licenseVariant ? applyStrategy(strategy, licenseVariant) : []); // todo handle 404 gracefully

  // todo is this really a problem?!?!?
  // svelte-ignore state_referenced_locally
  questionaireService.initialize(questions);

  const question = $derived(questionaireService.currentQuestion);
  const hasPreviousQuestion = $derived(Boolean(questionaireService.previousQuestion));
  const hasNextQuestion = $derived(Boolean(questionaireService.nextQuestion));
</script>

{#if licenseVariant}
  <div class="mb-1 flex w-full items-center justify-between">
    <BackButton href="/licenses/{licenseVariant.id}">Zurück</BackButton>
    <Progress />
  </div>

  <div>
    {#if question}
      {#key question.id}
        <QuestionCard
          licenseId={licenseVariant.id}
          {question}
          {hasPreviousQuestion}
          {hasNextQuestion}
          onNextQuestionClick={questionaireService.next}
          onPreviousQuestionClick={questionaireService.previous}
          onPinClick={() => statsService.toggleQuestionPinned(licenseVariant.id, question.id)}
        />
      {/key}
    {:else if hasPreviousQuestion && licenseVariant}
      <SummaryPaper
        questionaire={licenseVariant}
        questions={questionaireService.questions}
      />
    {:else}
      Error: No questionaire or question
    {/if}
  </div>
{/if}
