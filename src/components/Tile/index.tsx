import type {
  ReactNode,
  ReactElement,
  CSSProperties,
} from 'react';
import type { TileId } from 'types';

import React from 'react';
import cx from 'classnames';

import css from './index.module.scss';

interface Props {
  id: TileId;
  isOpen: boolean;
  className?: string;
  disabled?: boolean;
  onClick(id: TileId): void;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Tile(props: Props): ReactElement {
  const {
    id,
    style,
    isOpen,
    onClick,
    children,
    disabled,
    className,
  } = props;

  const classNames = cx({
    [css.tile]: true,
    [css.open]: isOpen,
    [css.disabled]: disabled,
    [className || '']: className,
  });

  return (
    <button
      type="button"
      style={style}
      className={classNames}
      disabled={disabled}
      onClick={() => onClick(id)}
    >
      {isOpen && children}
    </button>
  );
}
