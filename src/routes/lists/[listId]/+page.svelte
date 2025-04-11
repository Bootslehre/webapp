<script lang="ts">
  import { page } from '$app/state';
  import Button from '../../../components/Button.svelte';
  import Paper from '../../../components/Paper.svelte';
  import { goToNextQuestion } from '../../../utils/getRandomQuestion';

  let questionaireId = $derived(page.params.listId);

  function start() {
    goToNextQuestion(questionaireId);
  }
</script>

<a href="/lists">Back</a>

<Paper class="flex flex-col items-start gap-4 bg-white p-6">
  <h1 class="text-lg">{questionaireId}</h1>

  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit maxime ab corrupti delectus perferendis doloremque natus consequatur. Rem, quaerat voluptas nobis autem
    blanditiis doloremque, eaque, reprehenderit aperiam minima animi non.
  </p>

  <Button
    onclick={start}
    label="Practice"
  />
</Paper>
