
export type TileId = string | number;
export type TileValue = string;

export interface BaseTile {
  id: TileId;
}

export interface OpenableTile extends BaseTile {
  isOpen: boolean;
}
