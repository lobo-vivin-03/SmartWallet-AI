import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    if (!expense || !expense.id) {
      console.error("Invalid expense:", expense);
      return;
    }
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast.success("Expense Deleted!"); // Changed to toast.success for success feedback
        refreshData(); // Refresh the expense list after deletion
      } else {
        toast.error("Failed to delete expense."); // Feedback if delete fails
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Error deleting expense.");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        {/* <h2 className="font-bold">Date</h2> */}
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.length > 0 ? ( // Check if there are expenses to display
        expensesList.map((expense) => (
          <div key={expense.id} className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            {/* <h2>{expense.createdAt}</h2> */}
            <h2
              onClick={() => deleteExpense(expense)}
              className="text-red-700 cursor-pointer"
            >
              <Trash className="w-4" /> Delete {/* Optional icon for delete */}
            </h2>
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-500 p-2">No expenses available.</div> // Message if no expenses
      )}
    </div>
  );
}

export default ExpenseListTable;
