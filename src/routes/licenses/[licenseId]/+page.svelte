<script lang="ts">
  import Progress from '../../../bsComponents/Progress.svelte';
  import QuestionaireConfigurator from '../../../bsComponents/QuestionaireConfigurator.svelte';
  import QuestionaireOverview from '../../../bsComponents/QuestionaireOverview.svelte';
  import BackButton from '../../../components/BackButton.svelte';
</script>

<div class="mb-1 flex items-center justify-between">
  <BackButton href="/licenses">Zurück</BackButton>
  <Progress />
</div>

<QuestionaireOverview />
<QuestionaireConfigurator />
