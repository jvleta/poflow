#pragma once

#include <ranges>
#include <string>
#include <vector>

#include "json.hpp"

using json = nlohmann::json;

struct Panel {
  double x1 = 0.0, x2 = 0.0;
  double dx = 0.0, dy = 0.0;
  double y1 = 0.0, y2 = 0.0;
  double xc = 0.0, yc = 0.0;
  double ds = 0.0, ci = 0.0, si = 0.0;

  Panel(double x1, double x2, double y1, double y2) {
    // Compute element length.
    double dx = x2 - x1;
    double dy = y2 - y1;
    double ds = std::sqrt(std::pow(dx, 2.0) + std::pow(dy, 2.0));

    // Compute centroid coords.
    double xc = 0.5 * (x2 + x1);
    double yc = 0.5 * (y2 + y1);

    // Compute projections.
    double ci = dx / ds;
    double si = dy / ds;
  }
};

std::string run_panel(std::string input) {
  auto data = json::parse(input);
  const auto x = data["mesh"]["x"].get<std::vector<double>>();
  const auto y = data["mesh"]["y"].get<std::vector<double>>();

  const int num_panels = x.size() - 1;

  std::vector<double> xc(num_panels);
  std::vector<double> yc(num_panels);
  std::vector<double> ci(num_panels);
  std::vector<double> si(num_panels);


  for (int i = 0; i < num_panels; ++i) {
    double x2 = x[i+1];
    double x1 = x[i];
    double y2 = y[i+1];
    double y1 = y[i];
    double dx = x2 - x1;
    double dy = y2 - y1;
    double ds = std::sqrt(std::pow(dx, 2.0) + std::pow(dy, 2.0));

    xc[i] = 0.5 * (x1 + x2);
    yc[i] = 0.5 * (y1 + y2);
    ci[i] = dx / ds;
    si[i] = dy / ds;

  }

  return data["mesh"].dump(4);
}
