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

const panel = () =>{};
const body =() => {};
const matelm = () => {};
const point = () => {};
const survl = () => {};

const dostuff = () => {
  console.log("I am doing stuff");
};

export { linspace, calculateNacaFourSeriesYCoordinate, dostuff };
