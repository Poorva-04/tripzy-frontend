export const formatBudget = (amount = 0) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;