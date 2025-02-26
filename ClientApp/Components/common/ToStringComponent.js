
export function toStringDate (birth) {
  if (!birth) {
    return birth
  }
  return birth.split('T', 1).toString()
}
