const baseUrl = 'http://localhost:3005/transactions'

const getAll = async () =>{
    const response = await fetch(baseUrl)
    console.log(response)
    if(!response.ok){
        throw new Error('Nothing found')
    }

    return await response.json()
}

const createNew = async (transaction) =>{
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction),
    }


    const response = await fetch(baseUrl, options)

    if(!response.ok){
        throw new Error('Can not make a transaction')
    }


    return await response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, { 
    method: 'DELETE' 
  });

  if (!response.ok) {
    throw new Error('Can not delete transaction');
  }

  return await response.json();
}

const update = async (id, updatedTransaction) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ percentage : updatedTransaction.percentage})
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    if(!response.ok){
        throw new Error('Can not update transaction')
    }

    return await response.json()
}

export default { getAll, createNew, remove, update }