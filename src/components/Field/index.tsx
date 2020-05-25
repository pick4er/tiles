import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'flux/types';
import type { Action } from 'redux';
import type {
  OpenableTile,
  TileValue,
  TileId,
} from 'types';

import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Tile from 'components/Tile';
import {
  selectIsGameOver,
  selectIdsToMatch,
  selectIdsToValues,
  selectTwoDimensionalTiles,
  openTile as openTileAction,
} from 'flux/modules/field';

import css from './index.module.scss';

interface Props {
  tiles: (OpenableTile[])[];
  idsToMatch: TileId[];
  isGameOver: boolean;
  values: Record<TileId, TileValue>;
  openTile: (id: TileId) => void;
}

function Field(props: Props) {
  const {
    tiles,
    values,
    openTile,
    isGameOver,
    idsToMatch,
  } = props;

  return (
    <table className={css.field}>
      <tbody>
        {tiles.map((tilesRow, row) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <tr key={row}>
            {tilesRow.map(({ id, isOpen }) => (
              <td key={id}>
                <Tile
                  id={id}
                  isOpen={isOpen}
                  onClick={openTile}
                  disabled={isGameOver}
                  className={cx({
                    [css.guessed]: isOpen
                      && idsToMatch.indexOf(id) === -1,
                  })}
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
      </tbody>
    </table>
  );
}

const mapStateToProps = (state: RootState) => ({
  values: selectIdsToValues(state),
  idsToMatch: selectIdsToMatch(state),
  tiles: selectTwoDimensionalTiles(state),
  isGameOver: selectIsGameOver(state),
});
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => ({
  openTile: (id: TileId) => dispatch(openTileAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Field);
