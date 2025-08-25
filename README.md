# react-canvas-terrain

This module provides a way to draw responsive terrain on top of a `Map` from `@bucky24/react-canvas-map` (https://www.npmjs.com/package/@bucky24/react-canvas-map)

# Dependencies

This module depends on `@bucky24/react-canvas-map` as a peer dependency, with a min version of `0.8.0`.

# Usage

## TerrainLayer

This is the default and currently only component exported by this module. The TerrainLayer is a `Layer` that contains only terrain information.

### Parameters

| Param | Description | Required |
| -- | -- | -- |
| terrainCells | list of TerrainCell objects | Yes |
| processor | Determines which terrain processor to use. One of [PROCESSOR](#processor) | Yes |

## TerrainCell

This is the main object that describes where terrain falls on the map.

| Param | Description | Required |
| -- | -- | -- |
| x | The X coordinate of the terrain cell | Yes |
| y | The Y coordinate of the terrain cell | Yes |
| type | Type of the cell. See specific processor for details | No |

## PROCESSOR

| Name | Description |
| -- | -- |
| land | Land processor. Meant for generating land masses and islands. Type is not used |