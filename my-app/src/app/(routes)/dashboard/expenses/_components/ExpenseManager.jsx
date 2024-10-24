import React, { useState, useEffect } from "react";
import ExpenseListTable from "./ExpenseListTable"; // Adjust the import path as necessary
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";

const ExpenseManager = () => {
  const [expensesList, setExpensesList] = useState([]);

  // Fetch expenses from the database
  const fetchExpenses = async () => {
    try {
      const expenses = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.createdBy, user?.primaryEmailAddress?.emailAddress)); // Adjust as necessary
      setExpensesList(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  // Function to refresh the expense list
  const refreshData = async () => {
    await fetchExpenses(); // Re-fetch expenses after deletion
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Expense Manager</h1>
      <ExpenseListTable expensesList={expensesList} refreshData={refreshData} />
    </div>
  );
};

export default ExpenseManager;
