<script lang="ts">
  import { base } from '$app/paths';
</script>

<footer class="relative mt-auto bg-blue-600">
  <div class="mx-auto w-full max-w-xl">
    <div class="flex items-center justify-center gap-12 px-4 py-4 text-xs text-white">
      <a
        href="{base}/impressum"
        class="hover:underline">Impressum</a
      >
      <span>Made with 💩</span>
    </div>
  </div>

  <div class="loader"></div>
</footer>

<style>
  .loader {
    --s: 25px; /* the size of the wave */
    --b: 15px; /* the thickness of the line*/
    --c: blue;

    height: calc(4 * var(--s));
    display: grid;
    padding: 20px;
    filter: blur(7px) contrast(20) hue-rotate(20deg);
    background: #fff;
    mix-blend-mode: darken;
    position: absolute;
    bottom: 0;
    left: calc(-1.25 * var(--s));
    width: calc(100% + 5 * var(--s));
  }

  .loader::before {
    content: '';
    --_g: calc(-0.6 * var(--s)), #0000 calc(99% - var(--b)), var(--c) calc(101% - var(--b)) 99%, #0000 101%;
    --_r: calc(1.166 * var(--s) + var(--b) / 2) at left 50%;
    background:
      radial-gradient(var(--_r) bottom var(--_g)) calc(50% - var(--s)) calc(50% - var(--s)) / calc(4 * var(--s)) calc(2 * var(--s)),
      radial-gradient(var(--_r) top var(--_g)) calc(50% + var(--s)) calc(50% + var(--s)) / calc(4 * var(--s)) calc(2 * var(--s));
    animation: m 10s infinite linear;
  }

  @keyframes m {
    to {
      background-position:
        calc(50% - 5 * var(--s)) calc(50% - var(--s)),
        calc(50% - 3 * var(--s)) calc(50% + var(--s));
    }
  }
</style>
