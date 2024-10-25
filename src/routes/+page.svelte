<script lang="ts">
  import { SBF, SBF_BINNEN, SBF_BINNEN_SEGEL } from '../../generated';
  import QuestionaireComponent from '../components/QuestionaireComponent.svelte';
  import type { Questionaire } from '../types';

  let questionaire: Questionaire = SBF;
  const all = [SBF, SBF_BINNEN, SBF_BINNEN_SEGEL];

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
