<script lang="ts">
  import { configService } from '../../../stores/config.svelte';

  let config = $derived(configService.config);
</script>

<label>
  <input
    type="checkbox"
    checked={config.sbfSee === 'SBF_SEE_OHNE_BASIS'}
    onchange={(e) => {
      if (e.currentTarget.checked) {
        configService.update({ ...config, sbfSee: 'SBF_SEE_OHNE_BASIS' });
      } else {
        configService.update({ ...config, sbfSee: 'SBF_SEE_KOMPLETT' });
      }
    }}
  />
  Ich besitze bereits den Schein <strong class="font-semibold">SBF-Binnen Motor</strong>
</label>

<hr />

{#if config.sbfSee === 'SBF_SEE_KOMPLETT'}
  72 Basisfragen + 213 Seefragen + Navigationsaufgaben
{:else}
  213 Seefragen + Navigationsaufgaben
{/if}
