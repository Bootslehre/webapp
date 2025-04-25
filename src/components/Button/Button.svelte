<script lang="ts">
  import { VARIANT_STYLES_MAP, type ButtonProps, type ButtonSize } from './shared';

  let {
    label,
    children,
    type = 'button',
    disabled = false,
    variant = 'filled',
    size = 'md',
    onclick,
    iconLeft,
    iconRight,
    class: className = '',
    href,
    'data-testid': testid = '',
  }: ButtonProps = $props();

  const BASE_CLASSES = 'flex cursor-pointer items-center rounded-md text-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';

  const SIZE_MAP: Record<ButtonSize, string> = {
    sm: 'gap-1 px-2 h-7 text-sm',
    md: 'gap-2 px-3 h-9 text-sm',
  };
</script>

{#if href}
  <a
    {href}
    class="{BASE_CLASSES} {VARIANT_STYLES_MAP[variant]} {SIZE_MAP[size]} {className}"
    {onclick}
    data-testid={testid}
    aria-label={label}
  >
    {@render iconLeft?.()}
    {@render children()}
    {@render iconRight?.()}
  </a>
{:else}
  <button
    class="{BASE_CLASSES} {VARIANT_STYLES_MAP[variant]} {SIZE_MAP[size]} {className}"
    {type}
    {disabled}
    {onclick}
    aria-label={label}
    data-testid={testid}
  >
    {@render iconLeft?.()}
    {@render children()}
    {@render iconRight?.()}
  </button>
{/if}
