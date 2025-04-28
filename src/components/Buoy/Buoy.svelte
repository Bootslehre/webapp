<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import tonne from './buoy.png';

  const ROUTE_BLACKLIST = ['imprint'];

  let hideBuoy = $derived(Boolean(ROUTE_BLACKLIST.some((route) => page.route.id?.includes(route))));
</script>

{#if !hideBuoy}
  <img
    transition:fade={{ duration: 2000 }}
    src={tonne}
    class="wave"
    alt=""
  />
{/if}

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
    opacity: 0.5;
  }
</style>
