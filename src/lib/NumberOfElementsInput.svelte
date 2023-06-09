<script>
  import { FormGroup, Input, Label } from "sveltestrap";
  export let numElements;
  export let changeHandler;
  const numElementOptions = [10, 12, 16, 18, 20, 30, 40, 50, 100];
</script>

<FormGroup>
  <Label for="num-elements">Select a number of elements</Label>
  <Input
    type="select"
    id="num-elements"
    bind:value={numElements}
    on:change={changeHandler}
  >
    {#each numElementOptions as num}
      <option value={num}>{num}</option>
    {/each}
  </Input>
</FormGroup>
