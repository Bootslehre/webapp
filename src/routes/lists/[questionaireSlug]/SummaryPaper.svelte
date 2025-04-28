<script lang="ts">
  import Button from '../../../components/Button/Button.svelte';
  import Paper from '../../../components/Paper.svelte';
  import { statsService } from '../../../stores/stats.svelte';
  import type { Question } from '../../../types';
  import { pluralize } from '../../../utils/pluralize';
  import type { EnrichedQuestionaire } from '../../../utils/questionaires';

  let {
    questions,
    questionaire,
  }: {
    questions: Question[];
    questionaire: EnrichedQuestionaire;
  } = $props();

  const stats = $derived(statsService.getQuestionaireStatsSnapshot(questionaire.id));

  const incorrectlyAnsweredQuestions = $derived(questions.reduce((acc, cur) => (stats?.[cur.id]?.progress === 0 ? acc + 1 : acc), 0));
  const unansweredQuestions = $derived(questions.reduce((acc, cur) => (stats?.[cur.id]?.progress === undefined ? acc + 1 : acc), 0));
  const correctlyAnsweredQuestions = $derived(questions.length - incorrectlyAnsweredQuestions - unansweredQuestions);

  function pluralizeFragen(count: number) {
    return pluralize(count, 'Frage', 'Fragen');
  }
</script>

<Paper class="bg-white p-6">
  <div class="mb-4 text-lg">Fertig!</div>

  <div class="mb-4 text-sm">
    Du hast {pluralizeFragen(correctlyAnsweredQuestions)} richtig, {pluralizeFragen(incorrectlyAnsweredQuestions)} falsch und {pluralizeFragen(unansweredQuestions)} nicht beantwortet.
  </div>

  <Button
    class="justify-self-end"
    href="/lists/{questionaire.slug}">Wiederholen</Button
  >
</Paper>
