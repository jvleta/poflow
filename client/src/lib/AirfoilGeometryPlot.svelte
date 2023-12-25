<div id="plot" />

<script>
  import Plotly from "plotly.js-dist";
  import { AirfoilType } from "./poflow";
  export let poFlowInput;
  export let allCoordinates = [];
  export let nodalCoordiantes = [];

  const geometryPlotLayout = (() => {
    const layout = {
      xaxis: { title: "x, position along the chord" },
      mode: "lines",
    };

    switch (poFlowInput.airfoilType) {
      case AirfoilType.Circle:
        return {
          ...layout,
          title: `Coordinates for Circle`,
        };
      case AirfoilType.Ellipse:
        return {
          ...layout,
          title: `Coordinates for Ellipse`,
        };
      case AirfoilType.Naca4Series:
        return {
          ...layout,
          title: `Coordinates for NACA ${poFlowInput.nacaId}`,
        };
    }
  })();

  const geometryPlotConfig = {
    responsive: true,
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
</script>

