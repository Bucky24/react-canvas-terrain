import corner from "../images/corner.png";
import flat_horiz from "../images/flat_horiz.png";
import flat_vert from "../images/flat_vert.png";
import fill from "../images/fill.png";
import chunk_out from "../images/chunk_out.png";

class TerrainLayer {
    static getLayer(terrainCells) {
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

            let upperLeftImage = null;
            if (!left && !upperLeft && !upper) {
                upperLeftImage = corner;
            } else if (left && !upperLeft && !upper) {
                upperLeftImage = flat_horiz;
            } else if (!left && !upperLeft && upper) {
                upperLeftImage = flat_vert;
            } else if (left && upperLeft && upper) {
                upperLeftImage = fill;
            } else if (left && !upperLeft && upper) {
                upperLeftImage = chunk_out;
            } else if (left && upperLeft && !upper) {
                upperLeftImage = flat_horiz;
            } else if (!left && upperLeft && upper) {
                upperLeftImage = flat_vert;
            } else if (!left && upperLeft && !upper) {
                upperLeftImage = corner;
            }

            let upperRightImage = null;
            if (!upper && !upperRight && !right) {
                upperRightImage = corner;
            } else if (right && !upperRight && !upper) {
                upperRightImage = flat_vert;
            } else if (!right && !upperRight && upper) {
                upperRightImage = flat_horiz;
            } else if (right && upperRight && upper) {
                upperRightImage = fill;
            } else if (right && !upperRight && upper) {
                upperRightImage = chunk_out;
            } else if (right && upperRight && !upper) {
                upperRightImage = flat_vert;
            } else if (!right && upperRight && upper) {
                upperRightImage = flat_horiz;
            } else if (!right && upperRight && !upper) {
                upperRightImage = corner;
            }

            let lowerLeftImage = null;
            if (!left && !lowerLeft && !lower) {
                lowerLeftImage = corner;
            } else if (left && !lowerLeft && !lower) {
                lowerLeftImage = flat_vert;
            } else if (!left && !lowerLeft && lower) {
                lowerLeftImage = flat_horiz;
            } else if (left && lowerLeft && lower) {
                lowerLeftImage = fill;
            } else if (left && !lowerLeft && lower) {
                lowerLeftImage = chunk_out;
            } else if (left && lowerLeft && !lower) {
                lowerLeftImage = flat_vert;
            } else if (!left && lowerLeft && lower) {
                lowerLeftImage = flat_horiz;
            } else if (!left && lowerLeft && !lower) {
                lowerLeftImage = corner;
            }

            let lowerRightImage = null;
            if (!right && !lowerRight && !lower) {
                lowerRightImage = corner;
            } else if (right && !lowerRight && !lower) {
                lowerRightImage = flat_horiz;
            } else if (!right && !lowerRight && lower) {
                lowerRightImage = flat_vert;
            } else if (right && lowerRight && lower) {
                lowerRightImage = fill;
            } else if (right && !lowerRight && lower) {
                lowerRightImage = chunk_out;
            } else if (right && lowerRight && !lower) {
                lowerRightImage = flat_horiz;
            } else if (!right && lowerRight && lower) {
                lowerRightImage = flat_vert;
            } else if (!right && lowerRight && !lower) {
                lowerRightImage = corner;
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

        return {
            images,
            text: [],
        };
    }
}

export default TerrainLayer;
