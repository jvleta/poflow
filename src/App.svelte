<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist";

  let nacaId = "0012"; // Default NACA ID
  let coordinates = [];

  const nacaIds = [
    "0012",
    "0014",
    "0016" // Sample NACA IDs
    // Add more NACA IDs as needed
  ];

  const calculateCoordinates = () => {
    const thicknessToLengthRaio =
      parseFloat(nacaId.substring(nacaId.length - 2)) / 100.0;

    coordinates = []; // Clear previous coordinates
    for (let x = 0; x <= 1; x += 0.001) {
      const y =
        5.0 *
        thicknessToLengthRaio *
        (0.2969 * Math.sqrt(x) -
          0.126 * x -
          0.3516 * Math.pow(x, 2.0) +
          0.2843 * Math.pow(x, 3.0) -
          0.1015 * Math.pow(x, 4.0));
      coordinates.push({ x, y });
    }

    for (let x = 0; x <= 1; x += 0.001) {
      const y =
        -5.0 *
        thicknessToLengthRaio *
        (0.2969 * Math.sqrt(x) -
          0.126 * x -
          0.3516 * Math.pow(x, 2.0) +
          0.2843 * Math.pow(x, 3.0) -
          0.1015 * Math.pow(x, 4.0));
      coordinates.push({ x, y });
    }

    // Plot the coordinates using Plotly
    const plotData = {
      x: coordinates.map((coord) => coord.x),
      y: coordinates.map((coord) => coord.y),
      type: "scatter",
      mode: "lines",
      name: `NACA ${nacaId}`,
    };

    const plotLayout = {
      title: `Coordinates for NACA ${nacaId}`,
      xaxis: { title: "X" },
      yaxis: { title: "Y", range: [-0.2, 0.2] },
      mode: 'lines'
    };

    const plotConfig = {
      responsive: true,
    };

    Plotly.newPlot("plot", [plotData], plotLayout, plotConfig);
  };

  onMount(() => {
    calculateCoordinates(); // Initial coordinate calculation
  });

  const handleNacaIdChange = () => {
    calculateCoordinates(); // Recalculate coordinates on NACA ID change
  };
</script>

<main>
  <h1>NACA Airfoil Coordinate Plotter</h1>

  <label for="naca-id">Select NACA ID:</label>
  <select id="naca-id" bind:value={nacaId} on:change={handleNacaIdChange}>
    {#each nacaIds as id}
      <option value={id}>{id}</option>
    {/each}
  </select>

  <h2 id="plotTitle">Coordinates for NACA {nacaId}</h2>

  <div id="plot" />
</main>

<style>
  #plot {
    width: 600px;
    height: 400px;
    margin: 20px auto;
  }
</style>
