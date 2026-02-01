import { useField } from "../../hooks/customHooks";
import { useState } from "react";
import Notification from "../layout/Notification";

const TransactionForm = ({ addTransaction }) => {
  const category = useField("text");
  const amount = useField("number");
  const [message, setMessage] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    const transaction = {
      type: "expense",
      amount: Number(amount.value),
      category: category.value,
      date: new Date().toISOString().split("T")[0],
    };
    try {
      await addTransaction(transaction);
      setMessage(`Transaction for ${transaction.category}`);
    } catch (err) {
      setMessage(`"Failed to save transaction"${err}`);
    }

    category.onChange({ target: { value: "" } });
    amount.onChange({ target: { value: "" } });

    setTimeout(() => setMessage(""), 3000); 
    };

  return (
    <div>
      <Notification message={message} />
      <form onSubmit={handleCreate}>
        category <input {...category} />
        amount <input {...amount} />
        <button>Create</button>
      </form>
    </div>
  );
};

export default TransactionForm;
