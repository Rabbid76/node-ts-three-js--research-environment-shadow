# Notes

## Research environment shadow

Idea 1:

1. create light sources from environment with very low intensity
2. render scene with ambient light intensity 1, no environment map, but low intensity light sources and shadows
3. screen space postprocessing pass, which adds environment light and environment shadows for hemisphere look up and shadow maps

Idea 2:

Manipulate material shader and occlude environment shadows with hemisphere look up directly in material shader.