import { useEffect, useState, useCallback } from "react";

import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import TransactionForm from "./components/transacations/TransactionForm";
import TransactionList from "./components/transacations/TransactionList";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import Income from "./components/income/Income";

import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import transactionServices from "./api/transacations";
import { createSavings, getSavings } from "./api/savings";
import SavingsForm from "./components/savings/SavingsForm";

import EmergencyFundForm from "./emergencyFund/EmergencyFundForm";
import { getEmergencyFund, updateFunds } from "./api/emergency";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [savings, setSavings] = useState(null);
  const [emergencyFund, setEmergencyFund] = useState(null);

  //gets all expenses
  useEffect(() => {
    transactionServices.getAll().then((data) => setTransactions(data));
  }, []);

  //gets savings
  useEffect(() => {
    getSavings().then((data) => setSavings(data));
  }, []);

  //gets emergency funds
  useEffect(() => {
    getEmergencyFund().then((data) => setEmergencyFund(data));
  }, []);

  //refetch savings
  const refetchSavings = useCallback(async () => {
    const data = await getSavings();
    setSavings(data);
  }, []);

  //refetch emergency funds
  const refetchEmergencyFund = useCallback(async () => {
    const data = await getEmergencyFund();
    setEmergencyFund(data);
  }, []);

  //add expenses
  const addTransaction = async (newTransaction) => {
    const saved = await transactionServices.createNew(newTransaction);
    setTransactions((prev) => [...prev, saved]);
  };

  //delete expenses
  const deleteTransaction = async (deletedTransaction) => {
    await transactionServices.remove(deletedTransaction.id);
    setTransactions((prev) =>
      prev.filter((ts) => ts.id !== deletedTransaction.id),
    );
  };

  //edit expenses
  const editTransaction = async (id, editedTransaction) => {
    await transactionServices.update(id, editedTransaction);
    setTransactions((prev) =>
      prev.map((ts) =>
        ts.id === editedTransaction.id ? editedTransaction : ts,
      ),
    );
  };

  //add savings
  const addSavings = async (newSavings) => {
    await createSavings(newSavings);
    const updated = await getSavings();
    setSavings(updated);
  };

  //update EmergencyFunds
  const updateEmergencyFund = async (emergencyFund) => {
    await updateFunds(emergencyFund);
    const updated = await getEmergencyFund();
    setEmergencyFund(updated);
  };

  return (
    <div>
      <div>
        <h1>BUDGET</h1>
        <Link to={"/"}> Navbar</Link>
      </div>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              transactions={transactions}
              savings={savings}
              refetchSavings={refetchSavings}
              emergencyFund={emergencyFund}
              refetchEmergencyFund={refetchEmergencyFund}
              updateEmergencyFund={updateEmergencyFund}
            />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/transaction"
          element={<TransactionForm addTransaction={addTransaction} />}
        />
        <Route
          path="/transaction/list"
          element={
            <TransactionList
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          }
        />
        <Route
          path="/savings"
          element={<SavingsForm savings={savings} addSavings={addSavings} />}
        />
        <Route path="/income" element={<Income />} />
        <Route
          path="/emergencyFund"
          element={
            <EmergencyFundForm
              emergencyFund={emergencyFund}
              refetchEmergencyFund={refetchEmergencyFund}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
