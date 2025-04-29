<script lang="ts">
  import { ICON_SIZE_MAP, type IconProps } from './shared';

  let { size = 'md', class: className = '' }: IconProps = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="{ICON_SIZE_MAP[size]} {className}"
>
  <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
</svg>
