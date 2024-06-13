<script lang="ts">
  export let size: number = 8;
  export let on: boolean = false;
</script>

<div
  class={`rounded-full h-4 transition-colors duration-200`}
  class:_on={on}
  class:_off={!on}
  style={`width: ${size}px; height: ${size}px`}
></div>

<style>
  ._on {
    @apply bg-emerald-600;
  }

  ._off {
    @apply bg-red-600;
  }
</style>
