import React from 'react';
import { Layer, LayerPassthrough } from '@bucky24/react-canvas-map';

import corner from "./images/corner.png";
import flat_horiz from "./images/flat_horiz.png";
import flat_vert from "./images/flat_vert.png";
import fill from "./images/fill.png";
import chunk_out from "./images/chunk_out.png";

export default function TerrainLayer({ terrainCells }) {
    const keys = terrainCells.map(({ x, y }) => {
        return `${x}_${y}`;
    });

    const images = [];

    terrainCells.forEach(({ x, y }) => {
        const upperLeft = keys.includes(`${x-1}_${y-1}`);
        const left = keys.includes(`${x-1}_${y}`);
        const lowerLeft = keys.includes(`${x-1}_${y+1}`);
        const lower = keys.includes(`${x}_${y+1}`);
        const lowerRight = keys.includes(`${x+1}_${y+1}`);
        const right = keys.includes(`${x+1}_${y}`);
        const upperRight = keys.includes(`${x+1}_${y-1}`);
        const upper = keys.includes(`${x}_${y-1}`);

        if (upperLeft && left && lowerLeft && lower && lowerRight && right && upperRight && upper) {
            images.push({
                src: fill,
                cellWidth: 1,
                cellHeight: 1,
                cellX: x,
                cellY: y,
            });
            return;
        }

        let upperLeftImage = null;
        if (!left && !upper) {
            upperLeftImage = corner;
        } else if (left && !upper) {
            upperLeftImage = flat_horiz;
        } else if (!left && upper) {
            upperLeftImage = flat_vert;
        } else if (left && upperLeft && upper) {
            upperLeftImage = fill;
        } else if (left && !upperLeft && upper) {
            upperLeftImage = chunk_out;
        }

        let upperRightImage = null;
        if (!upper && !right) {
            upperRightImage = corner;
        } else if (right && !upper) {
            upperRightImage = flat_vert;
        } else if (!right && upper) {
            upperRightImage = flat_horiz;
        } else if (right && upperRight && upper) {
            upperRightImage = fill;
        } else if (right && !upperRight && upper) {
            upperRightImage = chunk_out;
        }

        let lowerLeftImage = null;
        if (!left && !lower) {
            lowerLeftImage = corner;
        } else if (left && !lower) {
            lowerLeftImage = flat_vert;
        } else if (!left && lower) {
            lowerLeftImage = flat_horiz;
        } else if (left && lowerLeft && lower) {
            lowerLeftImage = fill;
        } else if (left && !lowerLeft && lower) {
            lowerLeftImage = chunk_out;
        }

        let lowerRightImage = null;
        if (!right && !lower) {
            lowerRightImage = corner;
        } else if (right && !lower) {
            lowerRightImage = flat_horiz;
        } else if (!right && lower) {
            lowerRightImage = flat_vert;
        } else if (right && lowerRight && lower) {
            lowerRightImage = fill;
        } else if (right && !lowerRight && lower) {
            lowerRightImage = chunk_out;
        }

        if (upperLeftImage) {
            images.push({
                src: upperLeftImage,
                cellWidth: 0.5,
                cellHeight: 0.5,
                cellX: x,
                cellY: y,
            });
        }

        if (upperRightImage) {
            images.push({
                src: upperRightImage,
                cellWidth: 0.5,
                cellHeight: 0.5,
                cellX: x,
                cellY: y,
                rot: 90,
                xOff: 0.5,
            });
        }

        if (lowerLeftImage) {
            images.push({
                src: lowerLeftImage,
                cellWidth: 0.5,
                cellHeight: 0.5,
                cellX: x,
                cellY: y,
                rot: 270,
                yOff: 0.5,
            });
        }

        if (lowerRightImage) {
            images.push({
                src: lowerRightImage,
                cellWidth: 0.5,
                cellHeight: 0.5,
                cellX: x,
                cellY: y,
                rot: 180,
                xOff: 0.5,
                yOff: 0.5,
            });
        }
    });

    return (
        <Layer>
            <LayerPassthrough
                layer={{ images }}
            />
        </Layer>
    );
}
