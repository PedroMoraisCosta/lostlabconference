export const CALENDAR_UPDATETEXTFOOTER = 'CALENDAR_UPDATETEXTFOOTER'
export const CALENDAR_UPDATETEXTHEADER = 'CALENDAR_UPDATETEXTHEADER'

export function dispatchUpdateTextFooter (newDate) {
  return {
    type: CALENDAR_UPDATETEXTFOOTER,
    data: newDate
  }
}

export function dispatchUpdateTextHeader (newDate) {
  return {
    type: CALENDAR_UPDATETEXTHEADER,
    data: newDate
  }
}
