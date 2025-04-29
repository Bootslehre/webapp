<script lang="ts">
  import Pin from '../components/icons/Pin.svelte';
  import List from '../components/List/List.svelte';
  import ListItem from '../components/List/ListItem.svelte';
  import Paper from '../components/Paper.svelte';
  import PaperTitle from '../components/PaperTitle.svelte';
  import Rating from '../components/Rating.svelte';
  import { aggregatorService } from '../stores/aggregation/aggregator.svelte';
  import { STRATEGY_QUERY_PARAM } from '../utils/constants';
  import ErrorMessage from '../components/ErrorMessage.svelte';

  const { class: className = '' }: { class?: string } = $props();
</script>

{#if aggregatorService.questionaire}
  <Paper class="bg-white p-6 {className}">
    <PaperTitle class="mb-2">{aggregatorService.questionaire.displayName}</PaperTitle>

    <p class="mb-4 text-justify">
      {aggregatorService.questionaire.description}
    </p>

    <List>
      <ListItem
        class="flex items-baseline justify-between gap-8"
        href="/licenses/{aggregatorService.questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=relevance"
      >
        Alle {aggregatorService.questionaire.questions.length} Fragen üben
      </ListItem>

      {#if aggregatorService.questionaireStats?.pinnedQuestions}
        <ListItem
          class="flex items-baseline justify-between gap-8"
          href="/licenses/{aggregatorService.questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=pinned"
        >
          <span>{aggregatorService.questionaireStats.pinnedQuestions} markierte Fragen üben</span>
          <Pin />
        </ListItem>
      {/if}

      {#if aggregatorService.questionaireStats?.incorrectlyAnsweredQuestions}
        <ListItem
          class="flex items-baseline justify-between gap-8"
          href="/licenses/{aggregatorService.questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=incorrect"
        >
          <span>{aggregatorService.questionaireStats.incorrectlyAnsweredQuestions} falsch beantwortete Fragen üben</span>
          <Rating progress={0} />
        </ListItem>
      {/if}
    </List>
  </Paper>
{:else}
  <ErrorMessage>Questionaire not defined</ErrorMessage>
{/if}
