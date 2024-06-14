<script lang="ts">
  import type { Cookie } from '../../types/storage.types';

  export let cookies: Cookie[];

  function copyTextToClipboard(text) {
    const copyFrom = document.createElement('textarea');

    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
  }

  function handleCopy() {
    const cookieStr = cookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ');

    copyTextToClipboard(cookieStr);
  }
</script>

<button class="material-symbols-rounded" on:click={handleCopy}>
  content_copy
</button>
