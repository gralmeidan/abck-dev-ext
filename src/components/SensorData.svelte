<script lang="ts">
  import { parseSensor } from '../helpers/parse';
  import JsonView from './JsonView/JsonView.svelte';

  export let data: string;
  export let parse: boolean = false;

  $: display = (() => {
    try {
      return parseSensor(data);
    } catch (error) {
      return null;
    }
  })();
</script>

{#if parse && display}
  <JsonView value={display} />
{:else}
  <code class="whitespace-nowrap font-mono overflow-x-clip block">
    {data}
  </code>
{/if}
