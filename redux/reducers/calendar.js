import {
  CALENDAR_UPDATETEXTFOOTER,
  CALENDAR_UPDATETEXTHEADER
} from '../actions/calendar'

export function calendar (
  state = {
    textfooter: '',
    textheader: '',
    selecteddate: ''
  },
  action
) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  switch (action.type) {
    case CALENDAR_UPDATETEXTFOOTER: {
      const currentDate = new Date(action.data)

      const date =
        currentDate.getDate().toString() +
        ' ' +
        months[currentDate.getMonth()] +
        ' ' +
        currentDate.getFullYear().toString()
      return Object.assign({}, state, {
        textfooter: date,
        selecteddate: action.data
      })
    }
    case CALENDAR_UPDATETEXTHEADER: {
      const startweek = new Date(action.data)

      const date =
        months[startweek.getMonth()] + ' ' + startweek.getFullYear().toString()

      return Object.assign({}, state, {
        textheader: date
      })
    }
    default:
      // need this for default case
      return state
  }
}
