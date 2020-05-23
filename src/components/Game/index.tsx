import type {
  OpenableTile,
  TileValue,
  TileId,
} from 'types';
import type { RootState } from 'flux';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';
import {
  initField,
  selectTiles,
  selectValues,
} from 'flux/modules/field';

interface Props {
  round: number;
  initField(): void;
  tiles?: (OpenableTile[])[];
  values?: Record<TileId, TileValue>;
}

function Game(props: Props) {
  const { round, initField, tiles, values } = props;

  useEffect(() => {
    const newTiles = tiles;
    const newValues = values;
    debugger
  }, [tiles, values])

  useEffect(() => {
    debugger
    initField()
  }, [])

  return (
    <div>
      <h3>Round { round }</h3>
      <Field />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  tiles: selectTiles(state),
  values: selectValues(state)
})

const mapDispatchToProps = {
  initField
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
