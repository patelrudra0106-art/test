"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemesRouter = void 0;
const express_1 = require("express");
const schemes_controller_js_1 = require("../controllers/schemes.controller.js");
exports.schemesRouter = (0, express_1.Router)();
exports.schemesRouter.get('/', schemes_controller_js_1.SchemesController.getAll);
exports.schemesRouter.get('/:id', schemes_controller_js_1.SchemesController.getById);
