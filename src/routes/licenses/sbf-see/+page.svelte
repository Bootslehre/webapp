<script lang="ts">
  import Button from '../../../components/Button/Button.svelte';
  import ChevronLeft from '../../../components/icons/ChevronLeft.svelte';
  import Paper from '../../../components/Paper.svelte';
  import PaperTitle from '../../../components/PaperTitle.svelte';
  import DetailsSummary from '../../../components/DetailsSummary.svelte';
  import InfoBox from '../../../components/InfoBox.svelte';
  import BackButton from '../../../components/BackButton.svelte';

  let hasSbfBinnenMotor = $state(false);
</script>

<BackButton href="/licenses">Zurück</BackButton>

<Paper class="bg-white p-6">
  <PaperTitle class="mb-2">SBF See</PaperTitle>

  {#if hasSbfBinnenMotor}
    213 Seefragen + Navigationsaufgaben
  {:else}
    72 Basisfragen + 213 Seefragen + Navigationsaufgaben
  {/if}
</Paper>

<Paper class="mt-4 bg-white p-6">
  <details open>
    <DetailsSummary>
      <PaperTitle>Vorerfahrung</PaperTitle>
    </DetailsSummary>

    <InfoBox
      class="my-4"
      variant="info"
    >
      Wenn du bereits Führerscheine besitzt, kannst du die Prüfung mit einem reduzierten Fragenkatalog ablegen. Wähle hier deine Vorerfahrung.
    </InfoBox>

    <label>
      <input
        type="checkbox"
        bind:checked={hasSbfBinnenMotor}
      />
      Ich besitze bereits den Schein <strong class="font-semibold">SBF-Binnen Motor</strong>
    </label>
  </details>
</Paper>
