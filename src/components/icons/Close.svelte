<script lang="ts">
  import { ICON_SIZE_MAP, type IconSize } from './icon-sizes';

  export let size: IconSize = 'md';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 24 24"
  class={ICON_SIZE_MAP[size]}
>
  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
</svg>
