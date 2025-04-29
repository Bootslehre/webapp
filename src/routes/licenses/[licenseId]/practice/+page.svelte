<script lang="ts">
  import Progress from '../../../../views/Progress.svelte';
  import QuestionCard from '../../../../views/QuestionCard.svelte';
  import SummaryPaper from '../../../../views/SummaryPaper.svelte';
  import BackButton from '../../../../components/BackButton.svelte';
  import ErrorMessage from '../../../../components/ErrorMessage.svelte';
  import { aggregatorService } from '../../../../stores/aggregation/aggregator.svelte';
  import { questionaireService } from '../../../../stores/questionaire.svelte';
  import { statsService } from '../../../../stores/stats.svelte';
  import { applyStrategy } from '../../../../utils/applyStrategy';

  const strategy = $derived(aggregatorService.strategy);
  const questionaire = $derived(aggregatorService.questionaire);
  const questions = $derived(questionaire ? applyStrategy(strategy, questionaire) : []); // todo handle 404 gracefully

  // todo is this really a problem?!?!?
  // svelte-ignore state_referenced_locally
  questionaireService.initialize(questions);

  const question = $derived(questionaireService.currentQuestion);
  const hasPreviousQuestion = $derived(Boolean(questionaireService.previousQuestion));
  const hasNextQuestion = $derived(Boolean(questionaireService.nextQuestion));
</script>

{#if questionaire}
  <div class="mb-1 flex w-full items-center justify-between">
    <BackButton href="/licenses/{questionaire.id}">Zurück</BackButton>
    <Progress />
  </div>

  {#if question}
    {#key question.id}
      <QuestionCard
        licenseId={questionaire.id}
        {question}
        {hasPreviousQuestion}
        {hasNextQuestion}
        onNextQuestionClick={questionaireService.next}
        onPreviousQuestionClick={questionaireService.previous}
        onPinClick={() => statsService.toggleQuestionPinned(questionaire.id, question.id)}
      />
    {/key}
  {:else if hasPreviousQuestion}
    <SummaryPaper
      {questionaire}
      questions={questionaireService.questions}
    />
  {:else}
    <ErrorMessage>No question</ErrorMessage>
  {/if}
{/if}
