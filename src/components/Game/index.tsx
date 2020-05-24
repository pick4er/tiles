import type { RootState } from 'flux/types';
import type { TileValue } from 'types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';
import { initField, mixTiles } from 'flux/modules/field';
import { selectRound } from 'flux/modules/game';

import css from './index.module.scss';

interface Props {
  round: number;
  initField(values: TileValue[]): void;
  mixTiles(): void;
}

const defaultValues = [
  css.red, css.green, css.blue,
  css.white, css.black, css.orange
]
function Game(props: Props) {
  const { round, initField, mixTiles } = props;

  useEffect(() => {
    initField(defaultValues)
  }, [initField])

  return (
    <div>
      <h3>Round { round }</h3>
      <button type="button" onClick={mixTiles}>
        Mix tiles
      </button>
      <Field />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  round: selectRound(state)
})
const mapDispatchToProps = {
  initField,
  mixTiles,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
