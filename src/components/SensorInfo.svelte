<script lang="ts">
  import CheckBox from './CheckBox.svelte';
  import SensorData from './SensorData.svelte';

  export let sensor: string[] = [];

  let doParse = false;
  let query = '';
</script>

<div>
  <div class="flex items-center gap-2 my-2">
    <CheckBox
      className="text-xl"
      name="do-parse-to-json"
      label="Parse"
      bind:checked={doParse}
    />
    <input
      type="text"
      name="query"
      placeholder="Query"
      bind:value={query}
      disabled={!doParse}
      class="grow font-mono !w-fit !h-fit !mb-0"
    />
  </div>
  <ul class="flex flex-col">
    {#each sensor as data}
      <li class="list-none">
        <SensorData {data} parse={doParse} {query} />
      </li>
    {/each}
  </ul>
</div>
