export interface PortalApplication {
  id: string;
  applicationNumber: string;
  studentId: string;
  studentName: string;
  studentCategory: string;
  schemeId: string;
  schemeTitleEn: string;
  schemeTitleGu: string;
  instituteId: string;
  instituteName: string;
  district: string;
  courseName: string;
  grantAmountInr: number;
  status: 'Submitted' | 'Institute_Verified' | 'Officer_Approved' | 'PFMS_Disbursed' | 'Rejected';
  academicYear: string;
  submittedAt: string;
  instituteVerifiedAt?: string;
  instituteRemarks?: string;
  officerApprovedAt?: string;
  officerRemarks?: string;
  pfmsTransactionId?: string;
  disbursedAt?: string;
  bankAccountMasked?: string;
  bankIfsc?: string;
}

export const INITIAL_PORTAL_APPLICATIONS: PortalApplication[] = [
  {
    id: 'app-001',
    applicationNumber: 'VPS-2026-MYSY-00918',
    studentId: 'user-student-priya',
    studentName: 'Priya Rajeshbhai Patel',
    studentCategory: 'SEBC',
    schemeId: 'scholarship-schemes',
    schemeTitleEn: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',
    schemeTitleGu: 'મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY)',
    instituteId: 'user-inst-gecs',
    instituteName: 'Government Engineering College, Surat',
    district: 'Surat',
    courseName: 'B.E. Computer Engineering (Sem 5)',
    grantAmountInr: 50000,
    status: 'PFMS_Disbursed',
    academicYear: '2026-27',
    submittedAt: '2026-09-02T11:20:00Z',
    instituteVerifiedAt: '2026-09-12T10:30:00Z',
    instituteRemarks: 'All marksheet and income credentials verified against college register.',
    officerApprovedAt: '2026-09-18T14:15:00Z',
    officerRemarks: 'Approved for 50% tuition grant. Forwarded to PFMS.',
    pfmsTransactionId: 'PFMS-GUJ-2026-TXN-849201',
    disbursedAt: '2026-09-22T16:45:00Z',
    bankAccountMasked: '••••••••4829',
    bankIfsc: 'SBIN0001234',
  },
  {
    id: 'app-002',
    applicationNumber: 'VPS-2026-PMS-01823',
    studentId: 'user-student-aarav',
    studentName: 'Aarav Vinodbhai Solanki',
    studentCategory: 'SC',
    schemeId: 'post-matric-sc-st',
    schemeTitleEn: 'Post-Matric Scholarship for SC/ST/SEBC Students',
    schemeTitleGu: 'અનુસૂચિત જાતિ/જનજાતિ પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિ',
    instituteId: 'user-inst-ldce',
    instituteName: 'L.D. College of Engineering, Ahmedabad',
    district: 'Ahmedabad',
    courseName: 'B.E. Information Technology (Sem 3)',
    grantAmountInr: 38000,
    status: 'Officer_Approved',
    academicYear: '2026-27',
    submittedAt: '2026-09-25T09:10:00Z',
    instituteVerifiedAt: '2026-10-04T11:45:00Z',
    instituteRemarks: 'Student bona-fide and fee receipt verified successfully.',
    officerApprovedAt: '2026-10-14T16:30:00Z',
    officerRemarks: 'Caste certificate validated. Ready for PFMS batch disbursement release.',
    bankAccountMasked: '••••••••9102',
    bankIfsc: 'BARB0NAVAMX',
  },
  {
    id: 'app-003',
    applicationNumber: 'VPS-2026-MYSY-02948',
    studentId: 'user-student-meet',
    studentName: 'Meet Nileshbhai Joshi',
    studentCategory: 'EWS',
    schemeId: 'scholarship-schemes',
    schemeTitleEn: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',
    schemeTitleGu: 'મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY)',
    instituteId: 'user-inst-ldce',
    instituteName: 'L.D. College of Engineering, Ahmedabad',
    district: 'Ahmedabad',
    courseName: 'Diploma Mechanical Engineering (Sem 3)',
    grantAmountInr: 25000,
    status: 'Institute_Verified',
    academicYear: '2026-27',
    submittedAt: '2026-10-15T14:05:00Z',
    instituteVerifiedAt: '2026-10-22T15:00:00Z',
    instituteRemarks: 'Enrollment confirmed with 82.4% marks. Awaiting district officer scrutiny.',
    bankAccountMasked: '••••••••6631',
    bankIfsc: 'PUNB0182700',
  },
  {
    id: 'app-004',
    applicationNumber: 'VPS-2026-BIC-00512',
    studentId: 'user-student-bhavna',
    studentName: 'Bhavna K. Parmar',
    studentCategory: 'ST',
    schemeId: 'bicycle-assistance',
    schemeTitleEn: 'Saraswati Sadhana Yojana (Bicycle Scheme)',
    schemeTitleGu: 'સરસ્વતી સાધના યોજના (સાયકલ સહાય)',
    instituteId: 'user-inst-gecs',
    instituteName: 'Government High School, Limkheda',
    district: 'Dahod',
    courseName: 'Standard 9 (Class 9)',
    grantAmountInr: 4500,
    status: 'Submitted',
    academicYear: '2026-27',
    submittedAt: '2026-10-28T12:40:00Z',
    bankAccountMasked: '••••••••1194',
    bankIfsc: 'SBIN0005432',
  },
];

const LOCAL_STORAGE_KEY = 'vps_applications_db';

export function getStoredApplications(): PortalApplication[] {
  if (typeof window === 'undefined') return INITIAL_PORTAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PORTAL_APPLICATIONS));
      return INITIAL_PORTAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PORTAL_APPLICATIONS;
  }
}

export function saveStoredApplications(apps: PortalApplication[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error('Failed to save applications to localStorage', err);
  }
}

