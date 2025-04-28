<script lang="ts">
  import { page } from '$app/state';
  import BackButton from '../../../../components/BackButton.svelte';
  import Progress from '../../../../components/Progress.svelte';
  import QuestionCard from '../../../../components/QuestionCard.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../../stores/constants';
  import { questionaireService } from '../../../../stores/questionaire.svelte';
  import { statsService } from '../../../../stores/stats.svelte';
  import { getQuestionaireBySlug } from '../../../../utils/questionaires';
  import SummaryPaper from '../SummaryPaper.svelte';
  import { applyStrategy, type NextQuestionStrategies } from './applyStrategy';

  const strategy = $derived((page.url.searchParams.get(STRATEGY_QUERY_PARAM) || 'relevance') as NextQuestionStrategies);

  let questionaireSlug = $derived(page.params.questionaireSlug);
  let questionaire = $derived(getQuestionaireBySlug(page.params.questionaireSlug));
  let questions = $derived(questionaire ? applyStrategy(strategy, questionaire) : []); // todo handle 404 gracefully

  // todo is this really a problem?!?!?
  // svelte-ignore state_referenced_locally
  questionaireService.initialize(questions);

  let question = $derived(questionaireService.currentQuestion);
  let hasPreviousQuestion = $derived(Boolean(questionaireService.previousQuestion));
  let hasNextQuestion = $derived(Boolean(questionaireService.nextQuestion));
</script>

<div class="mb-2 flex w-full items-center justify-between">
  <BackButton href="/lists/{questionaireSlug}">Zurück</BackButton>

  {#if questionaire}
    <Progress {questionaire} />
  {/if}
</div>

<div>
  {#if questionaire && question}
    {#key question.id}
      <QuestionCard
        questionaireId={questionaire.id}
        {question}
        {hasPreviousQuestion}
        {hasNextQuestion}
        onNextQuestionClick={questionaireService.next}
        onPreviousQuestionClick={questionaireService.previous}
        onPinClick={() => statsService.toggleQuestionPinned(questionaire.id, question.id)}
      />
    {/key}
  {:else if hasPreviousQuestion && questionaire}
    <SummaryPaper
      {questionaire}
      questions={questionaireService.questions}
    />
  {:else}
    Not Found :/
  {/if}
</div>
