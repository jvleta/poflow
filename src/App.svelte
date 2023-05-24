<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js-dist";

  let nacaId = "0012";
  let numElements = 10;
  let coordinates = [];

  const nacaIds = ["0012", "0014", "0016"];

  const numElementOptions = [10, 12, 16, 18, 20];

  const linspace = (start, stop, num, endpoint = true) => {
    const div = endpoint ? num - 1 : num;
    const step = (stop - start) / div;
    return Array.from({ length: num }, (_, i) => start + step * i);
  };

  const calculateNacaFourSeriesYCoordinate = (thicknessToLengthRaio, x) => {
    return (
      5.0 *
      thicknessToLengthRaio *
      (0.2969 * Math.sqrt(x) -
        0.126 * x -
        0.3516 * Math.pow(x, 2.0) +
        0.2843 * Math.pow(x, 3.0) -
        0.1015 * Math.pow(x, 4.0))
    );
  };

  const calculateCoordinates = () => {
    const ratio = parseFloat(nacaId.substring(nacaId.length - 2)) / 100.0;

    const xgrid = linspace(0.0, 1.0, 1000);

    coordinates = [];
    xgrid.forEach((x) => {
      const y = calculateNacaFourSeriesYCoordinate(ratio, x);
      coordinates.push({ x, y });
    });

    coordinates.forEach((coord) => {
      const x = coord.x;
      const y = -coord.y;
      coordinates.push({ x, y });
    });

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
      mode: "lines",
    };

    const plotConfig = {
      responsive: true,
    };

    Plotly.newPlot("plot", [plotData], plotLayout, plotConfig);
  };

  onMount(() => {
    calculateCoordinates();
  });

  const handleNacaIdChange = () => {
    calculateCoordinates();
  };

  const handleNumElementsChange = () => {};
</script>

<main>
  <h1>NACA Airfoil Coordinate Plotter</h1>

  <label for="naca-id">Select NACA ID:</label>
  <select id="naca-id" bind:value={nacaId} on:change={handleNacaIdChange}>
    {#each nacaIds as id}
      <option value={id}>{id}</option>
    {/each}
  </select>
  <label for="num-elements">Select number of elements:</label>
  <select
    id="num-elements"
    bind:value={numElements}
    on:change={handleNumElementsChange}
  >
    {#each numElementOptions as numElementOption}
      <option value={numElementOption}>{numElementOption}</option>
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
