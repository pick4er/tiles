import type { RootState } from 'flux/types';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Field from 'components/Field';
import { initField } from 'flux/modules/field';

interface Props {
  round?: number;
  initField(): void;
}

function Game(props: Props) {
  const { initField } = props;

  useEffect(() => {
    initField()
  }, [initField])

  return (
    <Field />
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
