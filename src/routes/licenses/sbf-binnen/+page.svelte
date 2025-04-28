<script lang="ts">
  import BackButton from '../../../components/BackButton.svelte';
  import DetailsSummary from '../../../components/DetailsSummary.svelte';
  import InfoBox from '../../../components/InfoBox.svelte';
  import Paper from '../../../components/Paper.svelte';
  import PaperTitle from '../../../components/PaperTitle.svelte';
</script>

<BackButton href="/licenses">Zurück</BackButton>

<Paper class="bg-white p-6">
  <PaperTitle class="mb-2">SBF Binnen</PaperTitle>

  <pre>
    <code>
- Motor und Segel
  - 72 Basis-Fragen
  - 181 Binnen-Fragen
  - 47 Segel-Fragen
- SBF-Binnen unter Antriebsmaschine (Motor) und unter Segel für Inhaber des SBF-See
  - 181 Binnen-Fragen
  - 47 Segel-Fragen
- SBF-Binnen nur unter Antriebsmaschine (Motor)
  - 72 Basis-Fragen
  - 181 Binnen-Fragen
- SBF-Binnen nur unter Antriebsmaschine (Motor) für Inhaber des SBF-See
  - 181 Binnen-Fragen
- SBF-Binnen nur unter Segel
  - 52 Basis-Fragen (ohne Motor-Fragen)
  - 158 Binnen-Fragen (ohne Motor-Fragen)
  - 47 Segel-Fragen
- SBF-Binnen nur unter Segel für Inhaber des SBF-See
  - 158 Binnen-Fragen (ohne Motor-Fragen)
  - 47 Segel-Fragen
- SBF-Binnen unter Segel für Inhaber des SBF-Binnen unter Antriebsmaschine (Motor)
  - 47 Segel-Fragen
- SBF-Binnen nur unter Antriebsmaschine (Motor) für Personen, die den SBF-Binnen unter Segel vor dem 1. Mai 2012 erworben haben
  - 72 Basis-Fragen
    </code>
  </pre>
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
  </details>
</Paper>
