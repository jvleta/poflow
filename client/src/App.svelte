<script>
  import { onMount } from "svelte";
  import createPanel from "./wasm/panel.js";

  import AirfoilTypeInput from "./lib/AirfoilTypeInput.svelte";
  import NacaIdInput from "./lib/NacaIdInput.svelte";
  import NumberOfElementsInput from "./lib/NumberOfElementsInput.svelte";

  import { AirfoilType, getCoordinates2, updatePlot } from "./lib/poflow";

  let airfoilType = AirfoilType.Circle;
  let nacaId = "0012";
  let numElementsInMesh = 10;

  const calculate = () => {
    const powFlowInput = {
      airfoilType,
      nacaId,
      numElements: numElementsInMesh,
    };

    const nodalCoordiantes = getCoordinates2(powFlowInput);
    const allCoordinates = getCoordinates2({
      ...powFlowInput,
      numElements: 100000,
    });

    updatePlot(powFlowInput, allCoordinates, nodalCoordiantes);
  };

  let greeting = '';

  onMount(async () => {
    try {
      const panel = await createPanel();
      console.log('panel:', panel);
      console.log('greet fn:', panel.greet);
      greeting = panel.greet('world');
      console.log('greeting:', greeting);
    } catch (e) {
      console.error('wasm load failed:', e);
    }

    calculate();
  });

  const handleAirfoilTypeChange = (e) => {
    airfoilType = e.target.value;
    calculate();
  };

  const handleNacaIdChange = (e) => {
    nacaId = e.target.value;
    calculate();
  };

  const handleNumElementChange = (e) => {
    numElementsInMesh = parseInt(e.target.value);
    calculate();
  };
</script>

<main>
  <div>
    <h1>PoFlow</h1>
    <h2>An ideal solution to potential flow analysis</h2>
    {#if greeting}<p>{greeting}</p>{/if}
  </div>
  <div class="panel">
    <div>
      <form>
        <AirfoilTypeInput
          {airfoilType}
          changeHandler={handleAirfoilTypeChange}
        />
        {#if airfoilType === AirfoilType.Naca4Series}
          <NacaIdInput {nacaId} changeHandler={handleNacaIdChange} />
        {/if}
        <NumberOfElementsInput
          numElements={numElementsInMesh}
          changeHandler={handleNumElementChange}
        />
      </form>
    </div>
    <div id="plot"></div>
  </div>
</main>

<style>
  main {
    width: 100%;
  }

  .panel {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    border: 1px solid black;
  }
</style>
