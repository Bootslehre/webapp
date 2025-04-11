<script lang="ts">
  import Paper from '../../components/Paper.svelte';
  import { QUESTIONAIRES } from '../../utils/questionaires';
</script>

<a href="/">Back</a>

<Paper class="bg-white p-6">
  <ul class="space-y-4">
    {#each QUESTIONAIRES as item}
      <li>
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-gray-200 p-4 text-sm font-medium transition-colors hover:border-sky-200 hover:bg-sky-50"
          href="/lists/{item.id}"
        >
          <span>{item.id}</span>
          <span class="text-xs text-gray-500">{item.questions.length} Questions</span>
        </a>
      </li>
    {/each}
  </ul>
</Paper>
