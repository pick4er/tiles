
export type TileId = string | number;
export type TileValue = string;

export interface BaseTile {
  id: TileId;
}

export interface OpenableTile extends BaseTile {
  isOpen: boolean;
}

export interface TilesInterface<Tile> {
  tiles: Tile[];
  twoDimensionalTiles: (Tile[])[];

  mix(): void;
}

export interface TilesConstructor<
  Interface extends TilesInterface<any>
> {
  new (
    width: number,
    height: number
  ): Interface;
}

export interface OpenableTilesConstructor
  extends TilesConstructor<OpenableTilesInterface> {}

export interface OpenableTilesInterface
  extends TilesInterface<OpenableTile>
{
  tilesIds: TileId[];

  toggleTile(id: TileId): void;
}

export interface TilesValuesInterface {
  idsToValues: Record<TileId, TileValue>;
  valuesToIds: Record<TileValue, TileId[]>;

  isMatch(ids?: TileId[]): boolean | undefined;
}

export interface TilesValuesConstructor {
  new (
    ids: TileId[],
    values: TileValue[]
  ): TilesValuesInterface;
}
