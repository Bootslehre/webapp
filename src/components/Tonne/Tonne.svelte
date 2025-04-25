<script lang="ts">
  import tonne from './tonne.png';
</script>

<div class="fadeIn">
  <img
    src={tonne}
    alt="Tonne"
    class="wave"
  />
</div>

<style>
  @keyframes wave {
    from {
      transform: rotate3d(1, 1, 1, -8deg);
    }

    to {
      transform: rotate3d(1, 1, 1, 3deg);
    }
  }

  .wave {
    @apply pointer-events-none absolute right-[15%] bottom-[100px] block;
    animation: wave 2500ms infinite ease-in-out both alternate;
    transform-origin: 50% 99%;
    height: 180px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }

  .fadeIn {
    opacity: 1;
    animation: fadeIn 2s 1 ease-in both;
  }
</style>
