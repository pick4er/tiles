import React from 'react';
import { connect } from 'react-redux';

import Field from 'components/Field';

interface Props {
  round: number;
}

function Game(props: Props) {
  const { round } = props;

  return (
    <div>
      <h3>Round { round }</h3>
      <Field />
    </div>
  )
}

const mapStateToProps = () => {}
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
