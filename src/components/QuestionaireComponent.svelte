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
    <div class="border rounded-lg divide-y overflow-hidden shadow-md">
      <div class="p-5">
        <div class="flex gap-3 items-start">
          <div class="text-blue-600 pt-1"><QuestionMarkCircle size="lg" /></div>
          <h2 class="text-xl font-medium text-blue-900">{question?.text}</h2>
        </div>

        {#if question.media.length}
          <div class="flex flex-row align-center justify-center gap-2 mt-5">
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

      <div class="p-6 bg-white">
        <div class="space-y-4">
          {#each shuffledAnswers as answer, index}
            <button
              class="text-sm p-4 w-full text-left border rounded-md transition-colors font-medium
                {selectedAnswerIndex === undefined ? 'hover:bg-sky-50 hover:border-sky-200' : undefined}
                {selectedAnswerIndex !== undefined && answer.isCorrect ? 'bg-green-300 border-green-400' : undefined}
                {index === selectedAnswerIndex && !answer.isCorrect ? 'bg-red-300 border-red-400' : undefined}"
              on:click={() => (selectedAnswerIndex === undefined ? selectAnswer(index) : nextQuestion())}>{answer.text}</button
            >
          {/each}
        </div>
      </div>

      <div class="bg-white p-4">
        <div class="flex justify-between w-full gap-4">
          <Button
            label="Previous"
            variant="secondary"
            on:click={goBack}
          />
          <div class="flex gap-4">
            <Button
              label="Pin"
              variant="tertiary"
              on:click={pinQuestion}
            />
            {#if selectedAnswerIndex === undefined}
              <Button
                label="Skip"
                variant="secondary"
                on:click={skip}
              />
            {:else}
              <Button
                label="Weiter"
                on:click={nextQuestion}
              />
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between w-full py-2 px-4">
      <div class="text-xs text-sky-700 font-semibold">Nummer {question.id}</div>
      <div class="text-xs text-sky-700 font-semibold">{questionaire.questions.length} Fragen</div>
    </div>
  {/if}
</div>
