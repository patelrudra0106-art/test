export interface StudentDocument {
  id: string;
  documentType: string;
  title: string;
  titleGu: string;
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  mimeType: string;
  dataUrl?: string; // Base64 data URL for preview
  uploadedAt: string;
  verified: boolean;
  verifiedBy?: string;
  verificationBadge: string;
}

export const INITIAL_STUDENT_DOCUMENTS: StudentDocument[] = [
  {
    id: 'doc-inc-01',
    documentType: 'Income_Certificate',
    title: 'Income Certificate (Mamlatdar Office)',
    titleGu: 'આવકનો દાખલો (મામલતદાર કચેરી)',
    fileName: 'Priya_Income_Cert_Mamlatdar.pdf',
    fileSizeBytes: 391168,
    fileSizeFormatted: '382 KB',
    mimeType: 'application/pdf',
    uploadedAt: '2026-09-12T10:28:00Z',
    verified: true,
    verifiedBy: 'Revenue Dept e-Dhara Portal',
    verificationBadge: 'Govt e-Dhara Verified',
  },
  {
    id: 'doc-cst-02',
    documentType: 'Caste_Certificate',
    title: 'SEBC / OBC Certificate',
    titleGu: 'સામાજિક અને શૈક્ષણિક રીતે પછાત વર્ગ પ્રમાણપત્ર',
    fileName: 'SEBC_Caste_Certificate_Gujarat.pdf',
    fileSizeBytes: 421888,
    fileSizeFormatted: '412 KB',
    mimeType: 'application/pdf',
    uploadedAt: '2026-08-04T11:15:00Z',
    verified: true,
    verifiedBy: 'Digital Gujarat District Office',
    verificationBadge: 'Digital Gujarat Verified',
  },
  {
    id: 'doc-mrk-03',
    documentType: 'Marksheet',
    title: 'Previous Academic Year Marksheet (GTU Sem 4)',
    titleGu: 'છેલ્લા સેમેસ્ટર માર્કશીટ (GTU સેમ ૪)',
    fileName: 'GTU_Semester_4_GradeCard.pdf',
    fileSizeBytes: 555008,
    fileSizeFormatted: '542 KB',
    mimeType: 'application/pdf',
    uploadedAt: '2026-07-15T09:40:00Z',
    verified: true,
    verifiedBy: 'GEC Surat Examination Cell',
    verificationBadge: 'University Verified',
  },
  {
    id: 'doc-dom-04',
    documentType: 'Domicile_Certificate',
    title: 'Gujarat State Domicile Certificate',
    titleGu: 'ગુજરાત રાજ્ય વસવાટ પ્રમાણપત્ર',
    fileName: 'Gujarat_Domicile_Certificate_Surat.pdf',
    fileSizeBytes: 305152,
    fileSizeFormatted: '298 KB',
    mimeType: 'application/pdf',
    uploadedAt: '2026-06-10T14:20:00Z',
    verified: true,
    verifiedBy: 'District Collector Office Surat',
    verificationBadge: 'Collectorate Verified',
  },
];

const DOCUMENTS_STORAGE_KEY = 'vps_student_documents';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getStoredDocuments(): StudentDocument[] {
  if (typeof window === 'undefined') return INITIAL_STUDENT_DOCUMENTS;
  try {
    const raw = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(INITIAL_STUDENT_DOCUMENTS));
      return INITIAL_STUDENT_DOCUMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_STUDENT_DOCUMENTS;
  } catch {
    return INITIAL_STUDENT_DOCUMENTS;
  }
}

export function saveStoredDocument(doc: StudentDocument): StudentDocument[] {
  if (typeof window === 'undefined') return [doc, ...INITIAL_STUDENT_DOCUMENTS];
  try {
    const current = getStoredDocuments();
    const updated = [doc, ...current.filter((d) => d.id !== doc.id)];
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('vps_documents_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to save document:', err);
    return INITIAL_STUDENT_DOCUMENTS;
  }
}

export function deleteStoredDocument(id: string): StudentDocument[] {
  if (typeof window === 'undefined') return INITIAL_STUDENT_DOCUMENTS;
  try {
    const current = getStoredDocuments();
    const updated = current.filter((d) => d.id !== id);
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('vps_documents_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to delete document:', err);
    return INITIAL_STUDENT_DOCUMENTS;
  }
}

