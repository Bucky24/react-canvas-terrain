import React from 'react';
import BaseProcessor from "./base";
import corner from "../images/land/corner.png";
import flat_horiz from "../images/land/flat_horiz.png";
import flat_vert from "../images/land/flat_vert.png";
import fill from "../images/land/fill.png";
import chunk_out from "../images/land/chunk_out.png";
import { LayerImage } from "@bucky24/react-canvas-map/build/LayerImage";

export default class LandProcessor extends BaseProcessor {
  getCell(x, y) {
    const images = [];
    const upperLeft = !!this.keys[`${x-1}_${y-1}`];
    const left = !!this.keys[`${x-1}_${y}`];
    const lowerLeft = !!this.keys[`${x-1}_${y+1}`];
    const lower = !!this.keys[`${x}_${y+1}`];
    const lowerRight = !!this.keys[`${x+1}_${y+1}`];
    const right = !!this.keys[`${x+1}_${y}`];
    const upperRight = !!this.keys[`${x+1}_${y-1}`];
    const upper = !!this.keys[`${x}_${y-1}`];
    
    if (upperLeft && left && lowerLeft && lower && lowerRight && right && upperRight && upper) {
      images.push({
        src: fill,
        width: 1,
        height: 1,
        x,
        y,
      });
      return images;
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
        x,
        y,
        width: 0.5,
        height: 0.5,
      });
    }
    
    if (upperRightImage) {
      images.push({
        src: upperRightImage,
        x,
        y,
        width: 0.5,
        height: 0.5,
        rot: 90,
        xOff: 0.5,
      });
    }
    
    if (lowerLeftImage) {
      images.push({
        src: lowerLeftImage,
        x,
        y,
        width: 0.5,
        height: 0.5,
        rot: 270,
        yOff: 0.5,
      });
    }
    
    if (lowerRightImage) {
      images.push({
        src: lowerRightImage,
        x,
        y,
        width: 0.5,
        height: 0.5,
        rot: 180,
        xOff: 0.5,
        yOff: 0.5,
      });
    }
    return images;
  }
}