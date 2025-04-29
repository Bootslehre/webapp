<script lang="ts">
  import DetailsSummary from '../../../components/DetailsSummary.svelte';
  import InfoBox from '../../../components/InfoBox.svelte';
  import Paper from '../../../components/Paper.svelte';
  import PaperTitle from '../../../components/PaperTitle.svelte';
  import type { License } from '../../../utils/questionaires';
  import SbfBinnenConfiguration from './SbfBinnenConfiguration.svelte';
  import SbfSeeConfiguration from './SbfSeeConfiguration.svelte';

  let {
    class: className = '',
    license,
  }: {
    class?: string;
    license: License;
  } = $props();
</script>

<Paper class="mt-4 bg-white p-6 {className}">
  <details>
    <DetailsSummary>
      <PaperTitle>Vorerfahrung</PaperTitle>
    </DetailsSummary>

    <InfoBox
      class="my-4"
      variant="info"
    >
      Wenn du bereits Führerscheine besitzt, kannst du die Prüfung mit einem reduzierten Fragenkatalog ablegen. Wähle hier deine Vorerfahrung.
    </InfoBox>

    {#if license === 'sbf-see'}
      <SbfSeeConfiguration />
    {:else if license === 'sbf-binnen'}
      <SbfBinnenConfiguration />
    {/if}
  </details>
</Paper>
