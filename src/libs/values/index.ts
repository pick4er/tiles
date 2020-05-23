import type {
  TilesValuesConstructor,
  TilesValuesInterface,
  TileValue,
  TileId
} from 'libs/types';

export const TilesValues: TilesValuesConstructor =
class TilesValues implements TilesValuesInterface {
  valuesToIds: Record<TileValue, TileId[]> = {};

  constructor(
    public ids: TileId[],
    public values: TileValue[]
  ) {
    this.generate();
  }

  private generate(): void {
    let identifierId = 0;
    let valueId = 0;

    while (identifierId < this.ids.length) {
      const value = this.values[valueId]
      const firstIdentifier = this.ids[identifierId]
      const secondIdentifier = this.ids[identifierId + 1]

      if (!this.valuesToIds[value]) {
        this.valuesToIds[value] = []
      }

      // out of ids range
      if (typeof secondIdentifier === 'undefined') {
        // identifier must have a value couple
        this.valuesToIds[value] =
          this.valuesToIds[value].concat(
            firstIdentifier
          )
      } else {
        this.valuesToIds[value] =
          this.valuesToIds[value].concat([
            firstIdentifier, secondIdentifier
          ])
      }

      valueId += 1;
      if (valueId === this.values.length) {
        valueId = 0;
      }

      identifierId += 2; // two symbols at least
    }
  }

  get idsToValues(): Record<TileId, TileValue> {
    const idsToValues: Record<TileId, TileValue> = {}

    for (let value of Object.keys(this.valuesToIds)) {
      for (let identifier of this.valuesToIds[value]) {
        idsToValues[identifier] = value as TileValue
      }
    }

    return idsToValues
  }

  isMatch(ids?: TileId[]): boolean | undefined {
    if (typeof ids === 'undefined') {
      return undefined
    }

    let currentValue: TileValue = ''
    for (let identifier of ids) {
      const value = this.idsToValues[identifier]

      if (!currentValue) {
        currentValue = value
      } else if (value === currentValue) {
        continue
      } else {
        return false
      }
    }

    return true
  }
}