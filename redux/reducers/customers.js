import {
  CUSTOMER_LOAD,
  CUSTOMER_LOAD_SUCCESS,
  CUSTOMER_LOAD_FAIL,
  CUSTOMER_UPDATE,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_DELETE,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_CREATE,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_UPDATEDATE,
  CUSTOMER_SEARCHNAME
} from '../actions/customers'

import { compareValues } from '../../ClientApp/Components/common/sortArray'
export function customers (
  state = {
    filteredbyname: [],
    data: [],
    birthdayTotal: 0,
    isLoading: false,
    hasErrored: false,
    errorMessage: ''
  },
  action
) {
  function createCustomer (state, customerToCreate) {
    return { ...state, data: [...state.data, customerToCreate] }
  }

  function deleteOneCustomer (state, customerToDelete) {
    var filteredArray = state.data.filter(
      item => item.id !== customerToDelete.id
    )
    return {
      ...state,
      data: [...filteredArray],
      filteredbyname: [...filteredArray]
    }
  }
  function updateOneCustomer (state, customerToUpdate) {
    var newCustomerList = state.data.map(item =>
      item.id === customerToUpdate.id ? { ...item, ...customerToUpdate } : item
    )
    return { ...state, data: [...newCustomerList] }
  }

  switch (action.type) {
    case CUSTOMER_LOAD: {
      console.log('--- Triggered CUSTOMER_LOAD ---')
      return Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
    }
    case CUSTOMER_LOAD_SUCCESS: {
      console.log('--- Triggered CUSTOMER_LOAD_SUCCESS ---')
      return Object.assign({}, state, {
        data: [...new Set(action.payload.data.customer)].sort(
          compareValues('name')
        ),
        filteredbyname: [...new Set(action.payload.data.customer)].sort(
          compareValues('name')
        ),
        birthdayTotal:  action.payload.data.birthdayTotal
        ,
        isLoading: false,
        hasErrored: false
      })
    }
    case CUSTOMER_LOAD_FAIL: {
      console.log('--- Triggered CUSTOMER_LOAD_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// UPDATE (PUT) /////////////////////////////////////////////////////////////////
    case CUSTOMER_UPDATE: {
      console.log('--- Triggered CUSTOMER_UPDATE ---')
      Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
      const customerToUpdate = action.payload.request.data
      const newState = updateOneCustomer(state, customerToUpdate)
      return newState
    }
    case CUSTOMER_UPDATE_SUCCESS: {
      console.log('--- Triggered CUSTOMER_UPDATE_SUCCESS ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: false
      })
    }
    case CUSTOMER_UPDATE_FAIL: {
      console.log('--- Triggered CUSTOMER_Update_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// DELETE  /////////////////////////////////////////////////////////////////
    case CUSTOMER_DELETE: {
      console.log('--- Triggered CUSTOMER_DELETE ---')
      Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })

      const customerIdToDelete = action.payload.request.data
      const newState = deleteOneCustomer(state, customerIdToDelete)
      return newState
    }
    case CUSTOMER_DELETE_SUCCESS: {
      console.log('--- Triggered CUSTOMER_DELETE_SUCCESS ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: false
      })
    }
    case CUSTOMER_DELETE_FAIL: {
      console.log('--- Triggered CUSTOMER_DELETE_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }
    ///////////// CREATE  /////////////////////////////////////////////////////////////////
    case CUSTOMER_CREATE: {
      console.log('--- Triggered CUSTOMER_CREATE ---')
      Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
      const customerToCreate = action.payload.request.data
      const newState = createCustomer(state, customerToCreate)
      return newState
    }
    case CUSTOMER_CREATE_SUCCESS: {
      console.log('--- Triggered CUSTOMER_CREATE_SUCCESS ---')

      Object.assign({}, state, {
        data: action.payload.data,
        isLoading: false,
        hasErrored: false
      })
      const customerToCreate = action.payload.data
      const newState = createCustomer(state, customerToCreate)
      return newState
    }
    case CUSTOMER_CREATE_FAIL: {
      console.log('--- Triggered CUSTOMER_CREATE_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.data
      })
    }

    case CUSTOMER_UPDATEDATE: {
      const currentDate = new Date(action.data)
      let filteredcustomers = state.data.filter(data => {
        let b = new Date(data.birth)
        if (b.getDate() === currentDate.getDate()) return data
      })
      return {
        ...state,
        data: filteredcustomers
      }
    }

    case CUSTOMER_SEARCHNAME: {
      let filteredcustomers = state.data.filter(data => {
        if (data.name.toLowerCase().includes(action.data.toLowerCase()))
          return data
      })
      return {
        ...state,
        filteredbyname: filteredcustomers
      }
    }
    default:
      return state
  }
}
