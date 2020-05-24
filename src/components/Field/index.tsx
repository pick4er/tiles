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
import cx from 'classnames';

import Tile from 'components/Tile';
import {
  selectIdsToValues,
  selectIdsToMatch,
  selectTwoDimensionalTiles,
  openTile as openTileAction
} from 'flux/modules/field';

import css from './index.module.scss'

interface Props {
  tiles: (OpenableTile[])[];
  idsToMatch: TileId[];
  values: Record<TileId, TileValue>;
  openTile: (id: TileId) => void;
}

function Field(props: Props) {
  const {
    tiles,
    values,
    openTile,
    idsToMatch,
  } = props

  return (
    <div className={css.field}>
      {tiles.map((tilesRow, row) =>
        tilesRow.map(({ id, isOpen }, column) =>
          <Tile
            id={id}
            key={id}
            isOpen={isOpen}
            onClick={openTile}
            className={cx({
              [css.hidden]: isOpen
                && (idsToMatch.indexOf(id) === -1)
            })}
            style={{
              // indexing from 0, grid from 1
              gridRow: row + 1,
              gridColumn: column + 1
            }}
          >
            <div className={cx({
              [values[id] as TileValue]: true,
              [css.value]: true,
            })} />
          </Tile>
        )
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  values: selectIdsToValues(state),
  idsToMatch: selectIdsToMatch(state),
  tiles: selectTwoDimensionalTiles(state),
})
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => ({
  openTile: (id: TileId) => 
    dispatch(openTileAction(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field)
