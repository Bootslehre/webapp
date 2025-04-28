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
  <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
</svg>
