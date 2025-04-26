<script lang="ts">
  let {
    class: className = '',
    progress,
  }: {
    class?: string;
    progress?: number;
  } = $props();

  function getColor(stepProgress: number) {
    if (progress === undefined) {
      return 'bg-slate-100';
    }

    if (progress === 0) {
      return 'bg-red-500';
    }

    if (progress > stepProgress) {
      return 'bg-green-500';
    }

    return 'bg-slate-100';
  }
</script>

<div class="flex justify-center gap-1.5 {className}">
  <div class="h-2.5 w-2.5 rounded-full transition-colors {getColor(0)}"></div>
  <div class="h-2.5 w-2.5 rounded-full transition-colors {getColor(1)}"></div>
  <div class="h-2.5 w-2.5 rounded-full transition-colors {getColor(2)}"></div>
  <div class="h-2.5 w-2.5 rounded-full transition-colors {getColor(3)}"></div>
  <div class="h-2.5 w-2.5 rounded-full transition-colors {getColor(4)}"></div>
</div>
