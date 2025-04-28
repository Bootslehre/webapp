<script lang="ts">
  import BackButton from '../../components/BackButton.svelte';
  import List from '../../components/List/List.svelte';
  import ListItem from '../../components/List/ListItem.svelte';
  import Paper from '../../components/Paper.svelte';
  import { statsService } from '../../stores/stats.svelte';
  import { QUESTIONAIRES } from '../../utils/questionaires';
</script>

<BackButton href="/">Zurück</BackButton>

<Paper class="bg-white p-6">
  <List>
    {#each QUESTIONAIRES as questionaire (questionaire.id)}
      <ListItem
        class="flex items-baseline"
        href="/lists/{questionaire.slug}"
      >
        <span class="mr-auto">{questionaire.displayName}</span>
        <span class="ml-8 text-xs text-slate-500">{questionaire.questions.length} Fragen</span>
        <span class="ml-2 text-xs text-slate-500">({statsService.getPinnedQuestionIds(questionaire.id).length} markiert)</span>
      </ListItem>
    {/each}
  </List>
</Paper>
