<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist";
  import { linspace, calculateNacaFourSeriesYCoordinate } from "./lib/poflow";

  let airfoilType = "Circle";
  let nacaId = "0012";
  let numElementsInMesh = 10;
  let coordinates = [];

  const numElementsForCoordinatesCurve = 10000;
  const airfoilTypes = ["Circle", "2:1 Ellipse", "NACA 4-digit Series"];
  const nacaIds = ["0006", "0012", "0015", "0018"];

  const numElementOptions = [10, 12, 16, 18, 20, 30, 40, 50, 100];

  const getCoordinates = (ratio, numElementsInMesh) => {
    const numElementsPerSide = numElementsInMesh / 2;
    const xgrid = linspace(0.0, 1.0, numElementsPerSide + 1);
    
    coordinates = [];
    xgrid.forEach((x) => {
      const y = calculateNacaFourSeriesYCoordinate(ratio, x);
      coordinates.push({ x, y });
    });

    xgrid.reverse().forEach((x) => {
      const y = -1.0 * calculateNacaFourSeriesYCoordinate(ratio, x);
      coordinates.push({ x, y });
    });

    return {
      x: coordinates.map((coord) => coord.x),
      y: coordinates.map((coord) => coord.y),
    };
  };

  const calculate = () => {
    const ratio = parseFloat(nacaId.substring(nacaId.length - 2)) / 100.0;
    const coordinates = getCoordinates(ratio, numElementsForCoordinatesCurve);
    const nodalCoordiantes = getCoordinates(ratio, numElementsInMesh);

    const geometryPlotLayout = {
      title: `Coordinates for NACA ${nacaId}`,
      xaxis: { title: "x, position along the chord" },
      yaxis: { range: [-0.12, 0.12] },
      mode: "lines",
    };

    const geometryPlotConfig = {
      responsive: true,
    };

    Plotly.newPlot(
      "plot",
      [
        {
          ...coordinates,
          type: "scatter",
          mode: "lines",
          name: `NACA ${nacaId}`,
          line: { width: 5 },
        },
        {
          ...nodalCoordiantes,
          type: "scatter",
          mode: "lines+markers",
          name: `Mesh`,
          line: { color: "red", width: 2 },
        },
      ],
      geometryPlotLayout,
      geometryPlotConfig
    );
    
  };

  onMount(() => {
    calculate();
  });

  const handleInputChanges = () => {
    calculate();
  };
</script>

<main>
  <h1>PoFlow</h1>
  <h2>An ideal solution to potential flow analysis</h2>

  <label for="airfoil-type">Select an airfoil type:</label>
  <select
    id="airfoil-type"
    bind:value={airfoilType}
    on:change={handleInputChanges}
  >
    {#each airfoilTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  {#if airfoilType === "NACA 4-digit Series"}
    <label for="naca-id">Select NACA ID:</label>
    <select id="naca-id" bind:value={nacaId} on:change={handleInputChanges}>
      {#each nacaIds as id}
        <option value={id}>{id}</option>
      {/each}
    </select>
  {/if}
  <label for="num-elements">Select number of elements:</label>
  <select
    id="num-elements"
    bind:value={numElementsInMesh}
    on:change={handleInputChanges}
  >
    {#each numElementOptions as numElementOption}
      <option value={numElementOption}>{numElementOption}</option>
    {/each}
  </select>

  <div id="plot" />
</main>

<style>
  #plot {
    width: 800px;
    height: 400px;
    padding: 50px;
  }

  label,
  select {
    /* In order to define widths */
    display: inline-block;
  }

  label {
    width: 30%;
    /* Positions the label text beside the input */
    text-align: right;
  }

  label + select {
    width: 30%;
    /* Large margin-right to force the next element to the new-line
           and margin-left to create a gutter between the label and input */
    margin: 0 30% 0 4%;
  }
</style>
