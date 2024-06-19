<script lang="ts">
  import type { Cookie } from '../types/storage.types';
  import { COOKIE_NAMES, CookieName } from '../constants/cookie.constants';
  import LedLight from './LedLight.svelte';
  import { AbckUtils } from '../helpers/abck';

  export let cookies: Cookie[] = [];

  $: cookiesHash = cookies.reduce((acc, ck) => {
    acc[ck.name] = ck;
    return acc;
  }, {}) as Record<string, Cookie>;

  $: abck = cookiesHash[CookieName.ABCK];

  $: isAbckLengthValid =
    abck?.value?.length === 485 || abck?.value?.length === 489;

  $: isAbckTailValid = AbckUtils.hasValidTail(abck?.value ?? '');
</script>

<div>
  <h2 class="text-lg my-3">
    Abck:
    <span class={isAbckLengthValid ? 'valid-abck' : 'invalid-abck'}>
      {abck?.value?.length ?? 'N/A'}
    </span>

    {#if abck?.value}
      {' - '}
      <code>
        {abck.value.slice(0, 10)}...<span
          class={isAbckTailValid ? 'valid-abck' : 'invalid-abck'}
          >{abck.value.slice(-16)}</span
        >
      </code>
    {/if}
  </h2>
  <ul class="flex gap-2">
    {#each COOKIE_NAMES as name}
      <li class="list-none flex gap-2 text-sm items-center">
        {name}
        <LedLight on={!!cookiesHash[name]} />
      </li>
    {/each}
  </ul>
</div>

<style>
  .valid-abck {
    @apply text-emerald-600;
  }

  .invalid-abck {
    @apply text-red-600;
  }
</style>
