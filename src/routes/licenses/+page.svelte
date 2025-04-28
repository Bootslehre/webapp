<script lang="ts">
  import BackButton from '../../components/BackButton.svelte';
  import Paper from '../../components/Paper.svelte';
  import PaperTitle from '../../components/PaperTitle.svelte';

  const LICENSES = [
    { name: 'SBF See', id: 'sbf-see' },
    { name: 'SBF Binnen', id: 'sbf-binnen' },
  ];
</script>

<BackButton href="/">Zurück</BackButton>

<Paper class="bg-white p-6">
  <PaperTitle class="mb-4">Wähle deinen Schein</PaperTitle>

  <ul class="space-y-4">
    {#each LICENSES as license}
      <li>
        <a
          class="flex w-full cursor-pointer items-baseline justify-between gap-8 rounded-md border border-slate-200 p-4 text-sm font-medium transition-colors hover:border-blue-200 hover:bg-blue-50"
          href="/licenses/{license.id}"
        >
          <span>{license.name}</span>
          <div class="flex gap-2">
            <!-- <span class="text-xs text-slate-500">{questionaire.questions.length} Fragen</span>
            <span class="text-xs text-slate-500">({statsService.getPinnedQuestionIds(questionaire.id).length} markiert)</span> -->
          </div>
        </a>
      </li>
    {/each}
  </ul>
</Paper>
