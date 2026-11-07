import { Request, Response } from 'express';
import { EligibilityService } from '../services/eligibility.service.js';
import { CheckEligibilityInput } from '../schemas/eligibility.schema.js';

export class EligibilityController {
  static evaluate(req: Request, res: Response): void {
    const input: CheckEligibilityInput = req.body;
    const evaluationResults = EligibilityService.evaluate(input);

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

