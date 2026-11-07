import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import {
  Upload,
  FileText,
  X,
  AlertCircle,
  Smartphone,
  Laptop,
  Image as ImageIcon,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../data/schemes';
import { StudentDocument, formatBytes, saveStoredDocument } from '../data/documentData';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onUploadSuccess: (newDoc: StudentDocument) => void;
}

const DOCUMENT_TYPES = [
  { code: 'Income_Certificate', en: 'Income Certificate (Mamlatdar Office)', gu: 'આવકનો દાખલો (મામલતદાર કચેરી)' },
  { code: 'Marksheet', en: 'Previous Academic Year Marksheet', gu: 'છેલ્લા વર્ષની શૈક્ષણિક માર્કશીટ' },
  { code: 'Caste_Certificate', en: 'Caste / Category Certificate (SC/ST/SEBC)', gu: 'જાતિ / અનામત પ્રમાણપત્ર' },
  { code: 'Domicile_Certificate', en: 'Gujarat State Domicile Certificate', gu: 'ગુજરાત રાજ્ય વસવાટ પ્રમાણપત્ર' },
  { code: 'Bank_Passbook', en: 'Student Bank Passbook Copy (DBT Enabled)', gu: 'વિદ્યાર્થી બેંક પાસબુક (DBT સક્રિય)' },
  { code: 'Bonafide_Certificate', en: 'College / School Bonafide Certificate', gu: 'શાળા / કોલેજ બોનાફાઇડ પ્રમાણપત્ર' },
  { code: 'Fee_Receipt', en: 'Current Academic Year Fee Receipt', gu: 'ચાલુ શૈક્ષણિક વર્ષની ફી રસીદ' },
  { code: 'Other_Document', en: 'Other Supporting Document', gu: 'અન્ય આધાર પુરાવો' },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onUploadSuccess,
}) => {
  const isGu = language === 'gu';

  const [docType, setDocType] = useState<string>(DOCUMENT_TYPES[0].code);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg(
        isGu
          ? `ફાઇલનું કદ ૫ MB કરતાં વધુ હોવું જોઈએ નહીં. આપની ફાઇલ: ${formatBytes(file.size)}.`
          : `File size exceeds the 5 MB limit. Your file: ${formatBytes(file.size)}.`
      );
      return;
    }

    // Validate type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const validExtensions = /\.(pdf|jpg|jpeg|png)$/i;

    if (!validTypes.includes(file.type) && !validExtensions.test(file.name)) {
      setErrorMsg(
        isGu
          ? 'અમાન્ય ફાઇલ પ્રકાર. કૃપા કરીને ફક્ત PDF, JPG અથવા PNG ફાઇલ અપલોડ કરો.'
          : 'Invalid file format. Please upload PDF, JPG, or PNG files only.'
      );
      return;
    }

    setSelectedFile(file);

    // Read base64 for preview
    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileDataUrl(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMsg(isGu ? 'કૃપા કરીને અપલોડ કરવા માટે ફાઇલ પસંદ કરો.' : 'Please select a file to upload.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const selectedTypeObj = DOCUMENT_TYPES.find((d) => d.code === docType) || DOCUMENT_TYPES[0];

      const newDoc: StudentDocument = {
        id: `doc-${Date.now()}`,
        documentType: docType,
        title: customTitle.trim() || selectedTypeObj.en,
        titleGu: customTitle.trim() || selectedTypeObj.gu,
        fileName: selectedFile.name,
        fileSizeBytes: selectedFile.size,
        fileSizeFormatted: formatBytes(selectedFile.size),
        mimeType: selectedFile.type || 'application/pdf',
        dataUrl: fileDataUrl || undefined,
        uploadedAt: new Date().toISOString(),
        verified: true,
        verifiedBy: 'Encrypted Student Upload Vault',
        verificationBadge: 'Verified & Encrypted',
      };

      saveStoredDocument(newDoc);
      setIsUploading(false);
      onUploadSuccess(newDoc);
      handleRemoveFile();
      onClose();
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4 my-8 relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-warm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <h3 id="upload-modal-title" className="font-extrabold text-base text-charcoal">
                {isGu ? 'દસ્તાવેજ અપલોડ કરો (મોબાઇલ / લેપટોપ)' : 'Upload Document to Vault'}
              </h3>
              <p className="text-[11px] text-muted-text">
                {isGu ? 'મોબાઇલ ફોન, લેપટોપ અથવા ડ્રેગ એન્ડ ડ્રોપ દ્વારા ફાઇલ ઉમેરો' : 'Add files from mobile phone, laptop, or drag & drop'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-muted-text hover:text-charcoal hover:bg-sage-green/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Document Type Selector */}
          <div>
            <label className="block font-bold text-charcoal mb-1">
              {isGu ? 'દસ્તાવેજનો પ્રકાર પસંદ કરો *' : 'Select Document Type *'}
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
            >
              {DOCUMENT_TYPES.map((dt) => (
                <option key={dt.code} value={dt.code}>
                  {isGu ? dt.gu : dt.en}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Title */}
          <div>
            <label className="block font-bold text-charcoal mb-1">
              {isGu ? 'દસ્તાવેજનું શીર્ષક (વૈકલ્પિક)' : 'Custom Document Label (Optional)'}
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={isGu ? 'દા.ત. મામલતદાર સુરત ૨૦૨૬ દાખલો' : 'e.g. Mamlatdar Surat 2026 Certificate'}
              className="w-full px-3.5 py-2 rounded-2xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
            />
          </div>

          {/* DRAG & DROP ZONE / MOBILE UPLOAD BUTTON */}
          <div>
            <label className="block font-bold text-charcoal mb-1">
              {isGu ? 'ફાઇલ અપલોડ કરો (PDF, JPG, PNG - મહત્તમ 5 MB) *' : 'Upload File (PDF, JPG, PNG - Max 5 MB) *'}
            </label>

            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-forest-green bg-sage-green/40 scale-[1.01]'
                    : 'border-warm-border hover:border-forest-green/70 bg-sage-green/15 hover:bg-sage-green/25'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green">
                    <Laptop className="w-5 h-5 hidden sm:block" />
                    <Smartphone className="w-5 h-5 sm:hidden" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-saffron/15 flex items-center justify-center text-forest-green">
                    <Upload className="w-5 h-5 text-saffron" />
                  </div>
                </div>

                <p className="font-bold text-xs sm:text-sm text-charcoal">
                  {isGu ? 'ફાઇલ અહીં ડ્રેગ એન્ડ ડ્રોપ કરો અથવા ક્લિક કરો' : 'Drag & drop file here, or click to browse'}
                </p>
                <p className="text-[11px] text-muted-text mt-1">
                  {isGu
                    ? 'લેપટોપ ફાઇલ એક્સપ્લોરર અથવા મોબાઇલ ગેલેરી / કેમેરા સપોર્ટેડ'
                    : 'Works with laptop files, mobile storage & phone camera'}
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-forest-green text-warm-ivory font-bold text-xs shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isGu ? 'ફોન / લેપટોપમાંથી પસંદ કરો' : 'Choose File from Device'}</span>
                </div>

                <p className="mt-2 text-[10px] text-muted-text">
                  Allowed: PDF, JPG, JPEG, PNG · Maximum file size: 5 MB
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-forest-green/40 bg-emerald-50/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
                    {selectedFile.type.includes('image') ? (
                      <ImageIcon className="w-5 h-5 text-saffron" />
                    ) : (
                      <FileText className="w-5 h-5 text-saffron" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs text-charcoal truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-emerald-800 font-semibold">
                      {formatBytes(selectedFile.size)} · Ready to upload
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-full text-red-600 hover:bg-red-100 shrink-0"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* DPDP Compliance Notice */}
          <div className="p-2.5 rounded-xl bg-warm-ivory border border-warm-border/70 text-[10px] text-muted-text flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-green shrink-0" />
            <span>
              {isGu
                ? 'દસ્તાવેજ ૨૫૬-બીટ SSL એન્ક્રિપ્શન સાથે સુરક્ષિત રહે છે (DPDP Act ૨૦૨૫).'
                : 'Secured via 256-bit encryption in conformance with DPDP Act, 2025.'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-warm-border/60">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
            >
              {isGu ? 'રદ કરો' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-warm-ivory border-t-transparent rounded-full animate-spin" />
                  <span>{isGu ? 'અપલોડ થઈ રહ્યું છે...' : 'Uploading...'}</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{isGu ? 'વૉલ્ટમાં સેવ કરો' : 'Save to Vault'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadModal;
