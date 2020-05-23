import type {
  OpenableTilesConstructor,
  OpenableTilesInterface,
  OpenableTile,
  TileId
} from '../types';

export const OpenableTiles: OpenableTilesConstructor =
class OpenableTiles implements OpenableTilesInterface {
  public tiles: OpenableTile[] = [];

  constructor(
    public width: number,
    public height: number
  ) {
    this.generate();
  }

  private generate(): void {
    for (let id = 0; id < this.width * this.height; id++) {
      this.tiles.push({
        id,
        isOpen: false
      })
    }
  }

  get tilesIds(): TileId[] {
    return this.tiles.map(({ id }) => id)
  }

  get twoDimensionalTiles(): (OpenableTile[])[] {
    const twoDimensionalTiles: (OpenableTile[])[] = [];

    for (let h = 0; h < this.height; h++) {
      const rowTiles: OpenableTile[] = [];

      for (let w = 0; w < this.width; w++) {
        rowTiles.push(this.tiles[w + (h * this.width)])
      }

      twoDimensionalTiles.push(rowTiles)
    }

    return twoDimensionalTiles
  }

  toggleTile(id: TileId): void {
    const tile = this.tiles.find(
      ({ id: _id }) => _id === id
    )

    if (!tile) {
      throw new TypeError('No tile matches provided id')
    }

    tile.isOpen = !tile.isOpen
  }

  mix(): void {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)) as number
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]]
    }
  }
}
