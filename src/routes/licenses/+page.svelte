<script lang="ts">
  import BackButton from '../../components/BackButton.svelte';
  import List from '../../components/List/List.svelte';
  import ListItem from '../../components/List/ListItem.svelte';
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

  <List>
    {#each LICENSES as license}
      <ListItem
        href="/licenses/{license.id}"
        class="flex items-baseline justify-between gap-8"
      >
        <span>{license.name}</span>
      </ListItem>
    {/each}
  </List>
</Paper>
