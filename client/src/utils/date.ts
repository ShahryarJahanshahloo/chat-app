import moment from 'moment'

export function getConversationDate(date: string | Date): string {
  const res = moment(date).format('MMM D YYYY')
  const currentYear = moment().format('YYYY')
  const splittedRes = res.split(' ')
  if (splittedRes[2] === currentYear) splittedRes[2] = ''
  return splittedRes.join(' ')
}

export function getMessageDate(date: string | Date): string {
  return moment().format('HH:mm')
}
