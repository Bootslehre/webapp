<script lang="ts">
  import { statsService } from '../stores/stats.svelte';
  import type { Question, Questionaire } from '../types';
  import { goToNextQuestion } from '../utils/nextQuestion';
  import { shuffle } from '../utils/shuffle';
  import Button from './Button/Button.svelte';
  import IconButton from './Button/IconButton.svelte';
  import Pin from './icons/Pin.svelte';
  import QuestionMarkCircle from './icons/QuestionMarkCircle.svelte';
  import Paper from './Paper.svelte';
  import Rating from './Rating.svelte';

  let {
    questionaire,
    question,
    hasPreviousQuestion,
  }: {
    questionaire: Questionaire;
    question: Question;
    hasPreviousQuestion: boolean;
  } = $props();

  let selectedAnswerIndex = $state<number | undefined>(undefined);
  let shuffledAnswers = $derived(shuffle(question.answers));
  let stats = $derived(statsService.getQuestionStats(questionaire.id, question.id));

  function nextQuestion() {
    selectedAnswerIndex = undefined;
    goToNextQuestion(questionaire.id, question.id);
  }

  function skipQuestion() {
    nextQuestion();
  }

  function answerQuestion(index: number) {
    selectedAnswerIndex = index;

    if (shuffledAnswers[index].isCorrect) {
      statsService.registerCorrectAnswer(questionaire.id, question.id);
    } else {
      statsService.registerWrongAnswer(questionaire.id, question.id);
    }
  }

  function goBack() {
    selectedAnswerIndex = undefined;
    history.back();
  }

  function togglePinned() {
    statsService.toggleQuestionPinned(questionaire.id, question.id);
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
            src={`../../generated/${questionaire.id}/${media.fileName}`}
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
      onclick={() => togglePinned()}><Pin size="lg" /></IconButton
    >
  </div>

  <div class=" p-6">
    <div class="min-h-[360px] space-y-4">
      {#each shuffledAnswers as answer, index (answer.text)}
        {#key answer.text}
          <button
            class="w-full cursor-pointer rounded-md border border-slate-200 p-4 text-left text-sm font-medium text-pretty transition-colors
                {selectedAnswerIndex === undefined ? 'hover:border-blue-200 hover:bg-blue-50' : undefined}
                {selectedAnswerIndex !== undefined && answer.isCorrect ? 'text-500 border-green-400 bg-green-300 text-green-950' : undefined}
                {index === selectedAnswerIndex && !answer.isCorrect ? 'border-red-400 bg-red-300 text-red-950' : undefined}"
            onclick={() => (selectedAnswerIndex === undefined ? answerQuestion(index) : nextQuestion())}>{answer.text}</button
          >
        {/key}
      {/each}
    </div>
  </div>

  <div class=" p-4">
    <div class="flex w-full items-center justify-between gap-4">
      <div class="flex-1 self-start">
        {#if hasPreviousQuestion}
          <Button
            variant="text"
            onclick={goBack}>Vorherige</Button
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
            onclick={() => skipQuestion()}>Überspringen</Button
          >
        {:else}
          <Button onclick={nextQuestion}>Weiter</Button>
        {/if}
      </div>
    </div>
  </div>
</Paper>
