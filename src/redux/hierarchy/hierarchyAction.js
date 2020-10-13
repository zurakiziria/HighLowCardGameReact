import { GET_HIERARCHY } from './hierarchyType'

export const getHierarchy = (data = null) => {
  return {
    type: GET_HIERARCHY,
    payload: data
  }
}
