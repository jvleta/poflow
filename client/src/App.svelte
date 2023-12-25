<script>
  import { onMount } from "svelte";
  import { Container, Form, Row, Col } from "sveltestrap";

  import AirfoilTypeInput from "./lib/AirfoilTypeInput.svelte";
  import NacaIdInput from "./lib/NacaIdInput.svelte";
  import NumberOfElementsInput from "./lib/NumberOfElementsInput.svelte";
  import AirfoilGeometryPlot from "./lib/AirfoilGeometryPlot.svelte";

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

  onMount(() => {
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

<Container>
  <main>
    <Row>
      <h1>PoFlow</h1>
      <h2>An ideal solution to potential flow analysis</h2>
    </Row>
    <Row style="border:1px solid black">
      <Col>
        <Form>
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
        </Form>
      </Col>

      <Col>
        <div id="plot" />
      </Col>
    </Row>
    
  </main>
</Container>
