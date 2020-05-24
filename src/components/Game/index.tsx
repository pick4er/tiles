import type { RootState } from 'flux/types';
import type { TileValue } from 'types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Field from 'components/Field';
import { initField } from 'flux/modules/field';

import css from './index.module.scss';

interface Props {
  round?: number;
  initField(values: TileValue[]): void;
}

const defaultValues = [
  css.red, css.green, css.blue,
  css.white, css.black, css.orange
]
function Game(props: Props) {
  const { round, initField } = props;

  useEffect(() => {
    initField(defaultValues)
  }, [initField])

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
