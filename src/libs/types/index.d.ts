
export type TileId = string | number;
export type TileValue = string | number;

export interface BaseTile {
  id: TileId;
}

export interface OpenableTile extends BaseTile {
  isOpen: boolean;
}

export interface TilesInterface<Tile> {
  tiles: Tile[];
  twoDimensionalTiles: Tile[][];

  mix(): void;
}

export interface TilesConstructor<Tile> {
  new (
    public width: number,
    public height: number
  ): TilesInterface<Tile>;
}

export interface OpenableTilesConstructor 
  extends TilesConstructor<OpenableTile> {}

export interface OpenableTilesInterface
  extends TilesInterface<OpenableTile>
{
  tilesIds: TileId[];

  toggleTile(id: TileId): void;
}


export interface TilesValuesInterface {
  idsToValues: Record<TileId, TileValue>;
  valuesToIds: Record<TileValue, TileId[]>;

  isMatch(ids: TileId[]): boolean | undefined;
}

export interface TilesValuesConstructor {
  new (
    public ids: TileId[],
    public values: TileValue[]
  ): TilesValuesInterface;
}
