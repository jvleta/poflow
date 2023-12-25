import Plotly from "plotly.js-dist";

const AirfoilType = {
  Circle: "Circle",
  Ellipse: "Ellipse",
  Naca4Series: "Naca 4-digit series",
};

const linspace = (start, stop, num, endpoint = true) => {
  const div = endpoint ? num - 1 : num;
  const step = (stop - start) / div;
  return Array.from({ length: num }, (_, i) => start + step * i);
};

const calculateYCoordinateAtXForEllipse = (ratio, x) => {
  const theta = Math.acos(x);
  return ratio * Math.sin(Math.PI - theta);
};

const calculateYCoordinateAtXForNaca4Series = (ratio, x) => {
  return (
    5.0 *
    ratio *
    (0.2969 * Math.sqrt(x) -
      0.126 * x -
      0.3516 * Math.pow(x, 2.0) +
      0.2843 * Math.pow(x, 3.0) -
      0.1015 * Math.pow(x, 4.0))
  );
};

const getCoordinates2 = (poFlowInput) => {
  const { airfoilType, nacaId, numElements } = poFlowInput;

  const numElementsPerSize = numElements / 2;
  const { xmin, xmax } = (() => {
    switch (airfoilType) {
      case AirfoilType.Circle:
      case AirfoilType.Ellipse:
        return { xmin: -1, xmax: 1 };
      case AirfoilType.Naca4Series:
        return { xmin: 0, xmax: 1 };
    }
  })();

  const xtop = linspace(xmin, xmax, numElementsPerSize + 1);
  const ytop = (() => {
    switch (airfoilType) {
      case AirfoilType.Circle:
        return xtop.map((x) => calculateYCoordinateAtXForEllipse(1.0, x));
      case AirfoilType.Ellipse:
        return xtop.map((x) => calculateYCoordinateAtXForEllipse(0.5, x));
      case AirfoilType.Naca4Series:
        const ratio = parseFloat(nacaId.substring(nacaId.length - 2)) / 100.0;
        return xtop.map((x) => calculateYCoordinateAtXForNaca4Series(ratio, x));
    }
  })();

  const x = xtop;
  const y = ytop;
  for (let i = numElementsPerSize; i >= 0; i--) {
    x.push(xtop[i]);
    y.push(-ytop[i]);
  }
  return {
    x,
    y,
  };
};

const updatePlot = (poFlowInput, allCoordinates, nodalCoordiantes) => {
  const geometryPlotLayout = (() => {
    const layout = {
      xaxis: { title: "x, position along the chord" },
      mode: "lines",
      width: 600,
      height: 600,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

    switch (poFlowInput.airfoilType) {
      case AirfoilType.Circle:
        return {
          ...layout,
          xaxis: {range: [-1.25, 1.25]},
          yaxis: {range: [-1.25, 1.25]}
        };
      case AirfoilType.Ellipse:
        return {
          ...layout,
          xaxis: {range: [-1.25, 1.25]},
          yaxis: {range: [-1.25, 1.25]}
        };
      case AirfoilType.Naca4Series:
        return {
          ...layout,
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
};

export { AirfoilType, getCoordinates2, updatePlot };
