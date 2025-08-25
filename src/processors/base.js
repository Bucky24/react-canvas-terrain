export default class BaseProcessor {
  constructor(terrainCells) {
    this.keys = terrainCells.reduce((obj, { x, y, type }) => {
        return {
          ...obj,
          [`${x}_${y}`]: type || '_',
        };
    }, {});
  }

  getCell(x, y) {
    throw new Error(`getCell should be overridden by child`);
  }
}