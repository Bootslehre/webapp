<script lang="ts">
  import { onMount } from 'svelte';
  import { SBF } from '../../generated';
  import Button from '../components/Button.svelte';
  import type { Answer, Question, Questionaire } from '../types';
  import { getRandomQuestion } from '../utils/getRandomQuestion';
  import { shuffle } from '../utils/shuffle';

  let questionaire: Questionaire = SBF;
  let question: Question | undefined;
  let shuffledAnswers: Array<Answer> = [];
  let selectedAnswerIndex: number | undefined;

  function next() {
    selectedAnswerIndex = undefined;
    question = getRandomQuestion();
    shuffledAnswers = [...question.answers];
    shuffle(shuffledAnswers);
  }

  function pin() {}

  function back() {}

  function selectAnswer(index: number) {
    selectedAnswerIndex = index;
  }

  onMount(() => {
    next();
  });
</script>

<h1 class="text-2xl mb-4">Sail</h1>

<div>
  <Button label="Back" on:click={back} />
  <Button label="Pin" on:click={pin} />
  <Button label="Next question" on:click={next} />
</div>

{#if question}
  <div class="p-6">
    <h2 class="text-l mb-4">{question?.text}</h2>
    {#each question.media as media}
      <img src={`../../generated/${questionaire.id}/${media.fileName}`} alt={media.alt} title={media.title} />
    {/each}
    <ul class="list-decimal border divide-y">
      {#each shuffledAnswers as answer, index}
        <ol>
          <button
            class="text-sm p-6 w-full text-left
              {selectedAnswerIndex !== undefined && answer.isCorrect ? 'bg-green-400' : undefined}
              {index === selectedAnswerIndex && !answer.isCorrect ? 'bg-red-400' : undefined}"
            on:click={() => selectAnswer(index)}>{answer.text}</button
          >
        </ol>
      {/each}
    </ul>
    <div class="text-sm">Nummer {question.id}</div>
  </div>
{/if}
