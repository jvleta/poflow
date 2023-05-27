#include <iostream>

#include "json.hpp"

#include "panel.hpp"

int main() {
  auto x = run_panel(R"(
  [{
    "a": 3.141,
    "happy": true
  }]
)");
  std::cout << x << "\n";
}
