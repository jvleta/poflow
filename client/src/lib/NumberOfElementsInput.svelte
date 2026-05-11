<script>
  export let numElements;
  export let changeHandler;
  const numElementOptions = [10, 12, 16, 18, 20, 30, 40, 50, 100];
</script>

<div>
  <label for="num-elements">Select a number of elements</label>
  <select
    id="num-elements"
    bind:value={numElements}
    on:change={changeHandler}
  >
    {#each numElementOptions as num}
      <option value={num}>{num}</option>
    {/each}
  </select>
</div>
