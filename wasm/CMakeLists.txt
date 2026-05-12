cmake_minimum_required(VERSION 3.20)
project(poflow CXX)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(panel main.cpp)

target_include_directories(panel PRIVATE
    /opt/homebrew/opt/eigen/include
)

if(EMSCRIPTEN)
    set_target_properties(panel PROPERTIES
        SUFFIX ".js"
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/../client/src/wasm"
    )
    target_link_options(panel PRIVATE
        -sALLOW_MEMORY_GROWTH=1
        -sMODULARIZE=1
        -sEXPORT_ES6=1
        -sEXPORT_NAME=createPanel
        --bind
    )
endif()
