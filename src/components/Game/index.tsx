import type { RootState, MatchNotifications } from 'flux/types';
import type { TileValue } from 'types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';
import { selectRound } from 'flux/modules/game';
import {
  initField,
  selectLeftTiles
} from 'flux/modules/field';
import {
  selectIsMatchNotification
} from 'flux/modules/notifications';

import css from './index.module.scss';

interface Props {
  round: number;
  tilesLeft?: number;
  notification?: MatchNotifications;
  initField(values: TileValue[]): void;
}

const defaultValues = [
  css.red, css.green, css.blue,
  css.white, css.black, css.orange
]
function Game(props: Props) {
  const {
    round,
    initField,
    tilesLeft,
    notification
  } = props;

  useEffect(() => {
    initField(defaultValues)
  }, [initField])

  return (
    <div>
      <h3>Round { round }</h3>
      {tilesLeft && (
        <h5>{ tilesLeft } tiles left to guess</h5>
      )}
      {notification && <h5>{ notification }</h5>}
      <Field />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  round: selectRound(state),
  tilesLeft: selectLeftTiles(state),
  notification: selectIsMatchNotification(state),
})
const mapDispatchToProps = {
  initField
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
