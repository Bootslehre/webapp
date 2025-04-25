<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Button from '../../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../../components/icons/ChevronLeft.svelte';
  import QuestionCard from '../../../../components/QuestionCard.svelte';
  import { QUESTIONAIRES } from '../../../../utils/questionaires';

  let questionaireId = $derived(page.params.listId);
  let questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));

  let questionId = $derived(page.params.questionId);
  let question = $derived(questionaire?.questions.find((q) => q.id === questionId));
</script>

<div class="flex flex-col items-start gap-2">
  {#snippet chevronIcon()}
    <ChevronLeft size="lg" />
  {/snippet}

  <Button
    href="{base}/lists/{questionaireId}"
    variant="text"
    size="sm"
    iconLeft={chevronIcon}>Zurück</Button
  >

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
