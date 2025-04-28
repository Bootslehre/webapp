<script lang="ts">
  import { page } from '$app/state';
  import BackButton from '../../../components/BackButton.svelte';
  import type { License } from '../../../utils/questionaires';
  import QuestionaireConfigurator from './QuestionaireConfigurator.svelte';
  import QuestionaireOverview from './QuestionaireOverview.svelte';
</script>

<BackButton href="/licenses">Zurück</BackButton>
<QuestionaireOverview license={page.params.licenseId as License} />
<QuestionaireConfigurator license={page.params.licenseId as License} />
