#pragma once

#include <string>
#include <vector>

#include "json.hpp"

using json = nlohmann::json;

double run_panel(std::string input) {
  auto data = json::parse(input);
  
  return data[0]["a"].get<double>();
}
