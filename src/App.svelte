<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist";
  import {
    linspace,
    AirfoilType,
    calculateYCoordinateAtXForEllipse,
    calculateYCoordinateAtXForNaca4Series,
  } from "./lib/poflow";
  import SelectList from "./lib/SelectList.svelte";

  let airfoilType = AirfoilType.Circle;
  let nacaId = "0012";
  let numElementsInMesh = 10;
  let coordinates = [];
  let allCoordinates = [];
  let nodalCoordiantes = [];
  const numElementsForCoordinatesCurve = 10000;
  const airfoilTypes = [
    AirfoilType.Circle,
    AirfoilType.Ellipse,
    AirfoilType.Naca4Series,
  ];
  const nacaIds = ["0006", "0012", "0015", "0018"];

  const numElementOptions = [10, 12, 16, 18, 20, 30, 40, 50, 100];

  const getCoordinates = (calculateYCoordinateAtX, numElementsInMesh) => {
    const numElementsPerSide = numElementsInMesh / 2;

    const xgrid = (() => {
      switch (airfoilType) {
        case AirfoilType.Circle:
        case AirfoilType.Ellipse:
          return linspace(-1.0, 1.0, numElementsPerSide + 1);
        case AirfoilType.Naca4Series:
          return linspace(0.0, 1.0, numElementsPerSide + 1);
      }
    })();

    coordinates = [];
    xgrid.forEach((x) => {
      const y = calculateYCoordinateAtX(x);
      coordinates.push({ x, y });
    });

    xgrid.reverse().forEach((x) => {
      const y = -1.0 * calculateYCoordinateAtX(x);
      coordinates.push({ x, y });
    });

    return {
      x: coordinates.map((coord) => coord.x),
      y: coordinates.map((coord) => coord.y),
    };
  };

  const calculate = () => {
    const calculateYCoordinateAtX = (x) => {
      switch (airfoilType) {
        case AirfoilType.Circle:
          return calculateYCoordinateAtXForEllipse(1.0, x);
        case AirfoilType.Ellipse:
          return calculateYCoordinateAtXForEllipse(0.5, x);
        case AirfoilType.Naca4Series:
          const ratio = parseFloat(nacaId.substring(nacaId.length - 2)) / 100.0;
          console.log(ratio);
          return calculateYCoordinateAtXForNaca4Series(ratio, x);
      }
    };

    allCoordinates = getCoordinates(
      calculateYCoordinateAtX,
      numElementsForCoordinatesCurve
    );
    nodalCoordiantes = getCoordinates(
      calculateYCoordinateAtX,
      numElementsInMesh
    );

    const geometryPlotLayout = (() => {
      const layout = {
        xaxis: { title: "x, position along the chord" },
        mode: "lines",
      };

      switch (airfoilType) {
        case AirfoilType.Circle:
          return {
            ...layout,
            title: `Coordinates for Circle`, 
            width: 700,
            height: 600
          };
          case AirfoilType.Ellipse:
          return {
            ...layout,
            title: `Coordinates for Ellipse`, 
          };
          case AirfoilType.Naca4Series:
          return {
            ...layout,
            title: `Coordinates for NACA ${nacaId}`,
          };
      }
    })();

    const geometryPlotConfig = {
      responsive: true, width: 600, height: 600
    };

    Plotly.newPlot(
      "plot",
      [
        {
          ...allCoordinates,
          type: "scatter",
          mode: "lines",
          name: `Airfoil coordinates`,
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

  {#if airfoilType === AirfoilType.Naca4Series}
    <!-- <SelectList value={nacaId} validValues={nacaIds} /> -->
    
    <label for="naca-id-label">Select NACA ID:</label>
    
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
    /* Positions the label text bes ide the input */
    text-align: right;
  }

  label + select {
    width: 30%;
    /* Large margin-right to force the next element to the new-line
           and margin-left to create a gutter between the label and input */
    margin: 0 30% 0 4%;
  }
</style>
