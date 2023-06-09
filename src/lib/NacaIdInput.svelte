<script>
  import { FormGroup, Input, Label } from "sveltestrap";
  export let nacaId;
  export let changeHandler;
  const nacaIds = ["0006", "0012", "0015", "0018"];
</script>

<FormGroup>
  <Label for="naca-id">Select a NACA ID</Label>
  <Input
    type="select"
    id="naca-id"
    bind:value={nacaId}
    on:change={changeHandler}
  >
    {#each nacaIds as id}
      <option value={id}>{id}</option>
    {/each}
  </Input>
</FormGroup>
