<script lang="ts">
  import { statsService } from '../stores/stats.svelte';
  import type { Question, Questionaire } from '../types';
  import { goToNextQuestion } from '../utils/getRandomQuestion';
  import { shuffle } from '../utils/shuffle';
  import Button from './Button.svelte';
  import QuestionMarkCircle from './icons/QuestionMarkCircle.svelte';
  import Paper from './Paper.svelte';

  let {
    questionaire,
    question,
  }: {
    questionaire: Questionaire;
    question: Question;
  } = $props();

  let selectedAnswerIndex = $state<number | undefined>(undefined);
  let shuffledAnswers = $derived(shuffle(question.answers));
  let stats = $derived(statsService.getQuestionStats(questionaire.id, question.id));

  function nextQuestion() {
    selectedAnswerIndex = undefined;
    goToNextQuestion(questionaire.id);
  }

  function skipQuestion() {
    statsService.setQuestionStats(questionaire.id, question.id, { ...stats, skip: stats.skip + 1 });
    nextQuestion();
  }

  function answerQuestion(index: number) {
    selectedAnswerIndex = index;

    if (shuffledAnswers[index].isCorrect) {
      statsService.setQuestionStats(questionaire.id, question.id, { ...stats, correct: stats.correct + 1 });
    } else {
      statsService.setQuestionStats(questionaire.id, question.id, { ...stats, incorrect: stats.incorrect + 1 });
    }
  }

  function goBack() {
    selectedAnswerIndex = undefined;
    history.back();
  }

  function togglePinned() {
    statsService.setQuestionStats(questionaire.id, question.id, { ...stats, pinned: !stats.pinned });
  }
</script>

<Paper class="divide-y divide-gray-200">
  <div class="p-5">
    <div class="flex items-start gap-3">
      <div class="pt-1 text-blue-600"><QuestionMarkCircle size="lg" /></div>
      <h2 class="text-xl font-medium text-blue-900">{question?.text}</h2>
    </div>

    {#if question.media.length}
      <div class="align-center mt-5 flex flex-row justify-center gap-2">
        {#each question.media as media}
          <img
            src={`../../generated/${questionaire.id}/${media.fileName}`}
            alt={media.alt}
            title={media.title}
          />
        {/each}
      </div>
    {/if}
  </div>

  <div class="bg-white p-6">
    <div class="space-y-4">
      {#each shuffledAnswers as answer, index}
        <button
          class="w-full cursor-pointer rounded-md border border-gray-200 p-4 text-left text-sm font-medium transition-colors
                {selectedAnswerIndex === undefined ? 'hover:border-sky-200 hover:bg-sky-50' : undefined}
                {selectedAnswerIndex !== undefined && answer.isCorrect ? 'border-green-400 bg-green-300' : undefined}
                {index === selectedAnswerIndex && !answer.isCorrect ? 'border-red-400 bg-red-300' : undefined}"
          onclick={() => (selectedAnswerIndex === undefined ? answerQuestion(index) : nextQuestion())}>{answer.text}</button
        >
      {/each}
    </div>
  </div>

  <div class="bg-white p-4">
    <div class="flex w-full justify-between gap-4">
      <Button
        label="Previous"
        variant="secondary"
        onclick={goBack}
      />
      <div class="flex gap-4">
        <Button
          label={stats.pinned ? 'Unpin' : 'Pin'}
          variant="tertiary"
          onclick={() => togglePinned()}
        />
        {#if selectedAnswerIndex === undefined}
          <Button
            label="Skip"
            variant="secondary"
            onclick={() => skipQuestion()}
          />
        {:else}
          <Button
            label="Weiter"
            onclick={nextQuestion}
          />
        {/if}
      </div>
    </div>
  </div>
</Paper>
