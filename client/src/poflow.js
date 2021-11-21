export const GetEllipseCoordinates =
    Module.cwrap('GetEllipseCoordinates', 'string', ['number', 'number']);

export const GetNaca00XXCoordinates =
    Module.cwrap('GetNaca00XXCoordinates', 'string', ['number', 'number']);