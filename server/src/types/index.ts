export type UserRole = 'Student' | 'Institute' | 'District Officer' | 'Admin';

export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Institute_Verified'
  | 'Officer_Approved'
  | 'PFMS_Disbursed'
  | 'Rejected';

export type DocumentType =
  | 'Caste_Certificate'
  | 'Income_Certificate'
  | 'Marksheet'
  | 'Fee_Receipt'
  | 'Bank_Passbook'
  | 'Aadhaar_Card';

export interface UserProfile {
  id: string; // Clerk User ID
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: UserRole;
  casteCategory?: 'OBC' | 'SC' | 'ST' | 'General';
  district?: string;
  institutionId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Scheme {
  id: string;
  code: string;
  titleEn: string;
  titleGu: string;
  shortTitleEn: string;
  shortTitleGu: string;
  descriptionEn: string;
  descriptionGu: string;
  iconName: string;
  categoryTagEn: string;
  categoryTagGu: string;
  statusLabelEn: string;
  statusLabelGu: string;
  targetGroupEn: string;
  targetGroupGu: string;
  benefitSummaryEn: string;
  benefitSummaryGu: string;
  applicationWindow: string;
  departmentName: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  studentId: string;
  schemeId: string;
  status: ApplicationStatus;
  academicYear: string;
  annualIncomeInr: number;
  institutionName: string;
  courseName: string;
  bankAccountNoMasked?: string;
  ifscCode?: string;
  pfmsTransactionId?: string;
  rejectionReason?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  supabaseStoragePath: string;
  originalFileName: string;
  fileSizeBytes: number;
  mimeType: string;
  verifiedByInstitute: boolean;
  uploadedAt: string;
}

export interface PfmsDisbursement {
  id: string;
  applicationId: string;
  pfmsBatchNumber: string;
  disbursedAmountInr: number;
  bankAckCode?: string;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
  reconciliationTimestamp?: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: unknown;
}

