import type {
  OpenableTile,
  TileValue,
  TileId,
} from 'types';
import type { RootState } from 'flux';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';
import { initField } from 'flux/modules/field';

interface Props {
  round: number;
  initField(): void;
}

function Game(props: Props) {
  const { round, initField } = props;

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

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {
  initField
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
