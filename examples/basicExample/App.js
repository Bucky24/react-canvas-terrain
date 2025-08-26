import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map } from "@bucky24/react-canvas-map";
import TerrainLayer from "@bucky24/react-canvas-terrain";
import { usePersistedState } from "@bucky24/toolbox/client";

function App() {
    const width = 700;
    const height = 700;

    const [terrainCells, setCells] = usePersistedState('cells', [
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 3, y: 2 },
        { x: 4, y: 3 },
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
                    color: "#000",
                }}
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
            >
                <TerrainLayer terrainCells={terrainCells} processor="dungeon" />
            </Map>
        </Canvas>
    </div>);
}

export default App;
