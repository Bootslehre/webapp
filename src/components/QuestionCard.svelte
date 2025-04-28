<script lang="ts">
  import { statsService } from '../stores/stats.svelte';
  import type { Answer, Question } from '../types';
  import { shuffle } from '../utils/shuffle';
  import Button from './Button/Button.svelte';
  import IconButton from './Button/IconButton.svelte';
  import Pin from './icons/Pin.svelte';
  import QuestionMarkCircle from './icons/QuestionMarkCircle.svelte';
  import List from './List/List.svelte';
  import ListItem from './List/ListItem.svelte';
  import type { ListItemVariant } from './List/types';
  import Paper from './Paper.svelte';
  import Rating from './Rating.svelte';

  let {
    questionaireId,
    question,
    hasPreviousQuestion,
    hasNextQuestion,
    onNextQuestionClick,
    onPreviousQuestionClick,
    onPinClick,
  }: {
    questionaireId: string;
    question: Question;
    hasPreviousQuestion: boolean;
    hasNextQuestion: boolean;
    onNextQuestionClick: () => void;
    onPreviousQuestionClick: () => void;
    onPinClick: () => void;
  } = $props();

  let selectedAnswerIndex = $state<number | undefined>(undefined);
  let shuffledAnswers = $derived(shuffle(question.answers));
  let stats = $derived(statsService.getQuestionStats(questionaireId, question.id));

  function answerQuestion(index: number) {
    selectedAnswerIndex = index;

    if (shuffledAnswers[index].isCorrect) {
      statsService.registerCorrectAnswer(questionaireId, question.id);
    } else {
      statsService.registerWrongAnswer(questionaireId, question.id);
    }
  }

  function getVariant(answer: Answer, index: number): ListItemVariant {
    if (selectedAnswerIndex !== undefined) {
      if (answer.isCorrect) {
        return 'success';
      } else if (index === selectedAnswerIndex) {
        return 'error';
      }
    }

    return 'info';
  }
</script>

<Paper class="divide-y divide-slate-200 bg-white">
  <div class="relative min-h-[100px] rounded-t-lg bg-blue-100 p-5">
    <div class="flex items-start gap-3">
      <div class="pt-1 text-blue-600"><QuestionMarkCircle size="lg" /></div>
      <h2 class="text-xl font-medium text-pretty text-blue-900">{question?.text}</h2>
    </div>

    {#if question.media.length}
      <div class="align-center mt-5 flex flex-row justify-center gap-2">
        {#each question.media as media (media.src)}
          <img
            class="pointer-events-none select-none"
            src={`../../generated/${questionaireId}/${media.fileName}`}
            alt={media.alt}
            title={media.title}
          />
        {/each}
      </div>
    {/if}

    <IconButton
      label={stats?.pinned ? 'Unpin' : 'Pin'}
      class="absolute right-0 bottom-0 translate-x-[50%] translate-y-[50%] shadow-lg"
      variant={stats?.pinned ? 'filled' : 'white'}
      onclick={onPinClick}><Pin size="lg" /></IconButton
    >
  </div>

  <div class="p-6">
    <List class="min-h-[360px]">
      {#each shuffledAnswers as answer, index (answer.text)}
        {#key answer.text}
          <ListItem
            variant={getVariant(answer, index)}
            onclick={() => (selectedAnswerIndex === undefined ? answerQuestion(index) : onNextQuestionClick())}>{answer.text}</ListItem
          >
        {/key}
      {/each}
    </List>
  </div>

  <div class="p-4">
    <div class="flex w-full items-center justify-between gap-4">
      <div class="flex-1 self-start">
        {#if hasPreviousQuestion}
          <Button
            variant="text"
            onclick={onPreviousQuestionClick}>Vorherige</Button
          >
        {/if}
      </div>

      {#key question.id}
        <Rating progress={stats?.progress} />
      {/key}

      <div class="flex flex-1 justify-end">
        {#if selectedAnswerIndex === undefined}
          <Button
            variant="text"
            onclick={onNextQuestionClick}>{hasNextQuestion ? 'Überspringen' : 'Beenden'}</Button
          >
        {:else}
          <Button onclick={onNextQuestionClick}>Weiter</Button>
        {/if}
      </div>
    </div>
  </div>
</Paper>
