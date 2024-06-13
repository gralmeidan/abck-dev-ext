<script lang="ts">
  import { JSONPath } from 'jsonpath-plus';
  import { parseSensor } from '../helpers/parse';
  import JsonView from './JsonView/JsonView.svelte';

  export let data: string;
  export let parse: boolean = false;
  export let query: string = '';

  $: display = (() => {
    try {
      const parsed = parseSensor(data);
      const result = JSONPath({ json: parsed, path: query || '$' });

      console.log(result);
      if (result?.[0]) {
        return result.length > 1 ? result : result[0];
      }
    } catch (error) {
      return null;
    }
  })();
</script>

{#if parse && display}
  <JsonView value={display} className="line-break-anywhere" />
{:else}
  <code class="whitespace-nowrap font-mono overflow-x-clip block">
    {data}
  </code>
{/if}
