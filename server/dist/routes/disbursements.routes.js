"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disbursementsRouter = void 0;
const express_1 = require("express");
const disbursements_controller_js_1 = require("../controllers/disbursements.controller.js");
const auth_js_1 = require("../middlewares/auth.js");
const rbac_js_1 = require("../middlewares/rbac.js");
exports.disbursementsRouter = (0, express_1.Router)();
exports.disbursementsRouter.use(auth_js_1.requireAuth);
// Direct Benefit Transfer trigger reserved for District Officer or Admin
exports.disbursementsRouter.post('/trigger', (0, rbac_js_1.requireRole)(['District Officer', 'Admin']), disbursements_controller_js_1.DisbursementsController.triggerDisbursement);
// All authenticated roles (including student) can query transaction status
exports.disbursementsRouter.get('/track/:transactionId', disbursements_controller_js_1.DisbursementsController.trackStatus);
