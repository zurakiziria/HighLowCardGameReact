import { GET_HIERARCHY } from './hierarchyType'

const initialState = {
  hierarchy: {}
}

const hierarchyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HIERARCHY: return {
      ...state,
      hierarchy: action.payload
    }

    default: return state
  }
}

export default hierarchyReducer
