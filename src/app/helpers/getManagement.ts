import moment from 'moment';

export const getUniversityManagement = (date: Date | string, format?: string): string => {
  let momentDate: moment.Moment;

  if (typeof date === 'string' && format) {
    momentDate = moment(date, format);
  } else if (date instanceof Date) {
    momentDate = moment(date);
  } else {
    return 'GESTIÓN NO DEFINIDA';
  }

  const firstSemesterInit = momentDate.clone().year(momentDate.year()).month(0).date(1);
  const firstSemesterEnd = momentDate.clone().year(momentDate.year()).month(5).date(30);
  const segundoSemestreInicio = momentDate.clone().year(momentDate.year()).month(6).date(1);
  const segundoSemestreFin = momentDate.clone().year(momentDate.year()).month(11).date(31);

  if (momentDate.isBetween(firstSemesterInit, firstSemesterEnd, undefined, '[]')) {
    return `I/${momentDate.year()}`;
  } else if (momentDate.isBetween(segundoSemestreInicio, segundoSemestreFin, undefined, '[]')) {
    return `II/${momentDate.year()}`;
  } else {
    return 'GESTIÓN NO DEFINIDA';
  }
}
