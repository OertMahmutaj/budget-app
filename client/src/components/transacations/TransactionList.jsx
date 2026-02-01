import TransactionItem from './TransactionItem'

const TransactionList = ({ transactions, deleteTransaction, editTransaction }) => {   
  return (
  <ul>
    {transactions.map(t => (
      <TransactionItem key=
        {t.id} 
        transaction={t} 
        deleteTransaction={deleteTransaction} 
        editTransaction={editTransaction}
      />
    ))}
  </ul>
  )
};

export default TransactionList