import type {
  OpenableTilesConstructor,
  OpenableTilesInterface,
  OpenableTile,
  TileId
} from '../types';

export const OpenableTiles: OpenableTilesConstructor =
class OpenableTiles implements OpenableTilesInterface {
  constructor(
    public width: number,
    public height: number
  ) {}

  get tiles(): OpenableTile[] {
    return []
  }

  get twoDimensionalTiles(): OpenableTile[][] {
    return []
  }

  get tilesIds(): TileId[] {
    return []
  }

  mix(): void {
    return undefined
  }

  toggleTile(): void {
    return undefined
  }
}
