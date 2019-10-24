import moment from 'moment';

export function nameOf(obj) {
  return Object.keys(obj)[0];
}

export function toDate(str) {
  return moment(str, 'YYYY-MM-DDTHH:mm:ss').toDate();
}