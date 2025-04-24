<script lang="ts">
  import { page } from '$app/state';
  import Button from '../../../../components/Button.svelte';
  import ChevronLeft from '../../../../components/icons/ChevronLeft.svelte';
  import QuestionCard from '../../../../components/QuestionCard.svelte';
  import { QUESTIONAIRES } from '../../../../utils/questionaires';

  let questionaireId = $derived(page.params.listId);
  let questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));

  let questionId = $derived(page.params.questionId);
  let question = $derived(questionaire?.questions.find((q) => q.id === questionId));
</script>

<div class="flex flex-col items-start gap-4">
  {#snippet chevronIcon()}
    <ChevronLeft size="lg" />
  {/snippet}

  <Button
    href="/lists/{questionaireId}"
    label="Zurück"
    variant="tertiary"
    size="sm"
    iconLeft={chevronIcon}
  />

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
