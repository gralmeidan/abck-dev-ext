<script lang="ts">
  import type { Cookie } from '../../types/storage.types';

  export let cookies: Cookie[];
  export let sensor: string[];

  function clearAllCookies() {
    document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, name =>
      location.hostname
        .split('.')
        .reverse()
        .reduce(
          domain => (
            (domain = domain.replace(/^\.?[^.]+/, '')),
            (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
            domain
          ),
          location.hostname
        )
    );
  }

  async function evalClearCookies() {
    await chrome.devtools.inspectedWindow.eval(
      `(${clearAllCookies.toString()})()`
    );

    cookies = [];
    sensor = [];
  }
</script>

<button class="material-symbols-rounded" on:click={evalClearCookies}>
  delete_forever
</button>
