import {
  TAcademicSemester,
  TAcademicSemesterCodeMapper,
  TMonth,
  TSemesterCode,
} from './academicSemester.interface';

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemesterName: TAcademicSemester[] = [
  'Autum',
  'Summar',
  'Fall',
];
export const AcademicSemesterCode: TSemesterCode[] = ['01', '02', '03'];
export const AcademicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Autum: '01',
  Summar: '02',
  Fall: '03',
};
