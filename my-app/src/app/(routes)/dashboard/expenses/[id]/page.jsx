// "use client";
// import { db } from "../../../../../../utils/dbConfig";
// import { Budgets, Expenses } from "../../../../../../utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq, getTableColumns, sql } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import BudgetItem from "../../budgets/_components/BudgetItem";
// import AddExpense from "../_components/AddExpense";
// import ExpenseListTable from "../_components/ExpenseListTable";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Trash } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogFooter,
//   AlertDialogTrigger,
//   AlertDialogDescription,
// } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import EditBudget from "../_components/EditBudget";

// function ExpensesScreen({ params }) {
//   const { user } = useUser();
//   const [budgetInfo, setBudgetInfo] = useState(null);
//   const [expensesList, setExpensesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const route = useRouter();

//   useEffect(() => {
//     if (user) {
//       getBudgetInfo();
//     }
//   }, [user]);

//   const getBudgetInfo = async () => {
//     if (!params.id) {
//       console.error("Invalid budget ID");
//       toast.error("Invalid budget ID.");
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const result = await db
//         .select({
//           ...getTableColumns(Budgets),
//           totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
//           totalItem: sql`count(${Expenses.id})`.mapWith(Number),
//         })
//         .from(Budgets)
//         .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)) // Ensure correct column name
//         .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .where(eq(Budgets.id, params.id))
//         .groupBy(Budgets.id);

//       setBudgetInfo(result[0] || null);
//       getExpensesList();
//     } catch (error) {
//       console.error("Error fetching budget info:", error);
//       toast.error("Failed to load budget info.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getExpensesList = async () => {
//     if (!params.id) {
//       console.error("Invalid budget ID");
//       return;
//     }

//     try {
//       const result = await db
//         .select({
//           id: Expenses.id,
//           name: Expenses.name,
//           amount: Expenses.amount,
//           budget: Expenses.budgetId, // Ensure this matches your schema change
//         })
//         .from(Expenses)
//         .where(eq(Expenses.budgetId, params.id)) // Use budgetId here
//         .orderBy(desc(Expenses.id));

//       setExpensesList(result);
//     } catch (error) {
//       console.error("Error fetching expenses list:", error);
//       toast.error("Failed to load expenses.");
//     }
//   };

//   const deleteBudget = async () => {
//     try {
//       await db
//         .delete(Expenses)
//         .where(eq(Expenses.budgetId, params.id)) // Ensure using budgetId
//         .returning();

//       await db
//         .delete(Budgets)
//         .where(eq(Budgets.id, params.id))
//         .returning();

//       toast.success("Budget Deleted!");
//       route.replace("/dashboard/budgets");
//     } catch (error) {
//       console.error("Error deleting budget:", error);
//       toast.error("Failed to delete budget.");
//     }
//   };

//   return (
//     <div className="p-10">
//       {loading ? (
//         <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div> // Loading state
//       ) : (
//         <>
//           <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
//             <span className="flex gap-2 items-center">
//               <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
//               My Expenses
//             </span>
//             <div className="flex gap-2 items-center">
//               <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
//               <AlertDialog>
//                 <AlertDialogTrigger asChild>
//                   <Button className="flex gap-2 rounded-full" variant="destructive">
//                     <Trash className="w-4" /> Delete
//                   </Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                       This action cannot be undone. This will permanently delete
//                       your current budget along with expenses and remove your data
//                       from our servers.
//                     </AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={deleteBudget}>
//                       Continue
//                     </AlertDialogAction>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>
//             </div>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
//             {budgetInfo ? (
//               <BudgetItem budget={budgetInfo} />
//             ) : (
//               <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
//             )}
//             <AddExpense budgetId={params.id} user={user} refreshData={getBudgetInfo} />
//           </div>
//           <div className="mt-4">
//             <ExpenseListTable expensesList={expensesList} refreshData={getBudgetInfo} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default ExpensesScreen;


"use client"
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
function ExpensesScreen({ params }) {

  
    const {user}=useUser();
    const [budgetInfo, setbudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();
    useEffect(()=>{
        user&&getBudgetInfo();
      },[user])
    /**
   * Used to get All expenses belong to users
   */

    const getBudgetInfo = async () => {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budget))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);
  
      setbudgetInfo(result[0]);
      getExpensesList();
    };


  const getExpensesList =async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      /* createdAt:Expenses.createdAt*/
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budget))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));

    setExpensesList(result);
    
    const deleteBudget = async () => {
      const deleteExpenseResult = await db
        .delete(Expenses)
        .where(eq(Expenses.budget, params.id))
        .returning();
  
      if (deleteExpenseResult) {
        const result = await db
          .delete(Budgets)
          .where(eq(Budgets.id, params.id))
          .returning();
      }
      toast("Budget Deleted !");
      route.replace("/dashboard/budgets");
    };
    
  }
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;