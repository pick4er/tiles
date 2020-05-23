import type {
  OpenableTile,
  TileValue,
  TileId
} from 'types'

import React from 'react';
import { connect } from 'react-redux';

import Tile from 'components/Tile';

interface Props {
  tiles?: (OpenableTile[])[];
  values?: Record<TileId, TileValue>;
  toggleTile?: (id: TileId) => void;
}

function Field(props: Props) {
  const {
    tiles = [],
    values = {},
    toggleTile = () => {},
  } = props

  return (
    <div>
      {tiles.map((tilesRow, row) =>
        tilesRow.map(({ id, isOpen }, column) =>
          <Tile
            id={id}
            key={id}
            isOpen={isOpen}
            onClick={toggleTile}
            style={{
              gridRow: row,
              gridColumn: column
            }}
          >
            <div className={values[id] as TileValue} />
          </Tile>
        )
      )}
    </div>
  )
}

const mapStateToProps = () => {}
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field)
