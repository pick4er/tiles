
interface State {
  round: number;
}

interface Action {
  type: string;
  payload?: any;
}

// Actions
const SET_ROUND = 'GAME/SET_ROUND'

const initialState: State = {
  round: 1,
}

// Reducer
export default function reducer(
  state: State = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SET_ROUND:
      return {
        ...state,
        round: payload
      }
    default:
      return state
  }
}

// Action creators
export function setRound(payload: number): Action {
  return {
    type: SET_ROUND,
    payload
  }
}
