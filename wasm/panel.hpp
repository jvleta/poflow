#ifndef PANEL_H
#define PANEL_H

#include <eigen3/Eigen/Dense>
#include <iostream>

namespace panel {
void run_panel() {
  Eigen::Vector2d xcoords(10);
  for (const auto &x : xcoords) {
    std::cout << x << "\n";
  }
}
} // namespace panel

#endif