import type { ReactNode, CSSProperties } from 'react';
import type { TileId } from 'types';

import React from 'react';
import cx from 'classnames';

import css from './index.module.scss';

interface Props {
  id: TileId;
  isOpen: boolean;
  onClick(id: TileId): void;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Tile(props: Props) {
  const {
    id,
    style,
    isOpen,
    onClick,
    children,
  } = props;

  const classNames = cx({
    [css.tile]: true,
    [css.open]: isOpen,
  })

  return (
    <button
      type="button"
      style={style}
      className={classNames}
      onClick={() => onClick(id)}
    >
      {isOpen && children}
    </button>
  )
}
