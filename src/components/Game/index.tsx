import type { ThunkDispatch } from 'redux-thunk';
import type { SyntheticEvent } from 'react';
import type { Action } from 'redux';
import type { TileValue } from 'types';
import type { RootState } from 'flux/types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';
import { MatchNotifications } from 'flux/types';
import { selectRound } from 'flux/modules/game';
import {
  selectLeftTiles,
  initField as initFieldAction,
  startNewGame as startNewGameAction,
} from 'flux/modules/field';
import {
  selectIsMatchNotification,
} from 'flux/modules/notifications';

import css from './index.module.scss';

interface Props {
  round: number;
  tilesLeft?: number;
  notification?: MatchNotifications;
  initField(values: TileValue[]): void;
  startNewGame(
    values: TileValue[],
    width?: number,
    height?: number
  ): void;
}

function parseNotification(
  notification: MatchNotifications,
): string | undefined {
  if (notification === MatchNotifications.Match) {
    return 'You guessed!';
  }

  if (notification === MatchNotifications.NotMatch) {
    return 'Fail. Try again, please';
  }
}

const defaultValues = [
  css.red, css.green, css.yellow,
  css.purple, css.grey, css.azure,
];
function Game(props: Props) {
  const {
    round,
    initField,
    tilesLeft,
    notification,
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
      <h3>Round { round }</h3>
      <h5>
        {tilesLeft && (
          <span>
            { tilesLeft } tiles left to guess
          </span>
        )}
        {notification && (
          <span>{ parseNotification(notification) }</span>
        )}
      </h5>

      <Field />

      <form
        name="newGame"
        onSubmit={onStartNewGame}
      >
        <label>
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
        </label>

        <label>
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
        </label>
        <button type="submit">
          Start again
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  round: selectRound(state),
  tilesLeft: selectLeftTiles(state),
  notification: selectIsMatchNotification(state),
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
