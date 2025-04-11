<script lang="ts">
  import { page } from '$app/state';
  import QuestionCard from '../../../../components/QuestionCard.svelte';
  import { QUESTIONAIRES } from '../../../../utils/questionaires';

  let questionaireId = $derived(page.params.listId);
  let questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));

  let questionId = $derived(page.params.questionId);
  let question = $derived(questionaire?.questions.find((q) => q.id === questionId));
</script>

<div class="flex flex-col gap-4">
  <a href="/lists/{questionaireId}">Back</a>

  <div>
    {#if questionaire && question}
      <QuestionCard
        {questionaire}
        {question}
      />
    {:else}
      Not Found :/
    {/if}
  </div>
</div>
