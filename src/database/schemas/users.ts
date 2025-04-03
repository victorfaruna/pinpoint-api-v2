import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  userId: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }),
  state: varchar({ length: 255 }),
  avatarUrl: varchar({ length: 255 }).default('default.jpg').notNull(), // Optional profile picture
  verificationCode: varchar({ length: 255 }), // Field to store the verification code
  verificationCodeExpires: varchar({ length: 255 }), // New field for expiration
  isVerified: boolean().default(false),

  // Partner-specific fields
  businessLegalName: varchar({ length: 255 }),
  businessAddress: varchar({ length: 255 }),
  suite: varchar({ length: 255 }),
  zipCode: varchar({ length: 255 }),
  businessType: varchar({
    length: 255,
    enum: ['products', 'services', 'products & services'],
  }),
  einSsn: varchar({ length: 255 }),
  deleted: boolean().default(false),
  createdAt: timestamp().defaultNow().notNull(),
});
