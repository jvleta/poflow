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

export {
  linspace,
  AirfoilType,
  calculateYCoordinateAtXForEllipse,
  calculateYCoordinateAtXForNaca4Series,
};
