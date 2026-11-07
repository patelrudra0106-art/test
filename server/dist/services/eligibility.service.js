"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityService = void 0;
class EligibilityService {
    static evaluate(input) {
        const results = [];
        // 1. Post-Matric / Higher Education Scholarships
        const isGujaratDomicile = input.stateDomicile === 'Gujarat';
        const isIncomeEligibleScholarship = input.annualIncome !== 'above-6';
        const isEligibleScholarship = isGujaratDomicile && isIncomeEligibleScholarship;
        results.push({
            schemeId: 'scholarship-schemes',
            schemeCode: 'VPS-SCH-01',
            titleEn: 'Scholarship Schemes',
            titleGu: 'શિષ્યવૃત્તિ યોજનાઓ',
            isEligible: isEligibleScholarship,
            matchScore: isEligibleScholarship ? 95 : 30,
            qualificationReasons: isEligibleScholarship
                ? [
                    'Gujarat state domicile confirmed',
                    `Annual family income falls within the eligible bracket (${input.annualIncome})`,
                    `Education level (${input.educationLevel}) qualifies for post-matric benefits`,
                ]
                : [],
            qualificationReasonsGu: isEligibleScholarship
                ? [
                    'ગુજરાતના કાયમી રહેવાસી પ્રમાણિત',
                    'વાર્ષિક કૌટુંબિક આવક નિર્ધારિત મર્યાદામાં',
                    'અભ્યાસનું સ્તર શિષ્યવૃત્તિ માટે પાત્ર',
                ]
                : [],
            disqualificationReasons: !isEligibleScholarship
                ? [
                    !isGujaratDomicile
                        ? 'Scheme requires permanent Gujarat domicile status.'
                        : 'Annual family income exceeds ₹6,00,000 threshold for state grants.',
                ]
                : undefined,
            estimatedBenefitEn: 'Up to ₹50,000 / year tuition and maintenance allowance',
            estimatedBenefitGu: 'વાર્ષિક ₹૫૦,૦૦૦ સુધી ટ્યુશન અને નિભાવ સહાય',
        });
        // 2. Saraswati Sadhana Bicycle Assistance Scheme
        const isSchoolLevel = input.educationLevel === 'school';
        const isFemale = input.gender === 'female' || !input.gender;
        const isEligibleBicycle = isGujaratDomicile && isSchoolLevel && isFemale;
        results.push({
            schemeId: 'bicycle-assistance',
            schemeCode: 'VPS-BIC-02',
            titleEn: 'Bicycle Assistance (Saraswati Sadhana Yojana)',
            titleGu: 'સરસ્વતી સાધના સાયકલ સહાય યોજના',
            isEligible: isEligibleBicycle,
            matchScore: isEligibleBicycle ? 90 : 20,
            qualificationReasons: isEligibleBicycle
                ? [
                    'Gujarat domicile confirmed',
                    'Enrolled in secondary education (Class 9–10)',
                    'Female student priority grant criteria satisfied',
                ]
                : [],
            qualificationReasonsGu: isEligibleBicycle
                ? [
                    'ગુજરાતના કાયમી રહેવાસી',
                    'માધ્યમિક શાળામાં અભ્યાસ (ધોરણ ૯–૧૦)',
                    'કન્યા કેળવણી પ્રોત્સાહન હેઠળ પાત્ર',
                ]
                : [],
            disqualificationReasons: !isEligibleBicycle
                ? ['Bicycle assistance is targeted specifically at secondary school students (Class 9).']
                : undefined,
            estimatedBenefitEn: '100% free bicycle grant from the Education Department',
            estimatedBenefitGu: 'શિક્ષણ વિભાગ દ્વારા ૧૦૦% વિનામૂલ્યે સાયકલ સહાય',
        });
        // 3. Free Textbooks Scheme
        const isGovtOrGrant = input.institutionType !== 'self-financed';
        const isEligibleTextbooks = isGujaratDomicile && isGovtOrGrant;
        results.push({
            schemeId: 'free-textbooks',
            schemeCode: 'VPS-TBK-03',
            titleEn: 'Free Textbooks Scheme',
            titleGu: 'વિનામૂલ્યે પાઠ્યપુસ્તક યોજના',
            isEligible: isEligibleTextbooks,
            matchScore: isEligibleTextbooks ? 100 : 40,
            qualificationReasons: isEligibleTextbooks
                ? [
                    'Enrolled in recognized government or grant-in-aid institution',
                    'No family income ceiling applies to textbook distribution',
                ]
                : [],
            qualificationReasonsGu: isEligibleTextbooks
                ? [
                    'સરકારી અથવા ગ્રાન્ટેડ શૈક્ષણિક સંસ્થામાં પ્રવેશ',
                    'પાઠ્યપુસ્તક યોજનામાં કોઈ આવક મર્યાદા નથી',
                ]
                : [],
            disqualificationReasons: !isEligibleTextbooks
                ? ['Free textbooks are subsidized for government and grant-in-aid institutions.']
                : undefined,
            estimatedBenefitEn: 'Full syllabus textbook set for the current academic session',
            estimatedBenefitGu: 'હાલના શૈક્ષણિક સત્ર માટે તમામ પાઠ્યપુસ્તકોનો સેટ',
        });
        // 4. Other Educational & Hostel Support
        const isHosteller = input.hostelStatus === 'hosteller';
        const isLowerIncome = input.annualIncome === 'below-2.5';
        const isEligibleOther = isGujaratDomicile && (isHosteller || isLowerIncome);
        results.push({
            schemeId: 'other-assistance',
            schemeCode: 'VPS-OTH-04',
            titleEn: 'Other Educational & Hostel Assistance',
            titleGu: 'અન્ય શૈક્ષણિક અને હોસ્ટેલ સહાય',
            isEligible: isEligibleOther,
            matchScore: isEligibleOther ? 85 : 25,
            qualificationReasons: isEligibleOther
                ? [
                    isHosteller ? 'Verified hostel accommodation status' : 'Low annual income criteria met',
                    'Gujarat state institutional enrollment verified',
                ]
                : [],
            qualificationReasonsGu: isEligibleOther
                ? [
                    isHosteller ? 'હોસ્ટેલ નિવાસ પ્રમાણિત' : 'આવક માપદંડ પૂર્ણ',
                    'ગુજરાત રાજ્યની સંસ્થામાં પ્રવેશ',
                ]
                : [],
            disqualificationReasons: !isEligibleOther
                ? ['Requires day-scholar low income verification or verified hostel enrollment.']
                : undefined,
            estimatedBenefitEn: 'Hostel food bill subsidy & specialized coaching support',
            estimatedBenefitGu: 'હોસ્ટેલ ભોજન બિલ સબસિડી અને વિશેષ કોચિંગ સહાય',
        });
        return results;
    }
}
exports.EligibilityService = EligibilityService;
