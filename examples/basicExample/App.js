import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map } from "@bucky24/react-canvas-map";
import TerrainLayer from "@bucky24/react-canvas-terrain";


function App() {
    const width = 500;
    const height = 400;

    const [terrainCells, setCells] = useState([
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 3, y: 2 },
        { x: 3, y: 4 },
        { x: 2, y: 3 },
    ]);

    return (<div>
        <Canvas
            width={width}
            height={height}
        >
            <Map
                x={50}
                y={50}
                width={width-100}
                height={height-100}
                cellSize={60}
                xOff={0}
                yOff={0}
                mapBackground={{
                    color: "#00f",
                }}
                layers={[
                    TerrainLayer.getLayer(terrainCells),
                ]}
                onClick={(x, y) => {
                    const index = terrainCells.findIndex(({ x: tx, y: ty }) => {
                        return x == tx && y == ty;
                    });
                    if (index > -1) {
                        const newCells = [...terrainCells];
                        newCells.splice(index, 1);
                        setCells(newCells);
                    } else {
                        setCells([
                            ...terrainCells,
                            { x, y },
                        ]);
                    }
                }} 
            />
        </Canvas>
    </div>);
}

export default App;
