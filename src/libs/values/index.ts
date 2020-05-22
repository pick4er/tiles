import type {
  TilesValuesConstructor,
  TilesValuesInterface,
  TileValue,
  TileId
} from '../types';

export const TilesValues: TilesValuesConstructor =
class TilesValues implements TilesValuesInterface {
  constructor(
    public ids: TileId[],
    public values: TileValue[]
  ) {}

  get idsToValues(): Record<TileId, TileValue> {
    return {}
  }

  get valuesToIds(): Record<TileValue, TileId[]> {
    return {}
  }

  isMatch(ids: TileId[]): boolean | undefined {
    return undefined
  }
}
