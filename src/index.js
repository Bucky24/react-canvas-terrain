import React, { useEffect, useState } from 'react';
import { Layer } from '@bucky24/react-canvas-map';
import LandProcessor from './processors/land';

export default function TerrainLayer({ terrainCells, processor }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        let instance = null;
        if (processor === "land") {
            instance = new LandProcessor(terrainCells);
        } else {
            throw new Error(`Unknown terrain processor ${processor}`);
        }

        const newImages = [];
        terrainCells.forEach(({ x, y }) => {
            newImages.push(...instance.getCell(x, y));
        });
        setImages(newImages);
    }, [terrainCells]);

    return (<Layer>
        {images}
    </Layer>);
}
