<script>
  import { FormGroup, Input, Label } from "sveltestrap";
  import { AirfoilType } from "./poflow";
  export let airfoilType = AirfoilType.Circle;
  export let changeHandler = () => {};

  const airfoilTypes = [
    AirfoilType.Circle,
    AirfoilType.Ellipse,
    AirfoilType.Naca4Series,
  ];
</script>

<FormGroup>
  <Label for="airfoil-type">Select an airfoil type</Label>
  <Input
    type="select"
    name="airfoilType"
    id="airfoil-type"
    on:change={changeHandler}
    bind:value={airfoilType}
  >
    {#each airfoilTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </Input>
</FormGroup>
