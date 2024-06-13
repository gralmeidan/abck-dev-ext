<script lang="ts">
  import { onMount } from 'svelte';
  import { Action, onMessage } from '../helpers/messaging';

  let sensor: string[] = [];

  onMount(() => {
    console.log('Mounted');
    onMessage(Action.SENSOR, data => {
      console.log('Received', data);
      sensor = [data, ...sensor];
    });
  });
</script>

<h1>Init</h1>

{#if sensor.length}
  <ul>
    {#each sensor as item}
      <li>{item}</li>
    {/each}
  </ul>
{/if}
