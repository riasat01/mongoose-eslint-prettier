export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = 'Autum' | 'Summar' | 'Fall';
export type TSemesterCode = '01' | '02' | '03';

interface IAcademicSemester {
  name: TAcademicSemester;
  code: TSemesterCode;
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
}

export default IAcademicSemester;