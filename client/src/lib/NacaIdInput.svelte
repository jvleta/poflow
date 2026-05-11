<script>
  export let nacaId;
  export let changeHandler;
  const nacaIds = ["0006", "0012", "0015", "0018"];
</script>

<div>
  <label for="naca-id">Select a NACA ID</label>
  <select
    id="naca-id"
    bind:value={nacaId}
    on:change={changeHandler}
  >
    {#each nacaIds as id}
      <option value={id}>{id}</option>
    {/each}
  </select>
</div>
