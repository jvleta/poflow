#pragma once

#include <string>
#include <vector>

#include "json.hpp"

using json = nlohmann::json;

struct Panel {
  double x1;
  double x2;
  double dx;
  double dy;
  double y1;
  double y2;
  double xc;
  double yc;
  double ds;
  double ci;
  double si;

  Panel(double x1, double x2, double y1, double y2) {
    // Compute element length.
    dx = x2 - x1;
    dy = y2 - y1;
    ds = std::sqrt(std::pow(dx, 2.0) + std::pow(dy, 2.0));

    // Compute centroid coords.
    xc = 0.5 * (x2 + x1);
    yc = 0.5 * (y2 + y1);

    // Compute projections.
    ci = dx / ds;
    si = dy / ds;
  }
};

std::string run_panel(std::string input) {
  auto data = json::parse(input);
  const auto xcoords = data["mesh"]["x"].get<std::vector<double>>();
  const auto ycoords = data["mesh"]["y"].get<std::vector<double>>();
  const int num_panels = xcoords.size() - 1;
  std::vector<Panel> panels;
  for (int i = 0; i < num_panels; ++i) {
    panels.emplace_back(xcoords[i], xcoords[i+1], ycoords[i], ycoords[i+1]);
  }
  return data["mesh"].dump(4);
}
