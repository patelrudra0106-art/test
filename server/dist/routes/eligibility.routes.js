"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eligibilityRouter = void 0;
const express_1 = require("express");
const eligibility_controller_js_1 = require("../controllers/eligibility.controller.js");
const validate_js_1 = require("../middlewares/validate.js");
const eligibility_schema_js_1 = require("../schemas/eligibility.schema.js");
exports.eligibilityRouter = (0, express_1.Router)();
exports.eligibilityRouter.post('/evaluate', (0, validate_js_1.validate)(eligibility_schema_js_1.checkEligibilitySchema), eligibility_controller_js_1.EligibilityController.evaluate);
