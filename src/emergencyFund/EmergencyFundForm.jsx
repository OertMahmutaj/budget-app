import { useField } from "../hooks/customHooks"
import { updateFunds } from "../api/emergency"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Notification from "../components/layout/Notification"

const EmergencyFundForm = ({refetchEmergencyFund}) =>{
    const targetAmount = useField('number')
    const currentAmount = useField('number')
    const [ message, setMessage ] = useState('')
    const navigate = useNavigate()

    const now = new Date().toISOString().split("T")[0]

    const handleFundsTarget = async (event) =>{
        event.preventDefault()

        const newEmergencyFund = {}

        if(targetAmount.value){
            newEmergencyFund.targetAmount = Number(targetAmount.value)
        }
        if(currentAmount.value){
            newEmergencyFund.currentAmount = Number(currentAmount.value)
        }
        newEmergencyFund.lastUpdated = now
        try {
            await updateFunds(newEmergencyFund)
            setMessage(`Savings added`)
            await refetchEmergencyFund()
            navigate("/")
        } catch (err){
            setMessage(`Savings not added ${err}`)
        }
        setTimeout(() => setMessage(""), 3000);
        
    }

    return(
       <div>
            <Notification message={message}/>
            <form onSubmit={handleFundsTarget}>
                Add target amount $<input {...targetAmount} />
                <p></p>
                Add current amount $<input {...currentAmount} />
                <p></p>
                <button>Add</button>
            </form>
       </div>
    )
}
export default EmergencyFundForm