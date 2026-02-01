import { getAll } from "../api/income";
import { useEffect, useState, useRef } from "react";
import { updateSavings } from "../api/savings";

const Dashboard = ({
  savings,
  transactions,
  refetchSavings,
  emergencyFund,
  refetchEmergencyFund,
  updateEmergencyFund,
}) => {
  const [income, setIncome] = useState(null);

  // Lock ref to prevent multiple allocations in the same render
  const allocationLock = useRef(false);

  useEffect(() => {
    getAll().then((data) => setIncome(data[data.length - 1]));
  }, []);

  useEffect(() => {
    const allocateDailySavings = async () => {
      if (
        !income ||
        !savings ||
        !savings[0] ||
        !emergencyFund ||
        !emergencyFund[0]
      )
        return;

      const today = new Date().toISOString().split("T")[0];

      // Check lastUpdated for both EF and Savings
      if (
        emergencyFund[0].lastUpdated === today &&
        savings[0].lastUpdated === today
      ) {
        return;
      }

      // Prevent double run
      if (allocationLock.current) return;
      allocationLock.current = true;

      const now = new Date();
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
      ).getDate();
      const monthlySavings = Math.round(
        (income.monthlyIncome * savings[0].percentage) / 100,
      );
      const dailySavings = Math.round(monthlySavings / daysInMonth);

      let efAmountToAdd = 0;
      let savingsAmountToAdd = 0;

      const ef = emergencyFund[0];
      const sv = savings[0];

      // EF-first allocation
      if (ef.currentAmount < ef.targetAmount) {
        const remainingEF = ef.targetAmount - ef.currentAmount;
        efAmountToAdd = Math.min(dailySavings, remainingEF);
        savingsAmountToAdd = dailySavings - efAmountToAdd;
      } else {
        savingsAmountToAdd = dailySavings;
      }

      // Update EF
      const updatedEF = {
        ...ef,
        currentAmount: ef.currentAmount + efAmountToAdd,
        lastUpdated: today,
      };
      await updateEmergencyFund(updatedEF);
      await refetchEmergencyFund();

      // Update Savings
      const updatedSavings = {
        ...sv,
        totalSaved: sv.totalSaved + savingsAmountToAdd,
        lastUpdated: today,
      };
      await updateSavings(updatedSavings);
      await refetchSavings();
    };

    allocateDailySavings();
  }, [
    income,
    savings,
    emergencyFund,
    refetchSavings,
    refetchEmergencyFund,
    updateEmergencyFund,
  ]);

  const now = new Date();
  const daysInCurrentMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  if (!income) {
    return <div>loading</div>;
  }

  if (!savings) {
    return <div>loading</div>;
  }
  if (!emergencyFund) {
    return <div>loading</div>;
  }

  const monthlySavings = Math.round(
    (income.monthlyIncome * savings[0].percentage) / 100,
  );
  const dailySavings = Math.round(monthlySavings / daysInCurrentMonth);
  const monthlyIncome = income.monthlyIncome;
  const dailyIncome = Math.round(monthlyIncome / daysInCurrentMonth);
  const monthlyExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const today = new Date().getDate();
  const daysLeftInMonth = daysInCurrentMonth - today + 1;
  const leftOver = monthlyIncome - monthlyExpenses - monthlySavings;
  const dailyBudget = Math.round(leftOver / daysLeftInMonth);
  const tomorrow = daysLeftInMonth - 1;
  const tomorrowBudget = Math.round(leftOver / tomorrow);
  const afterTomorrow = tomorrow - 1;
  const afterTomorrowBudget = Math.round(leftOver / afterTomorrow);

  return (
    <div>
      <h2>Welcome to Your Budget App</h2>
      <ul>
        {income && <p>Monthly Income: {monthlyIncome} $ </p>}
        {income && <p>Monthly Expenses: {monthlyExpenses} $ </p>}
        {income && <p>Monthly Budget: {leftOver} $ </p>}
        {income && <p>Daily Income : {dailyIncome} $</p>}
        {income && <p>Today's budget : {dailyBudget} $</p>}
        {income && <p>Tomorrow's budget : {tomorrowBudget} $</p>}
        {income && <p>Aftertomorrow's budget : {afterTomorrowBudget} $</p>}
        {income && <p>Savings Goal: {monthlySavings} $ </p>}
        {income && <p>Daily Savings: {dailySavings} $ </p>}
        {income && <p>Savings reached: {savings[0].totalSaved} $ </p>}
        {income && (
          <p>Emergency fund current: {emergencyFund[0].currentAmount} $ </p>
        )}
        {income && (
          <p>Emergency fund target: {emergencyFund[0].targetAmount} $ </p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
