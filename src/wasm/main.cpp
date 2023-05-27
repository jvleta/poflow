#include <iostream>

#include "json.hpp"

#include "panel.h"

int main() {
 auto stuff = json::parse(R"(
  {
    "pi": 3.141,
    "happy": true
  }
)");

std::cout << stuff["pi"];
run_panel(R"(
  {
    "a": 3.141,
    "happy": true
  }
)");
}