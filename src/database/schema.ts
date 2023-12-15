import { mysqlTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

// ✨ ユーザー情報テーブル
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  email: text("email").notNull(),
  name: text("name"),
  avatar: text("avatar"),
  createdAt: timestamp("createdAt").defaultNow(),
});
export const usersRelations = relations(users, ({ many }) => ({
  channelMembers: many(channelMembers),
}));

// ✨ チャンネル情報テーブル
export const channels = mysqlTable("channels", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  ownerId: varchar("ownerId", { length: 36 }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
});
export const channelsRelations = relations(channels, ({ one, many }) => ({
  owner: one(users, {
    fields: [channels.ownerId],
    references: [users.id],
  }),
  messages: many(messages),
  channelMembers: many(channelMembers),
}));

// ✨ チャンネルメンバー情報テーブル
export const channelMembers = mysqlTable(
  "channelMembers",
  {
    channelId: varchar("channelId", { length: 36 }),
    userId: varchar("userId", { length: 36 }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  t => ({
    pk: primaryKey(t.channelId, t.userId),
  })
);
export const channelMembersRelations = relations(channelMembers, ({ one }) => ({
  user: one(users, {
    fields: [channelMembers.userId],
    references: [users.id],
  }),
  channel: one(channels, {
    fields: [channelMembers.channelId],
    references: [channels.id],
  }),
}));

// ✨ メッセージ情報テーブル
export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  channelId: varchar("channelId", { length: 36 }),
  userId: varchar("userId", { length: 36 }),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
export const messagesRelations = relations(messages, ({ one }) => ({
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));
