<script lang="ts">
  import { onMount } from 'svelte';
  import { Action, onMessage } from '../helpers/messaging';
  import { getInspectedDomain } from '../helpers/navigation';
  import type { Cookie } from '../types/storage.types';
  import Clear from './Buttons/Clear.svelte';
  import Copy from './Buttons/Copy.svelte';
  import CookiesInfo from './CookiesInfo.svelte';
  import SensorInfo from './SensorInfo.svelte';

  export let domain: string = '';
  export let sensor: string[] = [];
  export let cookies: Cookie[] = [];

  onMount(() => {
    onMessage(Action.SENSOR, data => {
      sensor = [data, ...sensor];
    });

    onMessage(Action.COOKIES, data => {
      cookies = data.filter(cookies => {
        return cookies.domain.endsWith(domain);
      });
    });

    chrome.cookies.getAll({ domain }, data => {
      if (cookies.length === 0) {
        cookies = data;
      }
    });

    chrome.devtools.network.onNavigated.addListener(url => {
      getInspectedDomain().then(url => {
        if (url !== domain) {
          console.log('Changed to domain', url);
          sensor = [];

          cookies = cookies.filter(cookies => {
            return cookies.domain.endsWith(url);
          });
        }

        domain = url;
      });
    });
  });
</script>

<main class="m-4">
  <section>
    <div class="flex justify-between">
      <h1>
        {#if domain}
          {domain}
        {:else}
          Cookies
        {/if}
      </h1>
      <div class="flex gap-2">
        <Clear bind:cookies bind:sensor />
        <Copy bind:cookies />
      </div>
    </div>

    <CookiesInfo bind:cookies />
  </section>
  <section>
    <h1>sensor_data</h1>
    <SensorInfo bind:sensor />
  </section>
</main>

<style>
  h1 {
    @apply text-2xl font-bold;
  }
</style>
