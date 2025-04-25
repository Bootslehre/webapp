<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Button from '../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../components/icons/ChevronLeft.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Progress from '../../../components/Progress.svelte';
  import { statsService } from '../../../stores/stats.svelte';
  import { goToNextQuestion } from '../../../utils/nextQuestion';
  import { questionaireNameMap, QUESTIONAIRES } from '../../../utils/questionaires';

  const questionaireId = $derived(page.params.listId);
  const questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));

  function start() {
    goToNextQuestion(questionaireId);
  }

  function resetProgress() {
    statsService.resetQuestionaireStats(questionaireId);
  }
</script>

{#snippet chevronIcon()}
  <ChevronLeft size="lg" />
{/snippet}

<div class="mb-2 flex w-full items-center justify-between">
  <Button
    href="{base}/lists"
    data-testid="back-button"
    variant="text"
    size="sm"
    iconLeft={chevronIcon}>Zurück</Button
  >
  {#if questionaire}
    <Progress {questionaire} />
  {/if}
</div>


<Paper class="flex flex-col items-start gap-4 bg-white p-6">
  <h1 class="flex w-full items-center justify-between text-lg font-semibold">
    <span class="flex flex-col">
      <span>{questionaireNameMap[questionaireId]}</span>
      <div class="flex gap-2 text-slate-500">
        <span class="text-xs">{questionaire?.questions?.length} Fragen</span>
        <span class="text-xs">({statsService.getPinnedQuestionIds(questionaireId).length} markiert)</span>
      </div>
    </span>
  </h1>

  <p class="text-justify">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maxime ab corrupti delectus perferendis doloremque natus consequatur. Rem, quaerat voluptas nobis autem
    blanditiis doloremque, eaque, reprehenderit aperiam minima animi non.
  </p>

  <div class="flex w-full justify-between">
    <Button
      variant="textDestructive"
      onclick={resetProgress}>Lernstand zurücksetzen</Button
    >

    <Button onclick={start}>Üben</Button>
  </div>
</Paper>
