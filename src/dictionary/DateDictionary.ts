export const DateDictionary = {
  dateFormat: 'DD.MM.YYYY',
  dateFormatLong: 'DD MMMM YYYY',
  timeFormat: 'HH:mm',
  get dateTimeFormat() {
    return `${this.dateFormat} ${this.timeFormat}`;
  },
  get dateTimeFormatLong() {
    return `${this.dateFormatLong} ${this.timeFormat}`;
  },
  iso: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  isoZeroTime: 'YYYY-MM-DDT[00:00:00.0000]Z',
};

export default DateDictionary;
