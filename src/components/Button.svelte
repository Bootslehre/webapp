<script lang="ts">
  export let label: string;
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let disabled: boolean = false;
  export let variant: 'primary' | 'secondary' | 'tertiary' | 'primaryDestructive' | 'secondaryDestructive' | 'tertiaryDestructive' = 'primary';
  export let size: 'sm' | 'md' = 'md';

  const VARIANT_MAP = {
    primary: 'bg-amber-700 text-white hover:bg-amber-800',
    primaryDestructive: 'bg-rose-500 text-white hover:bg-rose-800',

    secondary: 'border border-amber-700 text-amber-700 bg-white/25 hover:bg-black/5 dark:bg-white/5 dark:hover:bg-white/10 dark:border-amber-500 dark:text-amber-500',
    secondaryDestructive: 'border border-rose-500 text-rose-500 bg-white hover:bg-stone-100',

    tertiary: 'text-amber-500 hover:bg-stone-600/10 dark:hover:bg-stone-400/10',
    tertiaryDestructive: 'text-rose-500 bg-opacity-0 hover:bg-stone-600/10 dark:hover:bg-stone-400/10',
  };

  const SIZE_MAP = {
    sm: 'gap-2 px-2 h-7 text-sm',
    md: 'gap-2 px-3 h-9 text-md',
  };
</script>

<button
  class="inline-flex items-center rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed {VARIANT_MAP[variant]} {SIZE_MAP[size]}"
  {type}
  {disabled}
  on:click
>
  <slot name="iconLeft" />
  {label}
  <slot name="iconRight" />
</button>
