import { useState } from 'react';
import Notification from "../layout/Notification";

const TransactionItem = ({ transaction, deleteTransaction, editTransaction }) => {
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedAmount, setEditedAmount] = useState(transaction.amount)
  const [editedCategory, setEditedCategory] = useState(transaction.category)

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteTransaction(transaction);
      setMessage(`Deleted transaction in category ${transaction.category}`);
    } catch (err) {
      setMessage(`"Failed to delete transaction"${err}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = async (event) => {
    event.preventDefault()
    try {
      const updatedTransaction = {
        ...transaction,
        amount: Number(editedAmount),
        category: editedCategory
      }
      await editTransaction(transaction.id, updatedTransaction)
      setIsEditing(false)
      setMessage(`Edited transaction in category ${editedCategory}`);
    } catch (err) {
      setMessage(`"Failed to edit transaction"${err}`);
    }
    setTimeout(() => setMessage(""), 3000)
  };

  if (isEditing) {
    return (
      <div>
        <Notification message={message} />
        <form onSubmit={handleEdit}>
            Amount
          <input 
            type="number" 
            value={editedAmount} 
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <p></p>Category
          <input 
            type="text" 
            value={editedCategory} 
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <p></p>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <ul>
        <li>Amount {transaction.amount}$</li>
        <li>Type {transaction.type}</li>
        <li>Category {transaction.category}</li>
        <li>Date {transaction.date}</li>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </ul>
    </div>
  )
}

export default TransactionItem