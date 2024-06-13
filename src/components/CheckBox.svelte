<script lang="ts">
  export let label: string = '';
  export let name: string = '';
  export let checked: boolean = false;
  export let className: string = '';
</script>

<label class={className}>
  <input type="checkbox" {name} bind:checked />
  {label}
</label>
