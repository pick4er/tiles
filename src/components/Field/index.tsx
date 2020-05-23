import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'flux/types';
import type { Action } from 'redux';
import type {
  OpenableTile,
  TileValue,
  TileId
} from 'types'

import React from 'react';
import { connect } from 'react-redux';

import Tile from 'components/Tile';
import {
  selectIdsToValues,
  selectTwoDimensionalTiles,
  toggleTile as toggleTileAction
} from 'flux/modules/field';

import styles from './index.module.scss'

interface Props {
  tiles: (OpenableTile[])[];
  values: Record<TileId, TileValue>;
  toggleTile: (id: TileId) => void;
}

function Field(props: Props) {
  const {
    tiles,
    values,
    toggleTile,
  } = props

  return (
    <div className={styles.field}>
      {tiles.map((tilesRow, row) =>
        tilesRow.map(({ id, isOpen }, column) =>
          <Tile
            id={id}
            key={id}
            isOpen={isOpen}
            onClick={toggleTile}
            style={{
              // indexing from 0, grid from 1
              gridRow: row + 1,
              gridColumn: column + 1
            }}
          >
            <div className={values[id] as TileValue} />
          </Tile>
        )
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  values: selectIdsToValues(state),
  tiles: selectTwoDimensionalTiles(state),
})
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => ({
  toggleTile: (id: TileId) => 
    dispatch(toggleTileAction(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field)
