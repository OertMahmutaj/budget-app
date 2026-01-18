const baseUrl = 'http://localhost:3005/income'

export const createNew = async (income) =>{
    const options ={
        method: 'POST',
        headers: {'Content-Type': 'aaplication/json'},
        body: JSON.stringify({ monthlyIncome: income })
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok){
        throw new Error('INCOME ERROR')
    }

    return await response.json()
}

export const getAll = async () =>{
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Failed to get income')
    }

    return await response.json()
}