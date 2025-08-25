import BaseProcessor from "./base"

import Ground0001 from '../images/dungeon/ground_0_0_0_1.png';
import CliffTopCenter from '../images/dungeon/cliff_top_center.png';
import GroundDefault from '../images/dungeon/ground_default.png';
import Ground1001 from '../images/dungeon/ground_1_0_0_1.png';

const THING = "   \n" + 
              " X \n" +
              "-*-\n" +
              "---";
const THING2 = "   \n" + 
               " . \n" +
               "-*-\n" +
               "-*-";
const THING3 = "   \n" + 
               "*X \n" +
               "-*-\n" +
               "---";

function compareGrid(template, grid) {
  for (let i=0;i<template.length;i++) {
    const t = template[i];

    if (t === '-') {
      // in this case we don't care what we got from grid, it's a pass
      continue;
    }

    const g = grid[i];

    if (g !== t) {
      return false;
    }
  }

  return true;
}

export default class DungeonProcessor extends BaseProcessor {
  getCell(x, y) {
    const grid = this.getGrid(x, y);
    
    // now compare the grid to all of our checks to figure out what we should do with it

    let image = null;
    if (compareGrid(THING, grid)) {
      image = Ground0001;
    } else if (compareGrid(THING2, grid)) {
      image = CliffTopCenter;
    } else if (compareGrid(THING3, grid)) {
      image = Ground1001;
    }

    const type = this.keys[`${x}_${y}`];
    if (!image && (type === "ground" || type === "_")) {
      image = GroundDefault;
    }

    if (image) {
      return [
        {
          src: image,
          width: 1,
          height: 1,
          x,
          y,
        },
      ];
    }

    console.log('found nothing for grid', grid);
    return [];
  }

  getGrid(ox, oy) {
    const grid = [];
    // we basically want to know all neighbors but also the row of neighbors
    // two rows down
    for (let i=0;i<4;i++) {
      grid.push([]);

      for (let j=0;j<3;j++) {
        const x = j - 1 + ox;
        const y = i - 1 + oy;

        let type = this.keys[`${x}_${y}`] || ' ';
        if (type === 'ground') type = '*';
        if (type === 'hole') type = 'v';
        if (type === "_") type = "*";

        if (x == ox && y === oy) {
          if (type === '*') type = 'X';
          if (type === 'v') type = "x";
          if (type === ' ') type = '.';
        }

        grid[i][j] = type;
      }
    }

    return grid.map(line => line.join('')).join("\n");
  }
}