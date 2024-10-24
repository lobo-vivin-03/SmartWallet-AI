'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { SignIn, useUser } from "@clerk/nextjs";
import CardInfo from "./_component/CardInfo";
import { db } from "../../../../utils/dbConfig";
import { eq, sql, desc, getTableColumns } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import BarChartDashBoard from "@/app/_components/BarChartDashBoard";
import BudgetItem from "../dashboard/budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user, isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter(); // Initialize Next.js router

  const [budgetList, setBudgetList] = useState([])
  const [incomeList, setIncomeList] = useState([])
  const [expensesList, setexpenseList] = useState([])

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
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budget))
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
  
  const getAllExpenses = async() => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budget))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id))

    setexpenseList(result)
  }

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(Incomes)
        .groupBy(Incomes.id); // Assuming you want to group by ID or any other relevant column

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  // Redirect to sign-in page if the user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page
    }
  }, [isSignedIn, router]);

  // To display all the items in the budgetList object as a string inside a <p> tag
  // const renderBudgetItems = () => {
  //   return budgetList.map((budget) => `${budget.name} (${budget.amount})`).join(', ');
  // }

  // return (
  //   <div className="p-8">
  //     <h2 className="font-bold text-4xl lg:text-6xl">Hi, {user?.fullName || <SignIn/>}</h2> 
  //     <p className="text-gray-500 text-xl mt-1">Here's what happenng with your money. Lets manage your expenses!</p>

  //     {/* Display the budget items in a p tag */}
  //     {/* <p className="mt-4">Budgets: {renderBudgetItems() || "No budgets available."}</p> */}

  //     <CardInfo budgetList={budgetList} incomeList={incomeList}/>
  //     <div className="grid grid-cols-1 lg:grid:cols-3 mt-6 gap-5">
  //       <BarChartDashBoard budgetList={budgetList}/>
  //     </div>
  //     <div className='grid gap-3'>
  //       <h2 className="font-bold text-lg">Latest Budgets</h2>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //         {budgetList?.length > 0 ? 
  //           budgetList.map((budget, index) => (
  //             <BudgetItem budget={budget} key={index} />
  //           )) : 
  //           [1, 2, 3, 4].map((items, index) => (
  //             <div key={index} className='h-[180px] w-full bg-slate-200 animate-pulse'></div>
  //           ))
  //         }
  //       </div>
  //     </div>
  //   </div>
  // );


return (
  <div className="p-8 bg-">
    <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
    <p className="text-gray-500">
      Here's what happenning with your money, Lets Manage your expense
    </p>

    <CardInfo budgetList={budgetList} incomeList={incomeList} />
    <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
      <div className="lg:col-span-2">
        <BarChartDashBoard budgetList={budgetList} />

        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
        />
      </div>
      <div className="grid gap-5">
        <h2 className="font-bold text-lg">Latest Budgets</h2>
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                className="h-[180xp] w-full
               bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  </div>
);
}


export default Dashboard;


// function Dashboard() {
//   const { user } = useUser();

//   const [budgetList, setBudgetList] = useState([]);
//   const [incomeList, setIncomeList] = useState([]);
//   const [expensesList, setExpensesList] = useState([]);
//   useEffect(() => {
//     user && getBudgetList();
//   }, [user]);
//   /**
//    * used to get budget List
//    */
//   const getBudgetList = async () => {
//     const result = await db
//       .select({
//         ...getTableColumns(Budgets),

//         totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
//         totalItem: sql`count(${Expenses.id})`.mapWith(Number),
//       })
//       .from(Budgets)
//       .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//       .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .groupBy(Budgets.id)
//       .orderBy(desc(Budgets.id));
//     setBudgetList(result);
//     getAllExpenses();
//     getIncomeList();
//   };

//   /**
//    * Get Income stream list
//    */
//   const getIncomeList = async () => {
//     try {
//       const result = await db
//         .select({
//           ...getTableColumns(Incomes),
//           totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
//             Number),
//         })
//         .from(Incomes)
//         .groupBy(Incomes.id); // Assuming you want to group by ID or any other relevant column

//       setIncomeList(result);
//     } catch (error) {
//       console.error("Error fetching income list:", error);
//     }
//   };

//   /**
//    * Used to get All expenses belong to users
//    */
//   const getAllExpenses = async () => {
//     const result = await db
//       .select({
//         id: Expenses.id,
//         name: Expenses.name,
//         amount: Expenses.amount,
//         createdAt: Expenses.createdAt,
//       })
//       .from(Budgets)
//       .rightJoin(Expenses, eq(Budgets.id, Expenses.budget))
//       .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
//       .orderBy(desc(Expenses.id));
//     setExpensesList(result);
//   };

//   return (
//     <div className="p-8 bg-">
//       <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
//       <p className="text-gray-500">
//         Here's what happenning with your money, Lets Manage your expense
//       </p>

//       <CardInfo budgetList={budgetList} incomeList={incomeList} />
//       <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
//         <div className="lg:col-span-2">
//           <BarChartDashBoard budgetList={budgetList} />

//           <ExpenseListTable
//             expensesList={expensesList}
//             refreshData={() => getBudgetList()}
//           />
//         </div>
//         <div className="grid gap-5">
//           <h2 className="font-bold text-lg">Latest Budgets</h2>
//           {budgetList?.length > 0
//             ? budgetList.map((budget, index) => (
//                 <BudgetItem budget={budget} key={index} />
//               ))
//             : [1, 2, 3, 4].map((item, index) => (
//                 <div
//                   className="h-[180xp] w-full
//                  bg-slate-200 rounded-lg animate-pulse"
//                 ></div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;