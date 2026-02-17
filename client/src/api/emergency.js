const baseUrl = "http://localhost:3001/emergencyFund"

export const getEmergencyFund = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Can not get emergency funds')
    }
    return await response.json()
}

export const updateFunds = async (updatedEmergencyFund) =>{
    const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedEmergencyFund)
    }

    const response = await fetch(`${baseUrl}/1`, options)

    if(!response.ok){
            throw new Error('Can not update funds')
        }
        return await response.json()
}