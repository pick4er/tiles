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
  selectTwoDimensionalTiles,
  openTile as openTileAction
} from 'flux/modules/field';

import css from './index.module.scss'

interface Props {
  tiles: (OpenableTile[])[];
  values: Record<TileId, TileValue>;
  openTile: (id: TileId) => void;
}

function Field(props: Props) {
  const {
    tiles,
    values,
    openTile
  } = props

  return (
    <table className={css.field}>
      {tiles.map((tilesRow, row) => (
        <tr key={row}>
          {tilesRow.map(({ id, isOpen }) => (
            <td key={id}>
              <Tile
                id={id}
                isOpen={isOpen}
                onClick={openTile}
              >
                <div className={cx({
                  [values[id] as TileValue]: true,
                  [css.value]: true,
                })} />
              </Tile>
            </td>
          ))}
        </tr>
      ))}
    </table>
  )
}

const mapStateToProps = (state: RootState) => ({
  values: selectIdsToValues(state),
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
