#include <iostream>

#include "json.hpp"

#include "panel.hpp"

int main() {
  auto x = run_panel(R"(
{
  "mesh": {
      "x": [
          0,
          0.2,
          0.4,
          0.6000000000000001,
          0.8,
          1,
          1,
          0.8,
          0.6000000000000001,
          0.4,
          0.2,
          0
      ],
      "y": [
          0,
          0.057375429902362496,
          0.05803010847647902,
          0.045633690658677804,
          0.026231179804725006,
          0.0012599999999999777,
          -0.0012599999999999777,
          -0.026231179804725006,
          -0.045633690658677804,
          -0.05803010847647902,
          -0.057375429902362496,
          0
      ]
  }
}
)");
  std::cout << x << "\n";
}
