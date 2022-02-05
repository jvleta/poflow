#include <iostream>
#include<stdlib.h>


#include "json.hpp"

#include "geometry.h"

int main(int argc, char** argv) {
    
    int num_points = atoi(argv[1]);
    double ratio = atof(argv[2]);
    auto coords = poflow::get_naca00XX_coords(num_points, ratio);    
    auto text = poflow::coordinates_to_json(coords);
    std::cout << text.dump(4);;
}