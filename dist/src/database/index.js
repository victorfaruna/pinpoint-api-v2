"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_js_1 = require("drizzle-orm/postgres-js");
require("dotenv/config");
const db = (0, postgres_js_1.drizzle)(process.env.DATABASE_URL);
exports.default = db;
//# sourceMappingURL=index.js.map