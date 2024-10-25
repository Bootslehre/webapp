<script lang="ts">
  import type { Answer, Question, Questionaire } from '../types';
  import { getNextQuestion } from '../utils/getRandomQuestion';
  import { shuffle } from '../utils/shuffle';
  import Button from './Button.svelte';

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

<div>
  <Button
    label="Back"
    on:click={goBack}
  />
  <Button
    label="Pin"
    on:click={pinQuestion}
  />
  <Button
    label="Next question"
    on:click={nextQuestion}
  />
</div>

{#if question}
  <div class="p-6 max-w-xl">
    <h2 class="text-l mb-4">{question?.text}</h2>
    {#if question.media.length}
      <div class="flex flex-row align-center justify-center gap-2 p-6">
        {#each question.media as media}
          <img
            src={`../../generated/${questionaire.id}/${media.fileName}`}
            alt={media.alt}
            title={media.title}
          />
        {/each}
      </div>
    {/if}
    <ul class="list-decimal border divide-y rounded-md overflow-hidden">
      {#each shuffledAnswers as answer, index}
        <ol>
          <button
            class="text-sm p-6 w-full text-left
                {selectedAnswerIndex !== undefined && answer.isCorrect ? 'bg-green-400' : undefined}
                {index === selectedAnswerIndex && !answer.isCorrect ? 'bg-red-400' : undefined}"
            on:click={() => (selectedAnswerIndex === undefined ? selectAnswer(index) : nextQuestion())}>{answer.text}</button
          >
        </ol>
      {/each}
    </ul>
    <div class="text-sm">Nummer {question.id}</div>
  </div>
{/if}
