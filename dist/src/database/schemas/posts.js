"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.postsTable = (0, pg_core_1.pgTable)('posts', {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    userId: (0, pg_core_1.integer)()
        .notNull()
        .references(() => users_1.usersTable.id),
    content: (0, pg_core_1.text)().notNull(),
    images: (0, pg_core_1.varchar)({ length: 255 }).array(),
});
//# sourceMappingURL=posts.js.map