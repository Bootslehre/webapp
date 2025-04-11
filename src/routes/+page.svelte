<script lang="ts">
  import { SBF_BINNEN_BASIS, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH, SBF_BINNEN_SEGEL } from '../../static/generated';
  import QuestionaireComponent from '../components/QuestionaireComponent.svelte';
  import type { Questionaire } from '../types';

  const all = [SBF_BINNEN_BASIS, SBF_BINNEN_SEGEL, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH, SBF_BINNEN_SEGEL];
  let questionaire: Questionaire = all[0];

  function selectQuestionaire(id: string) {
    questionaire = all.find((a) => a.id === id)!;
  }
</script>

<div class="p-6">
  <div class="max-w-xs">
    <label
      for="countries"
      class="mb-1 block text-sm font-medium text-gray-900 dark:text-white">Schein wählen</label
    >
    <select
      id="countries"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      on:change={(event) => selectQuestionaire(event.target.value)}
    >
      {#each all as q}
        <option>{q.id}</option>
      {/each}
    </select>
  </div>
</div>

<QuestionaireComponent {questionaire} />
