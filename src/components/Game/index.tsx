import type { ThunkDispatch } from 'redux-thunk';
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
  selectIsMatchNotification
} from 'flux/modules/notifications';

import css from './index.module.scss';

interface Props {
  round: number;
  tilesLeft?: number;
  notification?: MatchNotifications;
  startNewGame(values: TileValue[]): void;
  initField(values: TileValue[]): void;
}

function parseNotification(
  notification: MatchNotifications
): string | undefined {
  if (notification === MatchNotifications.Match) {
    return 'You guessed!'
  }

  if (notification === MatchNotifications.NotMatch) {
    return 'Fail. Try again, please'
  }

  return
}

const defaultValues = [
  css.red, css.green, css.yellow,
  css.purple, css.grey, css.azure
]
function Game(props: Props) {
  const {
    round,
    initField,
    tilesLeft,
    notification,
    startNewGame,
  } = props;

  useEffect(() => {
    initField(defaultValues)
  }, [initField])

  const onStartNewGame = () => startNewGame(defaultValues)

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
      <div className={css.actions}>
        <button type="button" onClick={onStartNewGame}>
          Start again
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  round: selectRound(state),
  tilesLeft: selectLeftTiles(state),
  notification: selectIsMatchNotification(state),
})
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => ({
  initField: (values: TileValue[]) =>
    dispatch(initFieldAction(values)),
  startNewGame: (values: TileValue[]) =>
    dispatch(startNewGameAction(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
