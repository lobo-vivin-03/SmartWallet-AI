'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_component/CardInfo";
import { db } from "../../../../utils/dbConfig";
import { eq, sql, desc, getTableColumns } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import BarChartDashBoard from "@/app/_components/BarChartDashBoard";
import BudgetItem from "../dashboard/budgets/_components/BudgetItem";

function Dashboard() {
  const { user, isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter(); // Initialize Next.js router

  const [budgetList, setBudgetList] = useState([])
  const [incomeList, setIncomeList] = useState([])
  const [expenseList, setexpenseList] = useState([])

  useEffect(() => {
    user && getBudgetList()
  },[user]);

  const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(cast(${Expenses.amount} as numeric))`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
  
      setBudgetList(result);
      getAllExpenses();
      getIncomeList();
    } catch (error) {
      console.error('Error fetching budget list:', error);
    }
  };
  

  const getAllExpenses = async() =>{
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.id))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Expenses.id))

    setexpenseList(result)
  }
  const getIncomeList = async ()=>{
    try {
      const result = await db.select({
        ...getTableColumns(Incomes),
        totaAmount: sql`sum(cast(${Incomes.amount} as numeric ))`. mapWith(Number),

      }).from(Incomes).groupBy(Incomes.id)

      setIncomeList(result)

    } catch (error) {
      console.log("Error in fetching income list", error);
      
    }
  }

  // Redirect to sign-in page if the user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page
    }
  }, [isSignedIn, router]);
  console.log(getTableColumns(Budgets)); 
  return (
   // Check if this returns a valid object

    <div className="p-8">
      <h2 className="font-bold text-4xl lg:text-6xl">Hi, {user?.fullName || <SignIn/>}</h2> 
      <p className="text-gray-500 text-xl mt-1">Here's what happenng with your money. Lets manage your expenses!</p>

      <CardInfo budgetList={budgetList} incomeList={incomeList}/>
      <div className="grid grid-cols-1 lg:grid:cols-3 mt-6 gap-5">
        <BarChartDashBoard budgetList={budgetList}/>
{/*         
        <ExpenseListTable
        expensesList={()=>getBudgetList()}/> */}

      </div>
      <div className='grid gap-3'>
        <h2 className=" font-bold text-lg">Latest Budgets</h2>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Change this line */}
            {budgetList?.length > 0 ? 
            budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
            )) : 
            [1, 2, 3, 4].map((items, index) => (
              <div key={index} className='h-[180px] w-full bg-slate-200 animate-pulse'></div>
            ))
          }
          </div>

      </div>
    </div>
  );
}

export default Dashboard;
