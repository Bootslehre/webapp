<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '../../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../../components/icons/ChevronLeft.svelte';
  import Progress from '../../../../components/Progress.svelte';
  import QuestionCard from '../../../../components/QuestionCard.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../../stores/constants';
  import type { NextQuestionStrategies } from '../../../../utils/nextQuestionStrategy';
  import { QUESTIONAIRES } from '../../../../utils/questionaires';

  let questionaireId = $derived(page.params.listId);
  let questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));

  let questionId = $derived(page.params.questionId);
  let question = $derived(questionaire?.questions.find((q) => q.id === questionId));

  const strategy = $derived(page.url.searchParams.get(STRATEGY_QUERY_PARAM) as NextQuestionStrategies | undefined);

  let previousQuestions = $state<string[]>([]);

  let hasPreviousQuestion = $derived.by(() => {
    const currentIndex = previousQuestions.findIndex((id) => id === questionId);
    return currentIndex !== -1 && currentIndex > 0;
  });

  afterNavigate((nav) => {
    if (nav.to?.params?.questionId) {
      previousQuestions.push(nav.to.params.questionId);
    }
  });
</script>

{#snippet chevronIcon()}
  <ChevronLeft size="lg" />
{/snippet}

<div class="mb-2 flex w-full items-center justify-between">
  <Button
    data-testid="back-button"
    href="/lists/{questionaireId}"
    variant="text"
    size="sm"
    iconLeft={chevronIcon}>Zurück</Button
  >

  {#if questionaire}
    <Progress {questionaire} />
  {/if}
</div>

<div>
  {#if questionaire && question}
    <QuestionCard
      {questionaire}
      {question}
      strategy={strategy || 'relevance'}
      {hasPreviousQuestion}
    />
  {:else}
    Not Found :/
  {/if}
</div>
