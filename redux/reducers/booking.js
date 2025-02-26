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
  CREATE_FAIL,
  FILTERCALENDARLIST,
  BOOKING_SEARCHNAME,
  FILTERCALENDARLISTAVAILABILITY,
  FILTERCALENDARLISTAVAILABILITY_SUCCESS,
  FILTERCALENDARLISTAVAILABILITY_FAIL
} from '../actions/booking'
import { compareValues } from '../../ClientApp/Components/common/sortArray'

export function booking (
  state = {
    filteredbyname: [],
    datafiltered: [],
    data: [],
    bookingweek:[],
    isLoading: true,
    hasErrored: false,
    errorMessage: '',
    isLoadingCalendar: false
  },
  action
) {
  function createCustomer (state, customerToCreate) {
    let newState = {
      ...state,
      data: [...state.data, customerToCreate].sort(
        compareValues('start', 'desc')
      ),
      datafiltered: [...state.datafiltered, customerToCreate],
      filteredbyname: [...state.filteredbyname, customerToCreate].sort(
        compareValues('start', 'desc')
      )
    }

    return newState
  }

  function deleteOneBooking (state, bookToDelete) {
    var filteredData = state.data.filter(item => item.id !== bookToDelete.id)
    var filteredDataFiltered = state.datafiltered.filter(
      item => item.id !== bookToDelete.id
    )
    var filteredfilteredbyname = state.filteredbyname.filter(
      item => item.id !== bookToDelete.id
    )
    return {
      ...state,
      data: [...filteredData],
      datafiltered: [...filteredDataFiltered],
      filteredbyname: [...filteredfilteredbyname],
      isLoading: true,
      hasErrored: false
    }
  }
  function updateOneCustomer (state, customerToUpdate) {
    var newCustomerList = state.data.map(item =>
      item.id === customerToUpdate.id ? { ...item, ...customerToUpdate } : item
    )
    var filteredbynameList = state.filteredbyname.map(item =>
      item.id === customerToUpdate.id ? { ...item, ...customerToUpdate } : item
    )
    var datafilteredList = state.datafiltered.map(item =>
      item.id === customerToUpdate.id ? { ...item, ...customerToUpdate } : item
    )

    return {
      ...state,
      data: [...newCustomerList],
      filteredbyname: [...filteredbynameList],
      datafiltered: [...datafilteredList]
    }
  }

  switch (action.type) {
    case LOAD: {
      console.log('--- Triggered LOAD BOOKING---')
      return Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
    }
    case LOAD_SUCCESS: {
      console.log('--- Triggered LOAD_SUCCESS BOOKING---')
      return Object.assign({}, state, {
        datafiltered: [...new Set(action.payload.data)].sort(
          compareValues('start', 'desc')
        ),
        data: [...new Set(action.payload.data)],
        filteredbyname: [...new Set(action.payload.data)].sort(
          compareValues('start', 'desc')
        ),
        isLoading: false,
        hasErrored: false
      })
    }
    case LOAD_FAIL: {
      console.log('--- Triggered LOAD_FAIL BOOKING---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.message
      })
    }
    ///////////// UPDATE (PUT) /////////////////////////////////////////////////////////////////
    case UPDATE: {
      console.log('--- Triggered UPDATE ---')
      Object.assign({}, state, {
        isLoading: true,
        hasErrored: false
      })
      const customerToUpdate = action.payload.request.data
      const newState = updateOneCustomer(state, customerToUpdate)
      return newState
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
        errorMessage: action.error.message
      })
    }
    ///////////// DELETE  /////////////////////////////////////////////////////////////////
    case DELETE: {
      console.log('--- Triggered DELETE ---')
      // Object.assign({}, state, {
      //   isLoading: true,
      //   hasErrored: false
      // })

      const customerIdToDelete = action.payload.request.data
      return deleteOneBooking(state, customerIdToDelete)
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
        errorMessage: action.error.message
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

      let newstate = createCustomer(state, action.payload.data)
      return Object.assign({}, newstate, {
        isLoading: false,
        hasErrored: false
      })
    }
    case CREATE_FAIL: {
      console.log('--- Triggered CREATE_FAIL ---')
      return Object.assign({}, state, {
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.message
      })
    }

    case FILTERCALENDARLIST: {
      const currentDate = new Date(action.data)
      let filtered = state.data.filter(data => {
        let b = new Date(data.start)
        if (
          b.getDate() == currentDate.getDate() &&
          b.getMonth() == currentDate.getMonth() &&
          b.getFullYear() == currentDate.getFullYear()
        )
          return data
      })

      return {
        ...state,
        datafiltered: filtered
      }
    }
    case FILTERCALENDARLISTAVAILABILITY: {
      console.log('Reload Availability')
      return Object.assign({}, state, {
        isLoadingCalendar: true,
        hasErrored: false
      })
    }
    case FILTERCALENDARLISTAVAILABILITY_SUCCESS: {
      console.log('--- Reload Availability SUCCESS ---')

      return Object.assign({}, state, {
        bookingweek: action.payload.data,
        isLoadingCalendar: false,
        hasErrored: false
      })
    }
    case FILTERCALENDARLISTAVAILABILITY_FAIL: {
      console.log('--- Reload Availability FAIL ---')
      return Object.assign({}, state, {
        isLoadingCalendar: false,
        hasErrored: true,
        errorMessage: action.error.message
      })
    }

    case BOOKING_SEARCHNAME: {
      let filteredcustomers = action.data2.filter(data => {
        if (data.name.toLowerCase().includes(action.data.toLowerCase()))
          return data
      })
      let filteredcustomerIds = filteredcustomers.map(a => a.id)

      let c = state.data.filter(data => {
        if (filteredcustomerIds.includes(data.customerId)) return data
      })
      return {
        ...state,
        filteredbyname: c
      }
    }

    default:
      return state
  }
}
