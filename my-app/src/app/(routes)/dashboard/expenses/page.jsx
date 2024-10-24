"use client"
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';

function ExpensesScreen() {

  const [expensesList,setExpensesList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
        user&&getAllExpenses();
      },[user])
    /**
   * Used to get All expenses belong to users
   */
    const getAllExpenses = async () => {
      try {
        const result = await db
          .select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            /* createdAt: Expenses.createdAt,*/
          })
          .from(Budgets)
          .innerJoin(Expenses, eq(Budgets.id, Expenses.budget))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
          .orderBy(desc(Expenses.id));
          
          setExpensesList(result);
        // console.log("Fetched expenses:", result); // Log the result
    
        if (!result) {
          console.error("No results returned from the database.");
          return;
        }
    
        setExpensesList(result);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

  
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
        <ExpenseListTable refreshData={()=>getAllExpenses()}
        expensesList={expensesList}
        />
    </div>
  )
}

export default ExpensesScreen
