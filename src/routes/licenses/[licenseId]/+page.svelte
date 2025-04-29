<script lang="ts">
  import Progress from '../../../views/Progress.svelte';
  import QuestionaireConfigurator from '../../../views/QuestionaireConfigurator.svelte';
  import QuestionaireOverview from '../../../views/QuestionaireOverview.svelte';
  import BackButton from '../../../components/BackButton.svelte';
</script>

<div class="mb-2 flex items-center justify-between">
  <BackButton href="/licenses">Zurück</BackButton>
  <Progress />
</div>

<QuestionaireOverview />
<QuestionaireConfigurator />
