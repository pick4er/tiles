
interface State {}

interface Action {
  type: string;
  payload?: any;
}

// Actions
const INIT = 'FIELD/INIT'

const initialState: State = {}

// Reducer
export default function reducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case INIT:
      return state
    default:
      return state
  }
}

// Action creators
export function initField(): Action {
  return { type: INIT }
}
