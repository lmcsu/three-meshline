# `@lmcx/three-meshline`

Provides a replacement for [@lume/three-meshline](https://github.com/lume/three-meshline) which is
a replacement for [three.meshline](https://github.com/spite/THREE.MeshLine) which is
a Mesh-based replacement for `THREE.Line` from
[Three.js](http://threejs.org), allowing line thicknesses of any size
(`THREE.Line` is limited to 1 pixel width), and other features.

# Why did I fork it?

- Fixed color issues with recent Three.js versions
- Fixed TypeScript issues and improved TypeScript support
- Switched to modern Vite-based build

# Why not just use the "meshline" package?

- It's not a true replacement for the original packages
- It has breaking changes, unstable behavior, and incompatibilities

# How to use

- Include script
- Create an array of 3D coordinates
- Create a `MeshLineGeometry` and assign the points
- Create a `MeshLineMaterial` to style the line points
- Create a `MeshLine` rendering object given the `MeshLineGeometry` and `MeshLineMaterial`

## Install

First install `@lmcx/three-meshline`:

```
pnpm add @lmcx/three-meshline
```

Finally import APIs into your JavaScript code:

```js
import { MeshLine, MeshLineGeometry, MeshLineMaterial } from '@lmcx/three-meshline'
```

### Create an array of 3D coordinates

First, create the list of numbers that will define the 3D points for the line.

```js
const points = []
for (let j = 0; j < Math.PI; j += (2 * Math.PI) / 100) {
	points.push(Math.cos(j), Math.sin(j), 0)
}
```

### Create a `MeshLineGeometry` and assign the points

Once you have that, you can create a new `MeshLineGeometry`, and call
`.setPoints()` passing the list of points.

```js
const geometry = new MeshLineGeometry()
geometry.setPoints(points)
```

Note: `.setPoints` accepts a second parameter, which is a function to define the
width in each point along the line. By default that value is 1, making the line
width 1 \* lineWidth in the material.

```js
// p is a decimal percentage of the number of points
// ie. point 200 of 250 points, p = 0.8
geometry.setPoints(points, p => 2) // makes width 2 * lineWidth
geometry.setPoints(points, p => 1 - p) // makes width taper from the beginning
geometry.setPoints(points, p => 1 - (1 - p)) // makes width taper from the end
geometry.setPoints(points, p => 2 + Math.sin(50 * p)) // makes width sinusoidal
```

### Create a `MeshLineMaterial`

A `MeshLine` needs a `MeshLineMaterial`:

```js
const material = new MeshLineMaterial(options)
```

By default it's a white material with line width 1 unit.

`MeshLineMaterial` accepts `options` to control the appereance of the `MeshLine`:

- `resolution` - `THREE.Vector2` specifying the canvas size (REQUIRED) (default:
  `new Vector2(1, 1)`)
- `map` - a `THREE.Texture` to paint along the line (requires `useMap` set to
  true) (default: `null`)
- `useMap` - tells the material to use `map` (`false` - solid color, `true` use
  texture) (default `false`)
- `alphaMap` - a `THREE.Texture` to use as alpha along the line (requires
  `useAlphaMap` set to true) (default: 'null')
- `useAlphaMap` - tells the material to use `alphaMap` (`false` - no alpha,
  `true` alpha from texture) (default: `false`)
- `repeat` - `THREE.Vector2` to define the texture tiling (applies to `map` and
  `alphaMap`) (default: `new Vector2(1, 1)`)
- `color` - `THREE.Color` to paint the line width, or tint the texture with
  (default: `new Color('white')`)
- `opacity` - alpha value from `0` to `1` (requires `transparent` set to `true`)
  (default: `1`)
- `alphaTest` - cutoff value from `0` to `1` (default: `0`)
- `dashArray` - the length and space between dashes. (`0` - no dash) (default: `0`)
- `dashOffset` - defines the location where the dash will begin. Ideal to
  animate the line. (default: `0`)
- `dashRatio` - defines the ratio between that is visible or not (`0` - more
  visible, `1` - more invisible) (default: `0.5`)
- `useDash` - whether to use dashes or not. Setting `dashArray` to a
  non-zero value automatically sets this to `true`. (`false` - no dashes, `true`
  - dashes) (default: `true`)
- `sizeAttenuation` - makes the line width constant regardless distance (1 unit
  is 1px on screen) (`false` - attenuate, `true` - don't attenuate) (default: `true`)
- `lineWidth` - width of the line (if `sizeAttenuation` is `true`, the value is
  in world units; othwerwise it is in screen pixels) (default: `1`)
- `visibility` - A number from `0` to `1` denoting the portion of the line that
  is visible, starting from the end (`0.5` means half of the line is visible, `0`
  means the whole line is invisible) (default: `1`)

If you're rendering transparent lines or using a texture with alpha map, you may
consider setting `depthTest` to `false`, `transparent` to `true` and `blending`
to an appropriate blending mode, or use `alphaTest`.

### Use `MeshLineGeometry` and `MeshLineMaterial` to create a `MeshLine`

Finally, we create a mesh and add it to the scene:

```js
const line = new MeshLine(geometry, material)
scene.add(line)
```

Note that `MeshLine` extends from `THREE.Mesh` and adds raycast support:

```js
const raycaster = new THREE.Raycaster()
// Use raycaster as usual:
raycaster.intersectObject(line)
```
