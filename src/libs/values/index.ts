import type {
  TilesValuesConstructor,
  TilesValuesInterface,
  TileValue,
  TileId
} from '../types';

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
      const valueName = this.values[valueId]
      const firstIdentifier = this.ids[identifierId]
      const secondIdentifier = this.ids[identifierId++]

      if (!this.valuesToIds[valueName]) {
        this.valuesToIds[valueName] = []
      }

      if (typeof secondIdentifier === 'undefined') {
        this.valuesToIds[this.values[0]] =
          this.valuesToIds[this.values[0]].concat(
            firstIdentifier
          )
      } else {
        this.valuesToIds[valueName] =
          this.valuesToIds[valueName].concat([
            firstIdentifier, secondIdentifier
          ])
      }

      valueId += 1;
      if (valueId === this.values.length) {
        valueId = 0;
      }
    }
  }

  get idsToValues(): Record<TileId, TileValue> {
    const idsToValues: Record<TileId, TileValue> = {}

    for (let value in Object.keys(this.valuesToIds)) {
      for (let identifier in this.valuesToIds[value]) {
        idsToValues[identifier] = value as TileValue
      }
    }

    return idsToValues
  }

  isMatch(ids?: TileId[]): boolean | undefined {
    if (!ids!.length) {
      return undefined
    }

    let currentValue: TileValue = ''
    for (let id in Object.keys(this.idsToValues)) {
      const value = this.idsToValues[id]

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