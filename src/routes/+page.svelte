<script lang="ts">
  import { SBF_BINNEN_BASIS, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH, SBF_BINNEN_SEGEL } from '../../generated';
  import QuestionaireComponent from '../components/QuestionaireComponent.svelte';
  import type { Questionaire } from '../types';

  const all = [SBF_BINNEN_BASIS, SBF_BINNEN_SEGEL, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH, SBF_BINNEN_SEGEL];
  let questionaire: Questionaire = all[0];

  function selectQuestionaire(id: string) {
    questionaire = all.find((a) => a.id === id)!;
  }
</script>

<div class="p-6">
  <h1 class="text-lg">Schein wählen</h1>

  <select on:change={(event) => selectQuestionaire(event.target.value)}>
    {#each all as q}
      <option>{q.id}</option>
    {/each}
  </select>
</div>

<QuestionaireComponent {questionaire} />
