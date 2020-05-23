import type {
  OpenableTile,
  TileValue,
  TileId
} from 'libs/types'

import React from 'react';
import Tile from 'components/Tile';

interface Props {
  tiles: (OpenableTile[])[];
  values: Record<TileId, TileValue>;
  toggleTile(id: TileId): void;
}

export default function Field(props: Props) {
  const {
    tiles,
    values,
    toggleTile
  } = props

  return (
    <div>
      {tiles.map((tilesRow, row) =>
        tilesRow.map(({ id, isOpen }, column) =>
          <Tile
            id={id}
            key={id}
            onClick={toggleTile}
            style={{
              'grid-row': row,
              'grid-column': column
            }}
          >
            <div className={values[id] as TileValue} />
          </Tile>
        )
      )}
    </div>
  )
}
