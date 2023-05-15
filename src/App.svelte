<!-- App.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-dist';

  let nacaId = '2412'; // Default NACA ID
  let coordinates: { x: number, y: number }[] = [];

  const nacaIds: string[] = [
    '0012', '2412', '4412', '2415', // Sample NACA IDs
    // Add more NACA IDs as needed
  ];

  const calculateCoordinates = (): void => {
    // Calculate coordinates based on the selected NACA ID
    // You can replace this function with the appropriate NACA coordinate calculation logic

    // Example code to calculate coordinates (modify as needed)
    coordinates = []; // Clear previous coordinates

    // For simplicity, we'll just use a random set of coordinates
    for (let x = 0; x <= 1; x += 0.1) {
      const y = Math.random() * 0.2; // Generate random y-coordinate
      coordinates.push({ x, y });
    }

    // Plot the coordinates using Plotly
    const plotData = {
      x: coordinates.map(coord => coord.x),
      y: coordinates.map(coord => coord.y),
      type: 'scatter',
      mode: 'lines+markers',
      name: `NACA ${nacaId}`,
    };

    const plotLayout = {
      title: `Coordinates for NACA ${nacaId}`,
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' },
    };

    const plotConfig = {
      responsive: true,
    };

    Plotly.newPlot('plot', [plotData], plotLayout, plotConfig);
  };

  onMount(() => {
    calculateCoordinates(); // Initial coordinate calculation
  });

  const handleNacaIdChange = (): void => {
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

  <div id="plot"></div>
</main>

<style>
  #plot {
    width: 600px;
    height: 400px;
    margin: 20px auto;
  }
</style>
