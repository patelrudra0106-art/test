"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerk = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const env_js_1 = require("./env.js");
exports.clerk = (0, clerk_sdk_node_1.createClerkClient)({
    secretKey: env_js_1.env.CLERK_SECRET_KEY,
    publishableKey: env_js_1.env.CLERK_PUBLISHABLE_KEY,
});
