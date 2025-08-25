import React, { useEffect, useState } from 'react';
import { Layer } from '@bucky24/react-canvas-map';
import LandProcessor from './processors/land';
import DungeonProcessor from './processors/dungeon';
import { LayerImage } from '@bucky24/react-canvas-map/build/LayerImage';

export default function TerrainLayer({ terrainCells, processor }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        let instance = null;
        if (processor === "land") {
            instance = new LandProcessor(terrainCells);
        } else if (processor === "dungeon") {
            instance = new DungeonProcessor(terrainCells);
        } else {
            throw new Error(`Unknown terrain processor ${processor}`);
        }

        // we need to process each terrain cell and all its neighbors
        const keys = new Set();
        for (const cell of terrainCells) {
            const { x, y } = cell;
            keys.add(`${x}_${y}`);
            keys.add(`${x-1}_${y-1}`);
            keys.add(`${x}_${y-1}`);
            keys.add(`${x+1}_${y-1}`);
            keys.add(`${x+1}_${y}`);
            keys.add(`${x+1}_${y+1}`);
            keys.add(`${x}_${y+1}`);
            keys.add(`${x-1}_${y+1}`);
            keys.add(`${x-1}_${y}`);
        }

        const newImages = [];
        Array.from(keys).forEach((key) => {
            const [x, y] = key.split("_");
            const images = instance.getCell(parseInt(x), parseInt(y));
            console.log(x, y, images);
            if (!images) return;
            if (Array.isArray(images)) {
                newImages.push(...images);
            } else {
                newImages.push(images);
            }
        });
        setImages(newImages);
    }, [terrainCells]);

    if (images.length === 0) return;
    console.log(images);
    return (<Layer>
        {images.map(data => {
            console.log(data);
            return <LayerImage {...data} />
        })}
    </Layer>);
}
