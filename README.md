# node-ts-three-js--research-environment-shadow

## Research environment shadow

Idea 1:

1. create light sources from environment with very low intensity
2. render scene with ambient light intensity 1, no environment map, but low intensity light sources and shadows
3. screen space postprocessing pass, which adds environment light and environment shadows for hemisphere look up and shadow maps

Idea 2:

Manipulate material shader and occlude environment shadows with hemisphere look up directly in material shader.

## Resources

- https://animation.rwth-aachen.de/media/papers/2014-VMV-GlossySurfaces.pdf
- https://www.cs.cornell.edu/~pramook/papers/pixelcuts.pdf
- https://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=17F63CCF272305B6EF5B82C7A31C099B?doi=10.1.1.152.7245&rep=rep1&type=pdf
- https://jannovak.info/publications/ManyLightSTAR/index.html
- https://jannovak.info/publications/ManyLightSTAR/ManyLightSTAR.pdf
- https://diglib.eg.org/handle/10.2312/gch20161379
- https://vcg.isti.cnr.it/Publications/2016/SPCS16/final.pdf
- http://graphics.cs.aueb.gr/graphics/docs/papers/MultiviewAmbientOcclusion.pdf