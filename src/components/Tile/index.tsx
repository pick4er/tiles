import type { ReactNode, CSSProperties } from 'react';
import type { TileId } from 'libs/types';

import React from 'react';
import cx from 'classnames';

interface Props {
  id: TileId;
  isOpen: boolean;
  onClick(id: TileId): void;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Tile(props) {
  const {
    id,
    style,
    isOpen,
    onClick,
    children
  } = props;

  const classNames = cx({
    tile: true,
    open: isOpen
  })

  return (
    <button
      type="button"
      style={style}
      onClick={() => onClick(id)}
    >
      {isOpen && children}
    </button>
  )
}