#!/bin/bash

# g++ geometry.cpp main.cpp
emcc geometry.cpp -o geometry.html -s EXPORTED_FUNCTIONS='["_GetEllipseCoordinates", "_GetNaca00XXCoordinates"]' -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]'
mv geometry.js ../client/src/wasm/
mv geometry.wasm ../client/src/wasm/