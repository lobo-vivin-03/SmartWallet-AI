export default async function handler(req, res) {
  try {
    const result = await db.select({
      id: budgets.id,
      name: budgets.name,
      amount: budgets.amount
    }).from(budgets);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}