# Database & Data Architecture Specification

## Project: Vidya Pragati Setu
**Document Type:** Data Model & Schema Specification  
**Current Paradigm:** Immutable Static In-Memory TypeScript Models  
**Future Target:** Relational Database Architecture (PostgreSQL / SQLite)  

---

## 1. Data Architecture Philosophy

Vidya Pragati Setu currently operates on an **in-memory, client-side data architecture**:
- **Zero-Latency Lookups:** Datasets for schemes, metrics, resources, and updates are statically typed and bundled directly with the application code.
- **Privacy By Design:** Because no user data is stored on a server, there is zero risk of student record breaches, data leaks, or unauthorized profiling.
- **Offline & Edge Capability:** The entire dataset can be cached by Service Workers or CDN edges for instantaneous access even in low-connectivity rural schools.

---

## 2. Current TypeScript Data Models

### 2.1 Scheme Item (`SchemeItem`)
Defined in [src/data/schemes.ts](file:///c:/Users/Admin/Desktop/Rudra/hackathon/VPS%20Final/vidya-pragati-setu-release/src/data/schemes.ts):

```typescript
export type Language = 'en' | 'gu';
export type SchemeIconName = 'GraduationCap' | 'Bike' | 'BookOpen' | 'UsersRound';

export interface SchemeItem {
  id: string;                    // Unique slug: 'scholarship-schemes', 'bicycle-assistance', etc.
  code: string;                  // Standard code: 'VPS-SCH-01', 'VPS-BIC-02'
  title: string;                 // English official title
  titleGu: string;               // Gujarati official title
  shortTitle: string;            // English card title
  shortTitleGu: string;          // Gujarati card title
  description: string;           // English summary description
  descriptionGu: string;         // Gujarati summary description
  icon: SchemeIconName;          // Lucide icon identifier
  categoryTag: string;           // Category badge (e.g. 'Financial Grant', 'Mobility Support')
  categoryTagGu: string;         // Gujarati category badge
  statusLabel: string;           // Operational status ('Check official notice')
  statusLabelGu: string;         // Gujarati operational status
  targetGroup: string;           // Target audience ('Class 9–12, Diploma & Undergraduate')
  targetGroupGu: string;         // Gujarati target audience
  benefitSummary: string;        // Specific benefit details
  benefitSummaryGu: string;      // Gujarati benefit details
  eligibilityBullets: string[];  // Bulleted qualification criteria
  eligibilityBulletsGu: string[];// Gujarati qualification criteria
  requiredDocuments: string[];   // Verification document list
  requiredDocumentsGu: string[]; // Gujarati verification document list
  applicationWindow: string;     // Timing guidance (e.g. 'Academic Year 2026–27')
  departmentName: string;        // Responsible government department
}
```

### 2.2 Metric Item (`MetricItem`)
```typescript
export interface MetricItem {
  id: string;
  value: string;         // English display stat (e.g. '8+', '100%')
  valueGu: string;       // Gujarati display stat (e.g. '૮+', '૧૦૦%')
  label: string;         // English label
  labelGu: string;       // Gujarati label
  icon: MetricIconName;  // 'UsersRound' | 'GraduationCap' | 'Building2' | 'ShieldCheck'
}
```

### 2.3 Site Guidance & Updates (`UpdateItem`)
Defined in [src/data/siteContent.ts](file:///c:/Users/Admin/Desktop/Rudra/hackathon/VPS%20Final/vidya-pragati-setu-release/src/data/siteContent.ts):

```typescript
export interface UpdateItem {
  id: string;
  title: string;
  titleGu: string;
  summary: string;
  summaryGu: string;
  dateLabel: string;
  dateLabelGu: string;
  categoryTag: string;
  categoryTagGu: string;
  statusTone: 'open' | 'notice';
  statusLabel: string;
  statusLabelGu: string;
  fullGuidance?: string[];
  fullGuidanceGu?: string[];
}
```

---

## 3. Scheme Catalog Entities

| ID | Code | Category | Key Benefits | Target Group | Responsible Dept |
|---|---|---|---|---|---|
| `scholarship-schemes` | `VPS-SCH-01` | Financial Grant | Direct financial assistance for tuition and maintenance | Class 9–12, Diploma, UG & PG students | Social Justice & Tribal Development Depts |
| `bicycle-assistance` | `VPS-BIC-02` | Mobility Support | Free bicycle to promote female education continuity | Female students entering Class 9 in rural areas | Education & Social Justice Depts |
| `free-textbooks` | `VPS-TBK-03` | Learning Material | 100% free curriculum textbooks for school year | Government school students Class 1–8 | Gujarat State Board of School Textbooks (GSSTB) |
| `other-assistance` | `VPS-OTH-04` | Educational Support| Hostel food subsidies, special coaching & equipment | Economically weaker & backward class students | Directorate of Developing Castes Welfare |

---

## 4. Eligibility Evaluation Engine & Rules Matrix

The client-side evaluation engine tests student form variables against scheme qualification rules:

### 4.1 Evaluation Criteria Dimensions
1. **Category:** `OBC` | `SC` | `ST` | `General`
2. **State Domicile:** `Gujarat` | `Other`
3. **Annual Family Income:**
   - `below-2.5` (Up to ₹2,50,000 / year)
   - `2.5-to-6` (₹2,50,000 – ₹6,00,000 / year)
   - `above-6` (Above ₹6,00,000 / year)
4. **Education Level:** `school` | `diploma` | `undergraduate` | `postgraduate`
5. **Institution Type:** `government` | `grant-in-aid` | `self-financed`
6. **Hostel Status:** `day-scholar` | `hosteller`

### 4.2 Matching Matrix

| Scheme | Domicile Check | Income Ceiling | Education Level | Category Rules |
|---|---|---|---|---|
| **Scholarships** | Must be Gujarat | ≤ ₹6,00,000 (higher amounts for SC/ST/SEBC) | Any (School through PG) | Priority for SC/ST/OBC/EWS |
| **Bicycle Assistance** | Must be Gujarat | As per notification | Class 9–10 School | Female students in rural/semi-urban |
| **Free Textbooks** | Must be Gujarat | No income ceiling | Class 1–8 / 9–12 | Government & Grant-in-aid enrolled |
| **Other Support** | Must be Gujarat | ≤ ₹2,50,000 for hostel grants | Diploma / Higher Ed | Hostellers & reserved categories |

---

## 5. Relational Database Schema (PostgreSQL on Supabase & Oracle SQL)

The backend utilizes **PostgreSQL** hosted on **Supabase** as its primary cloud database platform, with full DDL compatibility for state-level **Oracle (SQL)** database infrastructure:

```sql
-- 1. Core Departments
CREATE TABLE departments (
    id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_gu VARCHAR(255) NOT NULL,
    official_portal_url VARCHAR(512) NOT NULL,
    helpline_phone VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Profiles (Synced from Clerk Authentication)
CREATE TYPE user_role AS ENUM ('Student', 'Institute', 'District Officer', 'Admin');

CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY, -- Clerk User ID (e.g. user_2b...)
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(32),
    full_name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'Student',
    caste_category VARCHAR(32), -- OBC, SC, ST, General
    district VARCHAR(64),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Scheme Master Table
CREATE TABLE schemes (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(32) UNIQUE NOT NULL,
    department_id VARCHAR(64) REFERENCES departments(id) ON DELETE RESTRICT,
    title_en VARCHAR(255) NOT NULL,
    title_gu VARCHAR(255) NOT NULL,
    short_title_en VARCHAR(128) NOT NULL,
    short_title_gu VARCHAR(128) NOT NULL,
    description_en TEXT NOT NULL,
    description_gu TEXT NOT NULL,
    icon_name VARCHAR(64) NOT NULL,
    category_tag_en VARCHAR(64) NOT NULL,
    category_tag_gu VARCHAR(64) NOT NULL,
    status_label_en VARCHAR(64) NOT NULL,
    status_label_gu VARCHAR(64) NOT NULL,
    target_group_en VARCHAR(255) NOT NULL,
    target_group_gu VARCHAR(255) NOT NULL,
    benefit_summary_en TEXT NOT NULL,
    benefit_summary_gu TEXT NOT NULL,
    application_window VARCHAR(128) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Student Applications
CREATE TYPE application_status AS ENUM (
    'Draft', 
    'Submitted', 
    'Institute_Verified', 
    'Officer_Approved', 
    'PFMS_Disbursed', 
    'Rejected'
);

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    scheme_id VARCHAR(64) REFERENCES schemes(id) ON DELETE RESTRICT,
    status application_status DEFAULT 'Draft',
    academic_year VARCHAR(32) NOT NULL,
    annual_income_inr NUMERIC(12, 2) NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(128) NOT NULL,
    bank_account_no_masked VARCHAR(32),
    ifsc_code VARCHAR(16),
    pfms_transaction_id VARCHAR(64),
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Uploaded Documents (Multer Pipeline to Supabase Storage)
CREATE TABLE application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_type VARCHAR(64) NOT NULL, -- 'Caste_Certificate', 'Income_Certificate', 'Marksheet'
    supabase_storage_path VARCHAR(512) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(64) NOT NULL,
    verified_by_institute BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PFMS Direct Benefit Transfer (DBT) Logs
CREATE TABLE pfms_disbursements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    pfms_batch_number VARCHAR(64) NOT NULL,
    disbursed_amount_inr NUMERIC(10, 2) NOT NULL,
    bank_ack_code VARCHAR(64),
    payment_status VARCHAR(32) NOT NULL, -- 'PENDING', 'SUCCESS', 'FAILED'
    reconciliation_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Lookups & Security
CREATE INDEX idx_schemes_code ON schemes(code);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_app_docs_app ON application_documents(application_id);
CREATE INDEX idx_pfms_batch ON pfms_disbursements(pfms_batch_number);

-- Supabase Row Level Security (RLS) Policy Example
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can only view their own applications"
    ON applications FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Admins and Officers can view all applications"
    ON applications FOR ALL
    USING (EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('District Officer', 'Admin')
    ));
```

---

## 6. Oracle SQL Compatibility Notes

When hosting on state enterprise infrastructure using **Oracle Database 19c/21c** via **Oracle Studio**:
- `UUID` fields map to `RAW(16)` or `VARCHAR2(36)`.
- `TIMESTAMP WITH TIME ZONE` maps to `TIMESTAMP WITH LOCAL TIME ZONE`.
- `BOOLEAN` types map to `NUMBER(1)` with `CHECK (col IN (0, 1))`.
- String data uses `VARCHAR2(255 CHAR)` to ensure complete UTF-8 multi-byte encoding for Gujarati script.

---

## 7. SQL Database Script & Execution

The production SQL file containing all DDL schemas, constraints, performance indexes, and initial seed data across all 4 account roles is located at:
📁 [`database/vidya_pragati_setu.sql`](file:///c:/Users/Admin/Desktop/Rudra/hackathon/VPS%20Final/vidya-pragati-setu-release/database/vidya_pragati_setu.sql)

### 7.1 Loading into PostgreSQL (Supabase)
```bash
# Via Supabase CLI or psql
psql -h <db.supabase.co> -U postgres -d postgres -f database/vidya_pragati_setu.sql
```

### 7.2 Loading into Oracle Studio / Oracle SQL Developer
- Open Oracle SQL Developer or Oracle Studio.
- Connect as state schema owner.
- Execute [`database/vidya_pragati_setu.sql`](file:///c:/Users/Admin/Desktop/Rudra/hackathon/VPS%20Final/vidya-pragati-setu-release/database/vidya_pragati_setu.sql) as an SQL Script (`F5`).

---

## 8. Data Integrity & Migration Principles

1. **Bilingual Parity Enforcement:** Every text column in English must have a corresponding Gujarati translation. Missing translations trigger static analysis build warnings.
2. **Immutable Audit Trails:** When official schemes update income ceilings or application windows, historic records remain archived in conformance with the *Content Archival Policy*.
3. **No Foreign Telemetry:** Data models intentionally exclude user IP addresses, browser fingerprint hashes, and personal identities.

