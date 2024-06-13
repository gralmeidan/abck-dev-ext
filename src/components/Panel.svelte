<script lang="ts">
  import { onMount } from 'svelte';
  import { Action, onMessage } from '../helpers/messaging';
  import type { Cookie } from '../types/storage.types';
  import CookiesInfo from './CookiesInfo.svelte';

  let sensor: string[] = [];
  let cookies: Cookie[] = [];

  onMount(() => {
    onMessage(Action.SENSOR, data => {
      sensor = [data, ...sensor];
    });

    onMessage(Action.COOKIES, data => {
      cookies = data;
    });
  });
</script>

<main class="m-4">
  <section>
    <h1>Cookies</h1>
    <CookiesInfo bind:cookies />
  </section>
  <section>
    <h1>sensor_data</h1>
    <ul class="flex flex-col">
      {#each sensor as data}
        <li class="list-none">
          <code class="whitespace-nowrap font-mono overflow-x-clip block">
            {data}
          </code>
        </li>
      {/each}
    </ul>
  </section>
</main>
