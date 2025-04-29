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
