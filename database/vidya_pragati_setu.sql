-- ==============================================================================
-- Vidya Pragati Setu (વિદ્યા પ્રગતિ સેતુ) — Database Schema & Seed Data
-- Database Engine: PostgreSQL (Supabase) / Oracle SQL compatible
-- Architecture: Role-Based Access Control (Student, Institute, District Officer, Admin)
-- Integrations: PFMS DBT Payment Gateway & Clerk Identity Engine
-- Character Set: UTF-8 (Supporting English and Anek Gujarati)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. DROP EXISTING TABLES & TYPES (Clean slate setup)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS pfms_disbursements CASCADE;
DROP TABLE IF EXISTS application_documents CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS schemes CASCADE;
DROP TABLE IF EXISTS officer_profiles CASCADE;
DROP TABLE IF EXISTS institute_profiles CASCADE;
DROP TABLE IF EXISTS student_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

-- ------------------------------------------------------------------------------
-- 2. ENUM TYPES
-- ------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM (
    'Student',
    'Institute',
    'District Officer',
    'Admin'
);

CREATE TYPE application_status AS ENUM (
    'Draft',
    'Submitted',
    'Institute_Verified',
    'Officer_Approved',
    'PFMS_Disbursed',
    'Rejected'
);

CREATE TYPE payment_status AS ENUM (
    'Pending',
    'Processing',
    'Success',
    'Failed',
    'Reconciled'
);

-- ------------------------------------------------------------------------------
-- 3. CORE DEPARTMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE departments (
    id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_gu VARCHAR(255) NOT NULL,
    code VARCHAR(32) UNIQUE NOT NULL,
    official_portal_url VARCHAR(512) NOT NULL,
    helpline_phone VARCHAR(64),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 4. MASTER USERS TABLE (Shared identity for all roles)
-- ------------------------------------------------------------------------------
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY, -- Clerk User ID / System UUID
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(32),
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'Student',
    district VARCHAR(64) NOT NULL,
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. STUDENT PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE student_profiles (
    user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_registration_no VARCHAR(64) UNIQUE,
    caste_category VARCHAR(32) NOT NULL, -- 'General', 'SEBC', 'SC', 'ST', 'EWS'
    education_level VARCHAR(64) NOT NULL, -- 'class-9-10', 'class-11-12', 'undergraduate', etc.
    current_institution VARCHAR(255) NOT NULL,
    current_course VARCHAR(128) NOT NULL,
    annual_family_income NUMERIC(12, 2) NOT NULL,
    bank_name VARCHAR(128),
    bank_account_masked VARCHAR(32),
    ifsc_code VARCHAR(16),
    pfms_beneficiary_code VARCHAR(64),
    pfms_dbt_enabled BOOLEAN DEFAULT TRUE,
    domicile_state VARCHAR(64) DEFAULT 'Gujarat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 6. INSTITUTE PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE institute_profiles (
    user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    institute_code VARCHAR(64) UNIQUE NOT NULL, -- AISHE or DISE Code
    institute_name VARCHAR(255) NOT NULL,
    institute_type VARCHAR(64) NOT NULL, -- 'Government', 'Grant-in-Aid', 'Self-Financed'
    affiliation_board VARCHAR(255) NOT NULL, -- 'GTU', 'GSEB', 'Gujarat University', etc.
    principal_name VARCHAR(255) NOT NULL,
    nodal_officer_name VARCHAR(255),
    nodal_officer_phone VARCHAR(32),
    district VARCHAR(64) NOT NULL,
    taluka VARCHAR(64),
    pincode VARCHAR(10),
    is_accredited BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 7. DISTRICT OFFICER PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE officer_profiles (
    user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(64) UNIQUE NOT NULL,
    department_id VARCHAR(64) REFERENCES departments(id) ON DELETE RESTRICT,
    jurisdiction_district VARCHAR(64) NOT NULL,
    designation VARCHAR(128) NOT NULL,
    office_address TEXT,
    gov_badge_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 8. SCHEMES MASTER TABLE
-- ------------------------------------------------------------------------------
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
    target_group_en VARCHAR(255) NOT NULL,
    target_group_gu VARCHAR(255) NOT NULL,
    max_income_ceiling NUMERIC(12, 2),
    benefit_amount_inr NUMERIC(10, 2),
    benefit_summary_en TEXT NOT NULL,
    benefit_summary_gu TEXT NOT NULL,
    application_window VARCHAR(128) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 9. APPLICATIONS TABLE (The central pipeline)
-- ------------------------------------------------------------------------------
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(64) UNIQUE NOT NULL,
    student_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    scheme_id VARCHAR(64) REFERENCES schemes(id) ON DELETE RESTRICT,
    institute_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    officer_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    status application_status DEFAULT 'Submitted',
    academic_year VARCHAR(32) NOT NULL DEFAULT '2026-27',
    annual_income_inr NUMERIC(12, 2) NOT NULL,
    course_name VARCHAR(128) NOT NULL,
    current_year_or_sem VARCHAR(32),
    grant_amount_inr NUMERIC(10, 2) NOT NULL,
    institute_remarks TEXT,
    institute_verified_at TIMESTAMP WITH TIME ZONE,
    officer_remarks TEXT,
    officer_approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 10. APPLICATION DOCUMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_type VARCHAR(64) NOT NULL, -- 'Marksheet', 'Caste_Certificate', 'Income_Certificate', 'Domicile'
    file_name VARCHAR(255) NOT NULL,
    storage_path VARCHAR(512) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(64) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 11. PFMS DIRECT BENEFIT TRANSFER (DBT) TRANSACTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE pfms_disbursements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    pfms_transaction_id VARCHAR(64) UNIQUE NOT NULL,
    batch_number VARCHAR(64) NOT NULL,
    disbursed_amount_inr NUMERIC(10, 2) NOT NULL,
    recipient_bank_code VARCHAR(32),
    bank_ack_code VARCHAR(64),
    status payment_status DEFAULT 'Processing',
    disbursement_date TIMESTAMP WITH TIME ZONE,
    reconciliation_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 12. AUDIT LOGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    user_role VARCHAR(32) NOT NULL,
    action VARCHAR(128) NOT NULL, -- 'LOGIN', 'VERIFY_INSTITUTE', 'APPROVE_OFFICER', 'INITIATE_DBT'
    entity_type VARCHAR(64),
    entity_id VARCHAR(64),
    details JSONB,
    ip_address_hash VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 13. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_district ON users(district);
CREATE INDEX idx_schemes_code ON schemes(code);
CREATE INDEX idx_schemes_department ON schemes(department_id);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_scheme ON applications(scheme_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_number ON applications(application_number);
CREATE INDEX idx_app_docs_app ON application_documents(application_id);
CREATE INDEX idx_pfms_txn ON pfms_disbursements(pfms_transaction_id);
CREATE INDEX idx_pfms_batch ON pfms_disbursements(batch_number);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);

-- ==============================================================================
-- 14. COMPREHENSIVE SEED DATA
-- ==============================================================================

-- DEPARTMENTS
INSERT INTO departments (id, name_en, name_gu, code, official_portal_url, helpline_phone, email) VALUES
('dept-sjep', 'Department of Social Justice & Empowerment', 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ', 'SJED', 'https://sje.gujarat.gov.in', '079-23253271', 'info-sjed@gujarat.gov.in'),
('dept-tribal', 'Tribal Development Department', 'આદિજાતિ વિકાસ વિભાગ', 'TDD', 'https://tribal.gujarat.gov.in', '079-23253381', 'tribal@gujarat.gov.in'),
('dept-higher-edu', 'Education Department (Higher Education)', 'શિક્ષણ વિભાગ (ઉચ્ચ શિક્ષણ)', 'EDU-HE', 'https://mysy.guj.nic.in', '079-26566000', 'mysy-gujarat@gov.in'),
('dept-school-edu', 'Primary & Secondary Education Directorate', 'પ્રાથમિક અને માધ્યમિક શિક્ષણ નિયામક કચેરી', 'EDU-PRI', 'https://gujarat-education.gov.in', '079-23251391', 'edu-director@gujarat.gov.in'),
('dept-gsstb', 'Gujarat State Board of School Textbooks', 'ગુજરાત રાજ્ય શાળા પાઠ્યપુસ્તક મંડળ', 'GSSTB', 'https://gsstb.gujarat.gov.in', '079-23254124', 'gsstb@gujarat.gov.in');

-- USERS (All 4 Roles)
INSERT INTO users (id, email, phone_number, full_name, role, district, password_hash, is_active, is_verified) VALUES
-- 1. Admin
('user-admin-01', 'admin.vps@gujarat.gov.in', '9825000001', 'State IT & Welfare Administrator', 'Admin', 'Gandhinagar', '$2a$12$AdminHash2026VPS', TRUE, TRUE),

-- 2. District Officers
('user-officer-surat', 'officer.surat@gujarat.gov.in', '9428098765', 'Sanjaykumar D. Mehta, GAS', 'District Officer', 'Surat', '$2a$12$OfficerHash2026VPS', TRUE, TRUE),
('user-officer-ahd', 'officer.ahmedabad@gujarat.gov.in', '9428098766', 'Dr. Minaxiben R. Trivedi, GAS', 'District Officer', 'Ahmedabad', '$2a$12$OfficerHash2026VPS', TRUE, TRUE),
('user-officer-vad', 'officer.vadodara@gujarat.gov.in', '9428098767', 'Harshadrai K. Solanki, GAS', 'District Officer', 'Vadodara', '$2a$12$OfficerHash2026VPS', TRUE, TRUE),

-- 3. Institutes
('user-inst-ldce', 'admin.office@ldce.ac.in', '9824012345', 'L.D. College of Engineering, Ahmedabad', 'Institute', 'Ahmedabad', '$2a$12$InstHash2026VPS', TRUE, TRUE),
('user-inst-gecs', 'principal@gecsurat.ac.in', '9824012346', 'Government Engineering College, Surat', 'Institute', 'Surat', '$2a$12$InstHash2026VPS', TRUE, TRUE),
('user-inst-msu', 'registrar@msubaroda.ac.in', '9824012347', 'Maharaja Sayajirao University of Baroda', 'Institute', 'Vadodara', '$2a$12$InstHash2026VPS', TRUE, TRUE),

-- 4. Students
('user-student-priya', 'priya.patel@gujarat.edu', '9876543210', 'Priya Rajeshbhai Patel', 'Student', 'Surat', '$2a$12$StudentHash2026VPS', TRUE, TRUE),
('user-student-aarav', 'aarav.solanki@gujarat.edu', '9876543211', 'Aarav Vinodbhai Solanki', 'Student', 'Ahmedabad', '$2a$12$StudentHash2026VPS', TRUE, TRUE),
('user-student-bhavna', 'bhavna.parmar@gujarat.edu', '9876543212', 'Bhavna K. Parmar', 'Student', 'Dahod', '$2a$12$StudentHash2026VPS', TRUE, TRUE),
('user-student-meet', 'meet.joshi@gujarat.edu', '9876543213', 'Meet Nileshbhai Joshi', 'Student', 'Rajkot', '$2a$12$StudentHash2026VPS', TRUE, TRUE);

-- PROFILES
INSERT INTO officer_profiles (user_id, employee_id, department_id, jurisdiction_district, designation, office_address) VALUES
('user-officer-surat', 'GOV-GJ-SUR-4821', 'dept-sjep', 'Surat', 'District Social Welfare Officer (DSWO)', 'Bahumali Bhavan, Nanpura, Surat - 395001'),
('user-officer-ahd', 'GOV-GJ-AHD-1092', 'dept-higher-edu', 'Ahmedabad', 'District Higher Education Officer (DHEO)', 'Old High Court Building, Navrangpura, Ahmedabad - 380009'),
('user-officer-vad', 'GOV-GJ-VAD-3319', 'dept-tribal', 'Vadodara', 'Project Administrator & Tribal Officer', 'Kothi Building Compound, Raopura, Vadodara - 390001');

INSERT INTO institute_profiles (user_id, institute_code, institute_name, institute_type, affiliation_board, principal_name, nodal_officer_name, nodal_officer_phone, district, taluka, pincode) VALUES
('user-inst-ldce', 'AISHE-C-24891', 'L.D. College of Engineering', 'Government', 'Gujarat Technological University (GTU)', 'Dr. Rajendrasinh Vaghela', 'Prof. M. K. Shah', '9824099881', 'Ahmedabad', 'Ahmedabad City', '380015'),
('user-inst-gecs', 'AISHE-C-45812', 'Government Engineering College, Surat', 'Government', 'Gujarat Technological University (GTU)', 'Dr. Snehal Patel', 'Dr. H. B. Desai', '9824099882', 'Surat', 'Chorasi', '395023'),
('user-inst-msu', 'AISHE-U-0144', 'Maharaja Sayajirao University of Baroda', 'State University', 'UGC / Gujarat State', 'Prof. Vijay Kumar Srivastava', 'Dr. K. M. Chudasama', '9824099883', 'Vadodara', 'Vadodara Urban', '390002');

INSERT INTO student_profiles (user_id, student_registration_no, caste_category, education_level, current_institution, current_course, annual_family_income, bank_name, bank_account_masked, ifsc_code, pfms_beneficiary_code, pfms_dbt_enabled) VALUES
('user-student-priya', 'STU-2026-SUR-001', 'SEBC', 'undergraduate', 'Government Engineering College, Surat', 'B.E. Computer Engineering', 180000.00, 'State Bank of India', '••••••••4829', 'SBIN0001234', 'PFMS-BEN-SUR-84920', TRUE),
('user-student-aarav', 'STU-2026-AHD-002', 'SC', 'undergraduate', 'L.D. College of Engineering', 'B.E. Information Technology', 140000.00, 'Bank of Baroda', '••••••••9102', 'BARB0NAVAMX', 'PFMS-BEN-AHD-73192', TRUE),
('user-student-bhavna', 'STU-2026-DAH-003', 'ST', 'class-9-10', 'Government High School, Limkheda', 'Standard 9 (Secondary)', 95000.00, 'State Bank of India', '••••••••1194', 'SBIN0005432', 'PFMS-BEN-DAH-66281', TRUE),
('user-student-meet', 'STU-2026-RAJ-004', 'EWS', 'undergraduate', 'Government Polytechnic, Rajkot', 'Diploma Mechanical Engineering', 220000.00, 'Punjab National Bank', '••••••••6631', 'PUNB0182700', 'PFMS-BEN-RAJ-55219', TRUE);

-- SCHEMES
INSERT INTO schemes (id, code, department_id, title_en, title_gu, short_title_en, short_title_gu, description_en, description_gu, icon_name, category_tag_en, category_tag_gu, target_group_en, target_group_gu, max_income_ceiling, benefit_amount_inr, benefit_summary_en, benefit_summary_gu, application_window) VALUES
('scholarship-schemes', 'VPS-SCH-01', 'dept-higher-edu', 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)', 'મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY)', 'MYSY Scholarship', 'MYSY શિષ્યવૃત્તિ', 'Comprehensive financial support covering 50% tuition fees, hostel grants, and book allowances for meritorious students across Gujarat.', 'ગુજરાતના તેજસ્વી વિદ્યાર્થીઓ માટે ટ્યુશન ફી સહાય, હોસ્ટેલ સહાય અને પુસ્તક-સાધન સહાય પૂરી પાડતી મુખ્ય યોજના.', 'GraduationCap', 'Financial Grant', 'નાણાકીય સહાય', 'Class 10/12 passed with 80%+ percentile in Diploma/Degree', 'ધોરણ ૧૦/૧૨ માં ૮૦+ પર્સન્ટાઇલ મેળવનાર ડિપ્લોમા/ડિગ્રી વિદ્યાર્થીઓ', 600000.00, 50000.00, 'Up to ₹50,000/year for tuition + ₹12,000 hostel stipend', 'વાર્ષિક ₹૫૦,૦૦૦ સુધી ટ્યુશન સહાય + ₹૧૨,૦૦૦ હોસ્ટેલ સહાય', 'Academic Year 2026–27'),
('bicycle-assistance', 'VPS-BIC-02', 'dept-sjep', 'Saraswati Sadhana Yojana (Bicycle Scheme)', 'સરસ્વતી સાધના યોજના (સાયકલ સહાય)', 'Bicycle Assistance', 'સાયકલ સહાય યોજના', 'Free brand-new bicycles distributed to rural female students entering Class 9 to reduce travel barriers and eliminate school dropouts.', 'ધોરણ ૯ માં પ્રવેશ મેળવતી ગ્રામીણ કન્યાઓ માટે વિનામૂલ્યે સાયકલ સહાય જેથી શિક્ષણમાં સાતત્ય જળવાઈ રહે.', 'Bike', 'Mobility Support', 'સાધન સહાય', 'Female students entering Class 9 in rural and semi-urban Gujarat', 'ધોરણ ૯ માં પ્રવેશ મેળવતી અનુસૂચિત જાતિ/પછાત વર્ગની કન્યાઓ', 250000.00, 4500.00, 'Free ISI-certified bicycle or ₹4,500 DBT coupon', 'મફત ISI પ્રમાણિત સાયકલ અથવા ₹૪,૫૦૦ ડીબીટી સહાય', 'July – October 2026'),
('free-textbooks', 'VPS-TBK-03', 'dept-gsstb', 'Free School Textbooks & Workbook Initiative', 'વિનામૂલ્યે પાઠ્યપુસ્તક અને સ્વાધ્યાયપોથી યોજના', 'Free Textbooks', 'વિનામૂલ્યે પાઠ્યપુસ્તકો', 'Complete textbook kits and digital QR-coded workbooks provided free of charge on the first day of the school academic year.', 'શાળા સત્રના પ્રથમ દિવસે તમામ સરકારી અને ગ્રાન્ટેડ શાળાના વિદ્યાર્થીઓને ૧૦૦% મફત પાઠ્યપુસ્તક સેટ.', 'BookOpen', 'Learning Material', 'શિક્ષણ સામગ્રી', 'All students studying in Classes 1 through 8 in Government schools', 'ધોરણ ૧ થી ૮ ના સરકારી અને ગ્રાન્ટ-ઇન-એઇડ શાળાઓના તમામ બાળકો', NULL, 1500.00, 'Complete set of state syllabus textbooks at zero cost', '૧ થી ૮ ના સંપૂર્ણ પુસ્તક સેટ અને સ્વાધ્યાયપોથી વિનામૂલ્યે', 'Annual June Distribution'),
('post-matric-sc-st', 'VPS-PMS-04', 'dept-tribal', 'Post-Matric Scholarship for SC/ST/SEBC Students', 'અનુસૂચિત જાતિ/જનજાતિ પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિ', 'Post-Matric Scheme', 'પોસ્ટ-મેટ્રિક યોજના', 'Government of India and Gujarat state shared scholarship covering 100% compulsory tuition and non-refundable fees directly deposited via PFMS.', 'કેન્દ્ર અને રાજ્ય સરકારની સહિયારી યોજના દ્વારા ૧૦૦% ટ્યુશન ફી અને નિર્વાહ ભથ્થું સીધું વિદ્યાર્થીના બેંક ખાતામાં.', 'UsersRound', 'Direct Tuition Support', 'સીધી ટ્યુશન સહાય', 'Post-secondary diploma, undergraduate and postgraduate students', 'ધોરણ ૧૦ પછીના તમામ ડિપ્લોમા, ડિગ્રી અને અનુસ્નાતક અભ્યાસક્રમો', 250000.00, 38000.00, '100% college fees reimbursed + up to ₹1,200/month stipend', '૧૦૦% કૉલેજ ફી માફી + દર મહિને ₹૧,૨૦૦ સુધી નિર્વાહ ભથ્થું', 'Digital Gujarat Portal 2026');

-- APPLICATIONS (Pipeline in realistic states)
INSERT INTO applications (id, application_number, student_id, scheme_id, institute_id, officer_id, status, academic_year, annual_income_inr, course_name, current_year_or_sem, grant_amount_inr, institute_remarks, institute_verified_at, officer_remarks, officer_approved_at, submitted_at) VALUES
-- 1. Disbursed Application (Priya Patel -> MYSY)
('a0000001-0000-0000-0000-000000000001', 'VPS-2026-MYSY-00918', 'user-student-priya', 'scholarship-schemes', 'user-inst-gecs', 'user-officer-surat', 'PFMS_Disbursed', '2026-27', 180000.00, 'B.E. Computer Engineering', 'Semester 5', 50000.00, 'All marksheet and income credentials verified against college register.', '2026-09-12 10:30:00+05:30', 'Approved for 50% tuition grant. PFMS DBT initiated.', '2026-09-18 14:15:00+05:30', '2026-09-02 11:20:00+05:30'),

-- 2. Officer Approved (Aarav Solanki -> Post-Matric)
('a0000002-0000-0000-0000-000000000002', 'VPS-2026-PMS-01823', 'user-student-aarav', 'post-matric-sc-st', 'user-inst-ldce', 'user-officer-ahd', 'Officer_Approved', '2026-27', 140000.00, 'B.E. Information Technology', 'Semester 3', 38000.00, 'Student bona-fide and fee receipt verified successfully.', '2026-10-04 11:45:00+05:30', 'Caste and Domicile validated. Forwarded to PFMS batch release queue.', '2026-10-14 16:30:00+05:30', '2026-09-25 09:10:00+05:30'),

-- 3. Institute Verified (Meet Joshi -> MYSY)
('a0000003-0000-0000-0000-000000000003', 'VPS-2026-MYSY-02948', 'user-student-meet', 'scholarship-schemes', 'user-inst-ldce', 'user-officer-ahd', 'Institute_Verified', '2026-27', 220000.00, 'Diploma Mechanical Engineering', 'Semester 3', 25000.00, 'Enrollment confirmed. Pending district officer scrutiny.', '2026-10-22 15:00:00+05:30', NULL, NULL, '2026-10-15 14:05:00+05:30'),

-- 4. Submitted (Awaiting Institute Verification)
('a0000004-0000-0000-0000-000000000004', 'VPS-2026-BIC-00512', 'user-student-bhavna', 'bicycle-assistance', 'user-inst-gecs', 'user-officer-surat', 'Submitted', '2026-27', 95000.00, 'Standard 9', 'Class 9', 4500.00, NULL, NULL, NULL, NULL, '2026-10-28 12:40:00+05:30');

-- APPLICATION DOCUMENTS
INSERT INTO application_documents (id, application_id, document_type, file_name, storage_path, file_size_bytes, mime_type, is_verified, verified_by, verified_at) VALUES
('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'Income_Certificate', 'Priya_Income_Cert_Mamlatdar.pdf', 'docs/priya/income_2026.pdf', 382910, 'application/pdf', TRUE, 'user-inst-gecs', '2026-09-12 10:28:00+05:30'),
('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'Marksheet', 'Semester_4_GradeCard_GTU.pdf', 'docs/priya/gtu_sem4.pdf', 542100, 'application/pdf', TRUE, 'user-inst-gecs', '2026-09-12 10:29:00+05:30'),
('d0000003-0000-0000-0000-000000000002', 'a0000002-0000-0000-0000-000000000002', 'Caste_Certificate', 'SC_Certificate_Gujarat_Aarav.pdf', 'docs/aarav/caste_cert.pdf', 412090, 'application/pdf', TRUE, 'user-inst-ldce', '2026-10-04 11:42:00+05:30'),
('d0000004-0000-0000-0000-000000000002', 'a0000002-0000-0000-0000-000000000002', 'College_Fee_Receipt', 'LDCE_Tuition_Receipt_2026.pdf', 'docs/aarav/fee_receipt.pdf', 298100, 'application/pdf', TRUE, 'user-inst-ldce', '2026-10-04 11:43:00+05:30');

-- PFMS DISBURSEMENTS (DBT Real-World Logs)
INSERT INTO pfms_disbursements (id, application_id, pfms_transaction_id, batch_number, disbursed_amount_inr, recipient_bank_code, bank_ack_code, status, disbursement_date, reconciliation_timestamp) VALUES
('p0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'PFMS-GUJ-2026-TXN-849201', 'BATCH-2026-Q3-SURAT-01', 50000.00, 'SBIN0001234', 'ACK-RBI-SUR-994821', 'Success', '2026-09-22 16:45:00+05:30', '2026-09-23 09:12:00+05:30');

-- AUDIT LOGS
INSERT INTO audit_logs (id, user_id, user_role, action, entity_type, entity_id, details, ip_address_hash) VALUES
('l0000001-0000-0000-0000-000000000001', 'user-student-priya', 'Student', 'SUBMIT_APPLICATION', 'Application', 'a0000001-0000-0000-0000-000000000001', '{"scheme": "VPS-SCH-01", "grant": 50000}', 'hash_sha256_48291a'),
('l0000002-0000-0000-0000-000000000002', 'user-inst-gecs', 'Institute', 'VERIFY_APPLICATION', 'Application', 'a0000001-0000-0000-0000-000000000001', '{"status": "INSTITUTE_VERIFIED", "reviewer": "Dr. Snehal Patel"}', 'hash_sha256_88319c'),
('l0000003-0000-0000-0000-000000000003', 'user-officer-surat', 'District Officer', 'APPROVE_SCHEME', 'Application', 'a0000001-0000-0000-0000-000000000001', '{"district": "Surat", "forwarded_to": "PFMS"}', 'hash_sha256_71940b'),
('l0000004-0000-0000-0000-000000000004', 'user-admin-01', 'Admin', 'DISBURSE_PFMS_BATCH', 'PFMS_Batch', 'BATCH-2026-Q3-SURAT-01', '{"disbursed_count": 1, "total_inr": 50000}', 'hash_sha256_00192e');

-- ==============================================================================
-- End of Vidya Pragati Setu Database Specification
-- ==============================================================================

