"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityController = void 0;
const eligibility_service_js_1 = require("../services/eligibility.service.js");
class EligibilityController {
    static evaluate(req, res) {
        const input = req.body;
        const evaluationResults = eligibility_service_js_1.EligibilityService.evaluate(input);
        const eligibleCount = evaluationResults.filter((r) => r.isEligible).length;
        res.json({
            success: true,
            message: `Evaluation complete. Student qualifies for ${eligibleCount} out of ${evaluationResults.length} schemes.`,
            summary: {
                totalEvaluated: evaluationResults.length,
                eligibleCount,
                category: input.category,
                domicile: input.stateDomicile,
                educationLevel: input.educationLevel,
            },
            results: evaluationResults,
        });
    }
}
exports.EligibilityController = EligibilityController;
