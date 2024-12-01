type TMonth =
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

interface IAcademicSemester {
  name: 'Autum' | 'Summar' | 'Fall';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
}

export default IAcademicSemester;
