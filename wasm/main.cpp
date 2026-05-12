#include <emscripten/bind.h>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("greet", &greet);
}
