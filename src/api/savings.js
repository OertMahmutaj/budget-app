const baseUrl = "http://localhost:3005/savings"

export const getSavings = async ()=>{
    const response = await fetch(baseUrl)
    if(!response.ok){
        throw new Error('No savings found')
    }

    return await response.json()
}

export const createSavings = async (savings) =>{
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(savings)
    }

    const response = await fetch(`${baseUrl}/1`, options)

    if(!response.ok){
        throw new Error('No savings found')
    }

    return await response.json()
}

export const updateSavings = async (todaySavings) =>{
    const options = {
        method: 'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(todaySavings)
    }

    const response = await fetch(`${baseUrl}/1`, options)
    if(!response.ok){
        throw new Error('Can not update savings')
    }

    return await response.json()
}