"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)().primaryKey(),
    userId: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    firstName: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    lastName: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    username: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    role: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    city: (0, pg_core_1.varchar)({ length: 255 }),
    state: (0, pg_core_1.varchar)({ length: 255 }),
    avatarUrl: (0, pg_core_1.varchar)({ length: 255 }).default('default.jpg').notNull(),
    verificationCode: (0, pg_core_1.varchar)({ length: 255 }),
    verificationCodeExpires: (0, pg_core_1.varchar)({ length: 255 }),
    isVerified: (0, pg_core_1.boolean)().default(false),
    businessLegalName: (0, pg_core_1.varchar)({ length: 255 }),
    businessAddress: (0, pg_core_1.varchar)({ length: 255 }),
    suite: (0, pg_core_1.varchar)({ length: 255 }),
    zipCode: (0, pg_core_1.varchar)({ length: 255 }),
    businessType: (0, pg_core_1.varchar)({
        length: 255,
        enum: ['products', 'services', 'products & services'],
    }),
    einSsn: (0, pg_core_1.varchar)({ length: 255 }),
    deleted: (0, pg_core_1.boolean)().default(false),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
});
//# sourceMappingURL=users.js.map