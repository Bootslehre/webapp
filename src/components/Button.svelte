<script lang="ts">
  export let label: string;
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let disabled: boolean = false;
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  export let size: 'sm' | 'md' = 'md';

  const VARIANT_MAP = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    secondary: 'border border-blue-700 text-blue-700 bg-white/25 hover:bg-black/5 dark:bg-white/5 dark:hover:bg-white/10 dark:border-blue-500 dark:text-blue-500',
    tertiary: 'text-blue-500 hover:bg-stone-600/10 dark:hover:bg-stone-400/10',
  };

  const SIZE_MAP = {
    sm: 'gap-2 px-2 h-7 text-sm',
    md: 'gap-2 px-3 h-9 text-sm',
  };
</script>

<button
  class="inline-flex items-center rounded-md font-semibold disabled:opacity-50 transition-colors disabled:cursor-not-allowed {VARIANT_MAP[variant]} {SIZE_MAP[size]}"
  {type}
  {disabled}
  on:click
>
  <slot name="iconLeft" />
  {label}
  <slot name="iconRight" />
</button>
