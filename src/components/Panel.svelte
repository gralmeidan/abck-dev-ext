<script lang="ts">
  import { onMount } from 'svelte';
  import { Action, onMessage } from '../helpers/messaging';
  import type { Cookie } from '../types/storage.types';
  import CookiesInfo from './CookiesInfo.svelte';
  import SensorInfo from './SensorInfo.svelte';

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
    <SensorInfo bind:sensor />
  </section>
</main>

<style>
  h1 {
    @apply text-2xl font-bold;
  }
</style>
