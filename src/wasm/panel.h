#pragma once

#include <string>
#include <vector>

#include "json.hpp"

using json = nlohmann::json;

std::string run_panel(std::string input) {
  auto data = json::parse(input);
  return data[0]["a"];
}
