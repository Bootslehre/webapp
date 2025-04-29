<script lang="ts">
  import Checkbox from '../components/Checkbox.svelte';
  import { configService } from '../stores/config.svelte';

  const config = $derived(configService.config);
</script>

<Checkbox
  class="mb-2 block"
  checked={config.sbfSee === 'SBF_SEE_OHNE_BASIS'}
  onchange={(e) => {
    if (e.currentTarget.checked) {
      configService.update('sbfSee', 'SBF_SEE_OHNE_BASIS');
    } else {
      configService.update('sbfSee', 'SBF_SEE_KOMPLETT');
    }
  }}
>
  Ich besitze bereits den Schein <strong class="font-semibold">SBF-Binnen Motor</strong>
</Checkbox>

<div class="text-sm">
  {#if config.sbfSee === 'SBF_SEE_KOMPLETT'}
    Damit musst du 72 Basisfragen, 213 Seefragen und die Navigationsaufgaben lernen.
  {:else}
    Damit musst du 213 Seefragen und die Navigationsaufgaben. Du sparst dir die 72 Basisfragen.
  {/if}
</div>
