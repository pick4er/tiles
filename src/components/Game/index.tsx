import React from 'react';
import Field from 'components/Field';

interface Props {
  round: number;
}

export default function Game(props: Props) {
  const { round } = props;

  return (
    <div>
      <h3>Round { round }</h3>
      <Field />
    </div>
  )
}
