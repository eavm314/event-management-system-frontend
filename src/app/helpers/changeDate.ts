import moment from "moment";

export const yearMonthDayToDayMonthYear = (oldDate: string): string => {
  return moment(oldDate, "YYYY-MM-DD").format('DD/MM/YYYY');
};

export const changeDateToDayMonthYear = (date: Date): string => {
  return moment(date).format('DD/MM/YYYY');
};
