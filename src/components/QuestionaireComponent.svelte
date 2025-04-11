<script lang="ts">
  import type { Answer, Question, Questionaire } from '../types';
  import { getNextQuestion } from '../utils/getRandomQuestion';
  import { shuffle } from '../utils/shuffle';
  import Button from './Button.svelte';
  import Anchor from './icons/Anchor.svelte';
  import ArrowLeft from './icons/ArrowLeft.svelte';
  import QuestionMarkCircle from './icons/QuestionMarkCircle.svelte';

  export let questionaire: Questionaire;
  let question: Question | undefined;
  let shuffledAnswers: Array<Answer> = [];
  let selectedAnswerIndex: number | undefined;

  function nextQuestion() {
    selectedAnswerIndex = undefined;
    question = getNextQuestion(questionaire);
    shuffledAnswers = [...question.answers];
    shuffle(shuffledAnswers);
  }

  function skip() {
    nextQuestion();
  }

  function pinQuestion() {}

  function goBack() {}

  function selectAnswer(index: number) {
    selectedAnswerIndex = index;
  }

  $: handleChange(questionaire);

  function handleChange(_value: Questionaire) {
    nextQuestion();
  }
</script>

<div class="mx-auto max-w-xl">
  {#if question}
    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 shadow-md">
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
              on:click={() => (selectedAnswerIndex === undefined ? selectAnswer(index) : nextQuestion())}>{answer.text}</button
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
              label="Pin"
              variant="tertiary"
              onclick={pinQuestion}
            />
            {#if selectedAnswerIndex === undefined}
              <Button
                label="Skip"
                variant="secondary"
                onclick={skip}
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
    </div>

    <div class="flex w-full justify-between px-4 py-2">
      <div class="text-xs font-semibold text-sky-700">Nummer {question.id}</div>
      <div class="text-xs font-semibold text-sky-700">{questionaire.questions.length} Fragen</div>
    </div>
  {/if}
</div>
