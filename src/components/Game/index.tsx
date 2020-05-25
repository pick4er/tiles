import type { SyntheticEvent, ReactElement } from 'react';
import type { ThunkDispatch } from 'redux-thunk';
import type { Action } from 'redux';
import type { TileValue } from 'types';
import type { RootState } from 'flux/types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Field from 'components/Field';
import { selectRound } from 'flux/modules/game';
import {
  WinNotifications,
  MatchNotifications,
} from 'flux/types';
import {
  selectLeftTiles,
  initField as initFieldAction,
  startNewGame as startNewGameAction,
} from 'flux/modules/field';
import {
  selectIsMatchNotification,
  selectIsWinNotification
} from 'flux/modules/notifications';

import css from './index.module.scss';

interface Props {
  round: number;
  tilesLeft?: number;
  matchNotification?: MatchNotifications;
  winNotification?: WinNotifications;
  initField(values: TileValue[]): void;
  startNewGame(
    values: TileValue[],
    width?: number,
    height?: number
  ): void;
}

function parseMatchNotification(
  notification: MatchNotifications | undefined,
): string | undefined {
  if (notification === MatchNotifications.Match) {
    return 'You guessed!';
  }

  if (notification === MatchNotifications.NotMatch) {
    return 'Fail. Try again, please';
  }

  return undefined;
}

function parseWinNotification(
  notification: WinNotifications | undefined,
): string | undefined {
  if (notification === WinNotifications.Win) {
    return 'YOU WIN!!!'
  }

  if (notification === WinNotifications.Loose) {
    return 'Game over. Try again'
  }

  return undefined
}

const defaultValues = [
  css.vinousRed,
  css.grassGreen,
  css.azure,
  css.tulipPurple,
  css.grey,
  css.yellow,
  css.pink,
  css.purple,
  css.solidRed,
  css.babyBlue,
  css.brown,
  css.avocadoGreen,
  css.oceanBlue,
];
function Game(props: Props): ReactElement {
  const {
    round,
    initField,
    tilesLeft,
    matchNotification,
    winNotification,
    startNewGame,
  } = props;

  useEffect(() => {
    initField(defaultValues);
  }, [initField]);

  const onStartNewGame = ($event: SyntheticEvent) => {
    $event.preventDefault();
    const target = $event.target as typeof $event.target & {
      width: { value: string };
      height: { value: string };
    };

    startNewGame(
      defaultValues,
      parseInt(target.width.value, 10),
      parseInt(target.height.value, 10),
    );
  };

  return (
    <div className={css.game}>
      <div className={css.info}>
        <h3>Round { round }</h3>
        <h5 className={cx({
          [css.hidden]: !tilesLeft
        })}>
          { tilesLeft } tiles left to guess
        </h5>
        {winNotification ? (
          <h5 className={cx({
            [css.hidden]: !winNotification 
          })}>
            { parseWinNotification(winNotification) }
          </h5>
        ) : (
          <h5 className={cx({
            [css.hidden]: !matchNotification 
          })}>
            { parseMatchNotification(matchNotification) }
          </h5>
        )}
      </div>

      <Field />

      <form
        name="newGame"
        onSubmit={onStartNewGame}
      >
        <label htmlFor="width">
          <div>
            Width (from 1 to 10):
            <input
              name="width"
              placeholder="width"
              type="number"
              defaultValue={4}
              autoComplete="off"
              min={1}
              max={10}
            />
          </div>
        </label>

        <label htmlFor="height">
          <div>
            Height (from 1 to 10):
            <input
              name="height"
              placeholder="height"
              type="number"
              defaultValue={4}
              autoComplete="off"
              min={1}
              max={10}
            />
          </div>
        </label>
        <button type="submit">
          Try again
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  round: selectRound(state),
  tilesLeft: selectLeftTiles(state),
  matchNotification: selectIsMatchNotification(state),
  winNotification: selectIsWinNotification(state),
});
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => ({
  initField: (
    values: TileValue[],
  ) => dispatch(initFieldAction(values)),
  startNewGame: (
    values: TileValue[],
    width?: number,
    height?: number,
  ) => dispatch(startNewGameAction(values, width, height)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
