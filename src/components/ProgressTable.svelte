<script lang="ts">
  import { statsService } from '../stores/stats.svelte';
  import type { Questionaire } from '../types';
  import Rating from './Rating.svelte';

  let {
    class: className = '',
    questionaire,
  }: {
    class?: string;
    questionaire: Questionaire;
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
      <th class="border-b border-stone-300 px-5 py-0.5 text-right font-semibold text-stone-600">Fragen</th>
      <th class="border-b border-stone-300 px-5 py-0.5 text-left font-semibold text-stone-600">Fortschritt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-5 py-0.5 text-right">{noProgress}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={undefined} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress0}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={0} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress1}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={1} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress2}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={2} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress3}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={3} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress4}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={4} /></td
      >
    </tr>
    <tr>
      <td class="px-5 py-0.5 text-right">{progress5}</td>
      <td
        class="px-5 py-0.5"
        style="justify-items: left;"><Rating progress={5} /></td
      >
    </tr>
  </tbody>
</table>
