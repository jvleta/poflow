#include <iostream>

#include <emscripten/bind.h>

#include "panel.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(panel_module) { function("run_panel", &run_panel); };