import {integer, numeric, pgTable, serial, varchar} from 'drizzle-orm/pg-core'

//budget schema
export const Budgets = pgTable('budgets',{
  id: serial('id').primaryKey(),
  name:varchar('name').notNull(),
  amount:varchar('amount').notNull(),
  // Icon:varchar('icon'),
  createdBy:varchar('createdby').notNull()

})

//income schema
export const Incomes = pgTable('incomes',{
  id: serial('id').primaryKey(),
  name:varchar('name').notNull(),
  amount:varchar('amount').notNull(),
  // Icon:varchar('icon'),
  createdBy:varchar('createdby').notNull()

})

//expenses 
export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  budget: integer('budget').references(() => Budgets.id), // Change made here
  createdBy: varchar('createdby').notNull()
});


