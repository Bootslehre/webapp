<script lang="ts">
  import { statsService } from '../stores/stats.svelte';
  import type { EnrichedQuestionaire } from '../utils/questionaires';
  import Rating from './Rating.svelte';

  let {
    class: className = '',
    questionaire,
  }: {
    class?: string;
    questionaire: EnrichedQuestionaire;
  } = $props();

  const stats = $derived(statsService.getQuestionaireStatsSnapshot(questionaire.id));

  const noProgress = $derived((questionaire?.questions.length || 0) - Object.keys(stats).length);
  const progress0 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 0).length);
  const progress1 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 1).length);
  const progress2 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 2).length);
  const progress3 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 3).length);
  const progress4 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 4).length);
  const progress5 = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 5).length);
</script>

<table class="text-sm {className}">
  <thead>
    <tr>
      <th class="cell border-b border-stone-300 text-right font-semibold text-stone-600">Fragen</th>
      <th class="cell border-b border-stone-300 text-left font-semibold text-stone-600">Fortschritt</th>
      <th class="cell border-b border-stone-300 text-left font-semibold text-stone-600">Erklärung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="cell text-right">{progress5}</td>
      <td class="cell"><Rating progress={5} /></td>
      <td class="cell text-stone-700">5 mal richtig beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{progress4}</td>
      <td class="cell"><Rating progress={4} /></td>
      <td class="cell text-stone-700">4 mal richtig beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{progress3}</td>
      <td class="cell"><Rating progress={3} /></td>
      <td class="cell text-stone-700">3 mal richtig beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{progress2}</td>
      <td class="cell"><Rating progress={2} /></td>
      <td class="cell text-stone-700">2 mal richtig beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{progress1}</td>
      <td class="cell"><Rating progress={1} /></td>
      <td class="cell text-stone-700">1 mal richtig beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{noProgress}</td>
      <td class="cell"><Rating progress={undefined} /></td>
      <td class="cell text-stone-700">Noch nicht beantwortet</td>
    </tr>
    <tr>
      <td class="cell text-right">{progress0}</td>
      <td class="cell"><Rating progress={0} /></td>
      <td class="cell text-stone-700">Zuletzt falsch beantwortet</td>
    </tr>
  </tbody>
</table>

<style lang="postcss">
  @reference "tailwindcss";

  .cell {
    @apply px-5 py-0.5;
    justify-items: left;
  }
</style>
