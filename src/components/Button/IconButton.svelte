<script lang="ts">
  import { VARIANT_STYLES_MAP, type ButtonSize, type IconButtonProps } from './shared';

  let { children, label, type = 'button', disabled = false, variant = 'filled', size = 'md', onclick, class: className = '', href }: IconButtonProps = $props();

  const BASE_CLASSES = 'flex cursor-pointer items-center rounded-full justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';

  const SIZE_MAP: Record<ButtonSize, string> = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
  };
</script>

{#if href}
  <a
    {href}
    class="{BASE_CLASSES} {VARIANT_STYLES_MAP[variant]} {SIZE_MAP[size]} {className}"
    {onclick}
    aria-label={label}
  >
    {@render children()}
  </a>
{:else}
  <button
    class="{BASE_CLASSES} {VARIANT_STYLES_MAP[variant]} {SIZE_MAP[size]} {className}"
    {type}
    {disabled}
    {onclick}
    aria-label={label}
  >
    {@render children()}
  </button>
{/if}
