#include <iostream>

#include "gtest/gtest.h"

#include "geometry.h"


TEST(EllipseGeometryTests, TwoToOneEllipse) {
  constexpr int num_points = 100;
  constexpr double ratio = 0.50;
  constexpr char filename[] = "ellipse21.txt";
  std::cout << poflow::get_ellipse_coords(num_points, ratio);
}

TEST(Naca00XXCoordinateTests, Naca0006) {
  constexpr int num_points = 100;
  constexpr double ratio = 0.06;
  constexpr char filename[] = "naca0006.txt";
  std::cout << poflow::get_naca00XX_coords(num_points, ratio);
}

TEST(Naca00XXCoordinateTests, Naca0008) {
  constexpr int num_points = 100;
  constexpr double ratio = 0.08;
  constexpr char filename[] = "naca0008.txt";
  std::cout << poflow::get_naca00XX_coords(num_points, ratio);
}

int main(int argc, char **argv) {
  testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}