<script lang="ts">
  import Rating from '../components/Rating.svelte';

  let {
    class: className = '',
    noProgress,
    progress0,
    progress1,
    progress2,
    progress3,
    progress4,
    progress5,
  }: {
    class?: string;
    noProgress: number;
    progress0: number;
    progress1: number;
    progress2: number;
    progress3: number;
    progress4: number;
    progress5: number;
  } = $props();
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
