import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE,
  DELETE_SUCCESS,
  DELETE_FAIL,
  CREATE,
  CREATE_SUCCESS,
  CREATE_FAIL
} from '../actions/services'
import { compareValues } from '../../ClientApp/Components/common/sortArray'

export function services (
  state = {
    data: [],
    isLoading: true,
    hasErrored: false,
    errorMessage: ''
  },
  action
) {
  function create (state, ToCreate) {
    let newState = { ...state, data: [...state.data, ToCreate] }
    return Object.assign({}, state, {
      data: [...new Set(newState.data)].sort(compareValues('name')),
      isLoading: false,
      hasErrored: false
    })
  }

  function deleteOne (state, ToDelete) {
    var filteredData = state.data.filter(item => item.id !== ToDelete.id)
    let newState = {
      ...state,
      data: [...filteredData]
    }
    return Object.assign({}, state, {
      data: newState.data,
      isLoading: true,
      hasErrored: false
    })
  }
  function updateOne (state, ToUpdate) {
    var newList = state.data.map(item =>
      item.id === ToUpdate.id ? { ...item, ...ToUpdate } : item
    )
    return Object.assign({}, state, {
      data: newList,
      isLoading: true,
      hasErrored: false
    })
  }

  switch (action.type) {
    case LOAD: {
      console.log('--- Triggered LOAD SERVICES---')
      return Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
    }
    case LOAD_SUCCESS: {
      console.log('--- Triggered LOAD_SUCCESS SERVICES---')
      return Object.assign({}, state, {
        data: [...new Set(action.payload.data)].sort(compareValues('name')),
        isLoading: false,
        hasErrored: false
      })
    }
    case LOAD_FAIL: {
      console.log('--- Triggered LOAD_FAIL SERVICES---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// UPDATE (PUT) /////////////////////////////////////////////////////////////////
    case UPDATE: {
      console.log('--- Triggered UPDATE ---')
      const ToUpdate = action.payload.request.data
      return updateOne(state, ToUpdate)
    }
    case UPDATE_SUCCESS: {
      console.log('--- Triggered UPDATE_SUCCESS ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: false
      })
    }
    case UPDATE_FAIL: {
      console.log('--- Triggered Update_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// DELETE  /////////////////////////////////////////////////////////////////
    case DELETE: {
      console.log('--- Triggered DELETE ---')
      const ToDelete = action.payload.request.data
      return deleteOne(state, ToDelete)
    }
    case DELETE_SUCCESS: {
      console.log('--- Triggered DELETE_SUCCESS ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: false
      })
    }
    case DELETE_FAIL: {
      console.log('--- Triggered DELETE_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// CREATE  /////////////////////////////////////////////////////////////////
    case CREATE: {
      console.log('--- Triggered CREATE ---')
      return Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
    }
    case CREATE_SUCCESS: {
      console.log('--- Triggered CREATE_SUCCESS ---')

      const ToCreate = action.payload.data
      return create(state, ToCreate)
    }
    case CREATE_FAIL: {
      console.log('--- Triggered CREATE_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    default:
      return state
  }
}
