<script lang="ts">
  import JSONTree from 'svelte-json-tree';

  export let value: unknown;
  export let className: string = '';
</script>

<code class={className}>
  {#if typeof value === 'object'}
    <JSONTree {value} />
  {:else}
    {value}
  {/if}
</code>
