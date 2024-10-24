<script lang="ts">
  import { ICON_SIZE_MAP, type IconSize } from './icon-sizes';

  export let size: IconSize = 'md';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class={ICON_SIZE_MAP[size]}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M4.5 12.75l6 6 9-13.5"
  />
</svg>
