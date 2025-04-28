<script lang="ts">
  import { page } from '$app/state';
  import BackButton from '../../../components/BackButton.svelte';
  import Pin from '../../../components/icons/Pin.svelte';
  import List from '../../../components/List/List.svelte';
  import ListItem from '../../../components/List/ListItem.svelte';
  import Paper from '../../../components/Paper.svelte';
  import Progress from '../../../components/Progress.svelte';
  import Rating from '../../../components/Rating.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../stores/constants';
  import { statsService } from '../../../stores/stats.svelte';
  import { getQuestionaireBySlug } from '../../../utils/questionaires';

  const questionaire = $derived(getQuestionaireBySlug(page.params.questionaireSlug));
  const pinnedQuestions = $derived(questionaire && statsService.getPinnedQuestionIds(questionaire.id).length);

  const stats = $derived((questionaire && statsService.getQuestionaireStatsSnapshot(questionaire.id)) || {});
  const incorrectlyAnsweredQuestions = $derived(Object.keys(stats).filter((qId) => stats[qId].progress === 0).length);
</script>

{#if questionaire}
  <div class="mb-2 flex w-full items-center justify-between">
    <BackButton href="/lists">Zurück</BackButton>
    <Progress {questionaire} />
  </div>

  <Paper class="flex flex-col items-start gap-4 bg-white p-6">
    <h1 class="text-lg font-semibold">
      {questionaire.displayName}
    </h1>

    <p class="text-justify">
      {questionaire.description}
    </p>

    <List>
      <ListItem
        class="flex items-baseline justify-between gap-8"
        href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=relevance"
      >
        Alle {questionaire?.questions?.length} Fragen üben
      </ListItem>

      {#if pinnedQuestions}
        <ListItem
          class="flex items-baseline justify-between gap-8"
          href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=pinned"
        >
          <span>{pinnedQuestions} markierte Fragen üben</span>
          <Pin />
        </ListItem>
      {/if}

      {#if incorrectlyAnsweredQuestions}
        <ListItem
          class="flex items-baseline justify-between gap-8"
          href="/lists/{questionaire.slug}/practice?{STRATEGY_QUERY_PARAM}=incorrect"
        >
          <span>{incorrectlyAnsweredQuestions} falsch beantwortete Fragen üben</span>
          <Rating progress={0} />
        </ListItem>
      {/if}
    </List>
  </Paper>
{/if}
