<script lang="ts">
  import { base } from '$app/paths';
  import Button from '../../components/Button/Button.svelte';
  import ChevronLeft from '../../components/icons/ChevronLeft.svelte';
  import Paper from '../../components/Paper.svelte';
  import { statsService } from '../../stores/stats.svelte';
  import { questionaireNameMap, QUESTIONAIRES } from '../../utils/questionaires';
</script>

<div class="flex flex-col items-start gap-2">
  {#snippet chevronIcon()}
    <ChevronLeft size="lg" />
  {/snippet}

  <Button
    href="{base}/"
    variant="text"
    size="sm"
    iconLeft={chevronIcon}>Zurück</Button
  >

  <Paper class="bg-white p-6">
    <ul class="space-y-4">
      {#each QUESTIONAIRES as item (item.id)}
        <li>
          <a
            class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50"
            href="{base}/lists/{item.id}"
          >
            <span>{questionaireNameMap[item.id]}</span>
            <div class="flex gap-2">
              <span class="text-xs text-slate-500">{item.questions.length} Fragen</span>
              <span class="text-xs text-slate-500">({statsService.getPinnedQuestionIds(item.id).length} markiert)</span>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </Paper>
</div>
