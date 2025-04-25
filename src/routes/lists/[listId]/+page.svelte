<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Button from '../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../components/icons/ChevronLeft.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Rating from '../../../components/Rating.svelte';
  import { MAX_PROGESS } from '../../../stores/constants';
  import { statsService } from '../../../stores/stats.svelte';
  import { goToNextQuestion } from '../../../utils/nextQuestion';
  import { questionaireNameMap, QUESTIONAIRES } from '../../../utils/questionaires';

  const questionaireId = $derived(page.params.listId);
  const questionaire = $derived(QUESTIONAIRES.find((q) => q.id === questionaireId));
  const stats = $derived(statsService.getQuestionaireStatsSnapshot(questionaireId));

  const noProgress = $derived((questionaire?.questions.length || 0) - Object.keys(stats).length);
  const progress0 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 0).length);
  const progress1 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 1).length);
  const progress2 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 2).length);
  const progress3 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 3).length);
  const progress4 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 4).length);
  const progress5 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 5).length);

  const totalProgressPoints = $derived((questionaire?.questions.length || 0) * MAX_PROGESS);
  const achievedProgressPoints = $derived(Object.keys(stats).reduce((sum, cur) => sum + (stats[cur].progress || 0), 0));

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

<div class="flex flex-col items-start gap-2">
  <Button
    href="{base}/lists"
    variant="text"
    size="sm"
    iconLeft={chevronIcon}>Zurück</Button
  >

  <Paper class="flex flex-col items-start gap-4 bg-white p-6">
    <h1 class="flex w-full items-center justify-between text-lg font-semibold">
      <span class="flex flex-col">
        <span>{questionaireNameMap[questionaireId]}</span>
        <div class="flex gap-2 text-slate-500">
          <span class="text-xs">{questionaire?.questions?.length} Fragen</span>
          <span class="text-xs">({statsService.getPinnedQuestionIds(questionaireId).length} markiert)</span>
        </div>
      </span>

      <span class="text-sm font-semibold text-stone-500">
        {Math.round((achievedProgressPoints / totalProgressPoints) * 100)}% Fortschritt
      </span>
    </h1>

    <p class="text-justify">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maxime ab corrupti delectus perferendis doloremque natus consequatur. Rem, quaerat voluptas nobis autem
      blanditiis doloremque, eaque, reprehenderit aperiam minima animi non.
    </p>

    <table class="mx-auto my-8 w-[220px] text-sm">
      <thead>
        <tr>
          <th class="border-b border-stone-300 px-4 py-0.5 text-left font-semibold text-stone-600">Fortschritt</th>
          <th class="border-b border-stone-300 px-4 py-0.5 text-right font-semibold text-stone-600">Anzahl</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={undefined} /></td
          >
          <td class="px-4 py-0.5 text-right">{noProgress}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={0} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress0}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={1} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress1}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={2} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress2}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={3} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress3}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={4} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress4}</td>
        </tr>
        <tr>
          <td
            class="px-4 py-0.5"
            style="justify-items: left;"><Rating progress={5} /></td
          >
          <td class="px-4 py-0.5 text-right">{progress5}</td>
        </tr>
      </tbody>
    </table>

    <div></div>

    <div class="flex w-full justify-between">
      <Button
        variant="textDestructive"
        onclick={resetProgress}>Lernstand zurücksetzen</Button
      >

      <Button onclick={start}>Üben</Button>
    </div>
  </Paper>
</div>
