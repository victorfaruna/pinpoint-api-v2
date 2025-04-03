import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { usersTable as users } from './users';

export const postsTable = pgTable('posts', {
  id: serial().primaryKey().notNull(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  content: text().notNull(),
  images: varchar({ length: 255 }).array(),
});
