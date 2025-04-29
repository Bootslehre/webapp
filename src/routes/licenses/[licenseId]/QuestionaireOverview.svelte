<script lang="ts">
  import List from '../../../components/List/List.svelte';
  import ListItem from '../../../components/List/ListItem.svelte';
  import Paper from '../../../components/Paper.svelte';
  import PaperTitle from '../../../components/PaperTitle.svelte';
  import { configService } from '../../../stores/config.svelte';
  import { STRATEGY_QUERY_PARAM } from '../../../stores/constants';
  import { getQuestionaire, type License } from '../../../utils/questionaires';

  let {
    class: className = '',
    license,
  }: {
    class?: string;
    license: License;
  } = $props();

  let config = $derived(configService.config);

  let questionaire = $derived.by(() => {
    if (license === 'sbf-see') {
      return getQuestionaire(config.sbfSee);
    }
  });
</script>

{#if questionaire}
  <Paper class="bg-white p-6 {className}">
    <PaperTitle class="mb-2">{questionaire.displayName}</PaperTitle>

    <p class="mb-4 text-justify">
      {questionaire.description}
    </p>

    <List>
      <ListItem
        class="flex items-baseline justify-between gap-8"
        href="/licenses/{questionaire.id}/practice?{STRATEGY_QUERY_PARAM}=relevance"
      >
        Alle {questionaire?.questions?.length} Fragen üben
      </ListItem>

      <!-- {#if pinnedQuestions}
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
      {/if} -->
    </List>
  </Paper>
{/if}
