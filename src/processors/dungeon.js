import BaseProcessor from "./base";

import Ground0001 from '../images/dungeon/ground_0_0_0_1.png';
import GroundDefault from '../images/dungeon/ground_default.png';
import Ground1001 from '../images/dungeon/ground_1_0_0_1.png';
import Ground0011 from '../images/dungeon/ground_0_0_1_1.png';
import Ground1011 from '../images/dungeon/ground_1_0_1_1.png';
import Ground0010 from '../images/dungeon/ground_0_0_1_0.png';
import Ground1000 from '../images/dungeon/ground_1_0_0_0.png';
import Ground0100 from '../images/dungeon/ground_0_1_0_0.png';
import Ground1010 from '../images/dungeon/ground_1_0_1_0.png';
import Ground1111 from '../images/dungeon/ground_1_1_1_1.png';
import Ground1100 from '../images/dungeon/ground_1_1_0_0.png';
import Ground0110 from '../images/dungeon/ground_0_1_1_0.png';

import Corner1111 from '../images/dungeon/corner_1_1_1_1.png';
import Corner0011 from '../images/dungeon/corner_0_0_1_1.png';
import Corner1001 from '../images/dungeon/corner_1_0_0_1.png';
import Corner1100 from '../images/dungeon/corner_1_1_0_0.png';
import Corner1110 from '../images/dungeon/corner_1_1_1_0.png';

import CliffTopCenter from '../images/dungeon/cliff_top_center.png';
import CliffTopTop from '../images/dungeon/cliff_top_top.png';
import CliffTopRight from '../images/dungeon/cliff_top_right.png';
import CliffTopRightCorner from '../images/dungeon/cliff_top_right_corner.png';
import CliffTopLeft from '../images/dungeon/cliff_top_left.png';

const THING = "   \n" + 
              " X \n" +
              "-*-\n" +
              "---";
const THING2 = "   \n" + 
               "-.-\n" +
               "-*-\n" +
               "---";
const THING3 = "   \n" + 
               "*X \n" +
               "-*-\n" +
               "---";
const THING4 = "  -\n" + 
               " X*\n" +
               "-*-\n" +
               "---";
const THING5 = "- -\n" + 
               "*X*\n" +
               "-*-\n" +
               "---";
const THING6 = " * \n" + 
               "*X*\n" +
               " * \n" +
               "---";
const THING7 = "  -\n" + 
               " X*\n" +
               "- -\n" +
               "---";
const THING8 = "-  \n" + 
               "*X \n" +
               "- -\n" +
               "---";
const THING9 = " * \n" + 
               "*X*\n" +
               "***\n" +
               "---";
const THING10 = "-*-\n" + 
                " X \n" +
                "- -\n" +
                "---";
const THING11 = "- -\n" + 
                " . \n" +
                "   \n" +
                "-*-";
const THING12 = "- -\n" + 
                " . \n" +
                "- *\n" +
                "-*-";
const THING13 = "- -\n" + 
                "*X*\n" +
                "- -\n" +
                "---";
const THING14 = "***\n" + 
                "*X*\n" +
                "***\n" +
                "---";
const THING15 = "   \n" + 
                " . \n" +
                "   \n" +
                "--*";
const THING16 = "- -\n" + 
                " . \n" +
                "* -\n" +
                "-*-";
const THING17 = "**-\n" + 
                "*X \n" +
                "  -\n" +
                "---";
const THING18 = "-**\n" + 
                " X*\n" +
                "-  \n" +
                "---";
const THING19 = " * \n" + 
                "*X*\n" +
                "** \n" +
                "---";
const THING20 = "** \n" + 
                "*X*\n" +
                "** \n" +
                "---";
const THING21 = " **\n" + 
                "*X*\n" +
                " **\n" +
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
    } else if (compareGrid(THING4, grid)) {
      image = Ground0011;
    } else if (compareGrid(THING5, grid)) {
      image = Ground1011;
    } else if (compareGrid(THING6, grid)) {
      image = Corner1111;
    } else if (compareGrid(THING7, grid)) {
      image = Ground0010;
    } else if (compareGrid(THING8, grid)) {
      image = Ground1000;
    } else if (compareGrid(THING9, grid)) {
      image = Corner1100;
    } else if (compareGrid(THING10, grid)) {
      image = Ground0100;
    } else if (compareGrid(THING11, grid)) {
      image = CliffTopTop;
    } else if (compareGrid(THING12, grid)) {
      image = CliffTopRight;
    } else if (compareGrid(THING13, grid)) {
      image = Ground1010;
    } else if (compareGrid(THING14, grid)) {
      image = Ground1111;
    } else if (compareGrid(THING15, grid)) {
      image = CliffTopRightCorner;
    } else if (compareGrid(THING16, grid)) {
      image = CliffTopLeft;
    } else if (compareGrid(THING17, grid)) {
      image = Ground1100;
    } else if (compareGrid(THING18, grid)) {
      image = Ground0110;
    } else if (compareGrid(THING19, grid)) {
      image = Corner1110;
    } else if (compareGrid(THING20, grid)) {
      image = Corner0011;
    } else if (compareGrid(THING21, grid)) {
      image = Corner1001;
    }

    const log = y === 1 && x === 4;

    if (log) console.log(x, y, grid, THING16, compareGrid(THING16, grid), image);

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

    //console.log('found nothing for grid', grid);
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