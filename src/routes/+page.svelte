<script lang="ts">
  import { base } from '$app/paths';
  import Button from '../components/Button/Button.svelte';
  import Paper from '../components/Paper.svelte';
</script>

<Paper class="bg-white p-6">
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde doloremque qui nobis eum est voluptas obcaecati officiis quae esse ipsa culpa adipisci, nihil molestiae aliquid
    officia. Ducimus et facere repellat.
  </p>

  <Button
    class="mt-5 justify-self-end"
    href="{base}/lists">Wähl deinen Schein</Button
  >
</Paper>
